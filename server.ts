import express from "express";
import path from "path";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const DEFAULT_MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://new:KgSqbhLKjBK3R8lN@cluster0.mfghk5u.mongodb.net/?appName=Cluster0";

// Helper to sanitize connection string
function cleanMongoUri(uri?: string): string {
  if (!uri) return DEFAULT_MONGODB_URI;
  let cleaned = uri.trim();
  // Fix common typo "mongodb+srv:/new:" -> "mongodb+srv://new:"
  if (cleaned.startsWith("mongodb+srv:/") && !cleaned.startsWith("mongodb+srv://")) {
    cleaned = cleaned.replace("mongodb+srv:/", "mongodb+srv://");
  }
  if (cleaned.startsWith("mongodb:/") && !cleaned.startsWith("mongodb://")) {
    cleaned = cleaned.replace("mongodb:/", "mongodb://");
  }
  return cleaned;
}

let cachedClient: MongoClient | null = null;

async function getMongoClient(customUri?: string): Promise<MongoClient> {
  const targetUri = cleanMongoUri(customUri || process.env.MONGODB_URI);
  if (cachedClient && (!customUri || customUri === DEFAULT_MONGODB_URI)) {
    return cachedClient;
  }
  const client = new MongoClient(targetUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
    },
    connectTimeoutMS: 8000,
    serverSelectionTimeoutMS: 8000,
  });
  await client.connect();
  if (!customUri || customUri === DEFAULT_MONGODB_URI) {
    cachedClient = client;
  }
  return client;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // ==========================================
  // API ROUTES
  // ==========================================
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Test MongoDB Connection & Explore DBs
  app.post("/api/mongodb/test", async (req, res) => {
    const { uri } = req.body;
    try {
      const client = await getMongoClient(uri);
      const adminDb = client.db().admin();
      const dbsList = await adminDb.listDatabases();
      
      const dbNames = dbsList.databases.map((d) => d.name);
      // Also list collections in primary database
      const targetDbName = req.body.dbName || "playbeat";
      const db = client.db(targetDbName);
      const collections = await db.listCollections().toArray();

      res.json({
        success: true,
        message: "Successfully connected to MongoDB Cluster0!",
        databases: dbNames,
        currentDatabase: targetDbName,
        collections: collections.map((c) => c.name),
      });
    } catch (err: any) {
      console.error("MongoDB Connection Error:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to connect to MongoDB cluster",
      });
    }
  });

  // Get Collections list
  app.get("/api/mongodb/collections", async (req, res) => {
    const dbName = (req.query.dbName as string) || "playbeat";
    const uri = req.query.uri as string | undefined;
    try {
      const client = await getMongoClient(uri);
      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();
      res.json({
        success: true,
        database: dbName,
        collections: collections.map((c) => c.name),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Fetch Products from MongoDB
  app.get("/api/mongodb/products", async (req, res) => {
    const dbName = (req.query.dbName as string) || "playbeat";
    const collectionName = (req.query.collection as string) || "products";
    const uri = req.query.uri as string | undefined;

    try {
      const client = await getMongoClient(uri);
      
      // Try primary db, or explore other collections if empty
      let db = client.db(dbName);
      let col = db.collection(collectionName);
      let items = await col.find({}).limit(500).toArray();

      // If no items found in playbeat.products, try test.products or admin collections
      if (items.length === 0 && dbName === "playbeat") {
        const testDb = client.db("test");
        const testCol = testDb.collection(collectionName);
        const testItems = await testCol.find({}).limit(500).toArray();
        if (testItems.length > 0) {
          items = testItems;
          db = testDb;
          col = testCol;
        }
      }

      // Transform _id to string id
      const products = items.map((doc: any) => {
        const { _id, ...rest } = doc;
        return {
          id: rest.id || _id.toString(),
          sku: rest.sku || `PB-${Math.floor(1000 + Math.random() * 9000)}`,
          name: rest.name || rest.title || "Unnamed Product",
          category: rest.category || "Digital Products",
          description: rest.description || "",
          price: typeof rest.price === "number" ? rest.price : Number(rest.price) || 0,
          originalPrice: rest.originalPrice ? Number(rest.originalPrice) : undefined,
          stock: typeof rest.stock === "number" ? rest.stock : Number(rest.stock) || 50,
          rating: typeof rest.rating === "number" ? rest.rating : 4.8,
          reviewCount: typeof rest.reviewCount === "number" ? rest.reviewCount : 120,
          digital: rest.digital !== undefined ? Boolean(rest.digital) : true,
          image: rest.image || rest.imageUrl || "/playbeat-logo.png",
          tags: Array.isArray(rest.tags) ? rest.tags : ["Digital", "Verified"],
          deliveryType: rest.deliveryType || (rest.digital ? "Instant Auto-Email" : "Courier Shipping (1-3 Days)"),
          region: rest.region || "Global",
          isHot: Boolean(rest.isHot),
          isFeatured: Boolean(rest.isFeatured),
        };
      });

      res.json({
        success: true,
        count: products.length,
        database: db.databaseName,
        collection: col.collectionName,
        products,
      });
    } catch (err: any) {
      console.error("Error fetching products from MongoDB:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Batch Upload / Sync Products to MongoDB
  app.post("/api/mongodb/products/upload", async (req, res) => {
    const { products, dbName = "playbeat", collection = "products", uri, replaceAll = false } = req.body;
    
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, error: "Products array is required and must not be empty" });
    }

    try {
      const client = await getMongoClient(uri);
      const db = client.db(dbName);
      const col = db.collection(collection);

      if (replaceAll) {
        await col.deleteMany({});
      }

      const operations = products.map((prod: any) => {
        const filter = prod.sku ? { sku: prod.sku } : { id: prod.id };
        const cleanProduct = {
          ...prod,
          updatedAt: new Date(),
        };
        return {
          updateOne: {
            filter,
            update: { $set: cleanProduct },
            upsert: true,
          },
        };
      });

      const result = await col.bulkWrite(operations);

      res.json({
        success: true,
        message: `Successfully synced ${products.length} products to MongoDB (${dbName}.${collection})`,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedCount: result.upsertedCount,
      });
    } catch (err: any) {
      console.error("MongoDB Upload Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PlayBeat Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
