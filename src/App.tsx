import React, { useState, useEffect, useMemo } from 'react'
import { Header } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { CategoryNav } from './components/CategoryNav'
import { ProductCard } from './components/ProductCard'
import { ProjectorSpecMatrix } from './components/ProjectorSpecMatrix'
import { TrustFeatures } from './components/TrustFeatures'
import { SocialSignUpSection } from './components/SocialSignUpSection'
import { QuickViewModal } from './components/QuickViewModal'
import { CartDrawer } from './components/CartDrawer'
import { WishlistDrawer } from './components/WishlistDrawer'
import { AuthModal } from './components/AuthModal'
import { AccountDrawer } from './components/AccountDrawer'
import { Footer } from './components/Footer'
import { AdminInsightsView } from './components/AdminInsightsView'
import { PRODUCTS_CATALOG as INITIAL_PRODUCTS } from './data/products'
import { Product, CurrencyCode, CartItem, ProductVariant } from './types'
import { Search, ArrowUpDown, CheckCircle, ArrowRight, Sparkles, LayoutDashboard, Store } from 'lucide-react'

export function App() {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('admin')) return 'admin'
    }
    return 'storefront'
  })

  // Keyboard shortcut (Alt+A for Admin, Alt+S for Storefront)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || (e.ctrlKey && e.shiftKey)) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault()
        setViewMode((prev) => (prev === 'admin' ? 'storefront' : 'admin'))
      } else if ((e.altKey || (e.ctrlKey && e.shiftKey)) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault()
        setViewMode('storefront')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Sync hash with view mode
  useEffect(() => {
    if (viewMode === 'admin') {
      if (window.location.hash !== '#admin') {
        window.history.replaceState(null, '', '#admin')
      }
    } else {
      if (window.location.hash === '#admin') {
        window.history.replaceState(null, '', '#storefront')
      }
    }
  }, [viewMode])

  // User State
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('playbeat_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return { name: 'Ali Khan', email: 'playbeat575@gmail.com' }
      }
    }
    return { name: 'Ali Khan', email: 'playbeat575@gmail.com' }
  })

  // Core Product Catalog State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('playbeat_products_catalog_v3')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const seen = new Set<string>()
        const unique = parsed.filter((item: Product) => {
          if (!item || !item.id || seen.has(item.id)) return false
          seen.add(item.id)
          return true
        })
        return unique.length > 0 ? unique : INITIAL_PRODUCTS
      } catch {
        return INITIAL_PRODUCTS
      }
    }
    return INITIAL_PRODUCTS
  })

  // Selected Currency (Default PKR as shown in screenshot)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('playbeat_currency')
    return (saved as CurrencyCode) || 'PKR'
  })

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'under1000' | '1000to5000' | 'above5000'>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured')

  // Shopping Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('playbeat_cart')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    // Default initial mock cart item with count = 3 (as shown in screenshot badge '3')
    return [
      {
        product: INITIAL_PRODUCTS[1], // PlayStation Gift Card
        quantity: 1,
        unitPrice: 24000,
      },
      {
        product: INITIAL_PRODUCTS[0], // Netflix Premium
        quantity: 2,
        unitPrice: 6800,
      },
    ]
  })

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('playbeat_wishlist')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    return []
  })

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [accountTab, setAccountTab] = useState<'profile' | 'orders' | 'subscriptions' | 'library' | 'wishlist' | 'settings'>('profile')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Persist Products Catalog
  useEffect(() => {
    localStorage.setItem('playbeat_products_catalog_v3', JSON.stringify(products))
  }, [products])

  // Persist Currency
  useEffect(() => {
    localStorage.setItem('playbeat_currency', selectedCurrency)
  }, [selectedCurrency])

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('playbeat_cart', JSON.stringify(cart))
  }, [cart])

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem('playbeat_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Persist User
  useEffect(() => {
    if (user) {
      localStorage.setItem('playbeat_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('playbeat_user')
    }
  }, [user])

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Stock update from Admin Console
  const handleUpdateProductStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    )
    showToast(`Inventory updated for SKU #${id}`)
  }

  // Import products from CSV / MongoDB Cloud
  const handleImportProducts = (
    newProducts: Product[],
    mode: 'merge' | 'replace'
  ) => {
    if (mode === 'replace') {
      setProducts(newProducts)
    } else {
      setProducts((prev) => {
        const map = new Map<string, Product>()
        prev.forEach((p) => map.set(p.sku || p.id, p))
        newProducts.forEach((p) => map.set(p.sku || p.id, p))
        return Array.from(map.values())
      })
    }
    showToast(`Catalog updated with ${newProducts.length} imported products`)
  }

  // Add to Cart Handler
  const handleAddToCart = (product: Product, variant?: ProductVariant) => {
    setCart((prev) => {
      const variantKey = variant ? variant.id : 'default'
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          (item.selectedVariant?.id || 'default') === variantKey
      )

      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      } else {
        const unitPrice = variant ? variant.price : product.price
        return [...prev, { product, selectedVariant: variant, quantity: 1, unitPrice }]
      }
    })

    const title = variant ? `${product.name} (${variant.name})` : product.name
    showToast(`Added to cart successfully! ${title}`)
  }

  // Instant Direct Checkout (buy now)
  const handleInstantBuy = (product: Product, variant?: ProductVariant) => {
    handleAddToCart(product, variant)
    setIsCartOpen(true)
  }

  // Update Cart Item Quantity
  const handleUpdateQty = (productId: string, variantId: string | undefined, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, variantId)
      return
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (item.selectedVariant?.id || undefined) === variantId
        ) {
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  // Remove Item from Cart
  const handleRemoveFromCart = (productId: string, variantId: string | undefined) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (item.selectedVariant?.id || undefined) === variantId
          )
      )
    )
    showToast('Item removed from cart')
  }

  // Clear Cart
  const handleClearCart = () => {
    setCart([])
  }

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`)
        return prev.filter((p) => p.id !== product.id)
      } else {
        showToast(`Saved "${product.name}" to wishlist`)
        return [...prev, product]
      }
    })
  }

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId)
  }

  // Top 5 Popular Products (Matching Screenshot 3)
  const popularProducts = useMemo(() => {
    return products.slice(0, 5)
  }, [products])

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesName = p.name.toLowerCase().includes(q)
          const matchesCat = p.category.toLowerCase().includes(q)
          const matchesSku = p.sku.toLowerCase().includes(q)
          const matchesDesc = p.description.toLowerCase().includes(q)
          if (!matchesName && !matchesCat && !matchesSku && !matchesDesc) {
            return false
          }
        }

        // Category Filter
        if (selectedCategory !== 'all') {
          if (p.category !== selectedCategory) {
            return false
          }
        }

        // Price Filter
        if (priceFilter === 'under1000' && p.price >= 1000) return false
        if (priceFilter === '1000to5000' && (p.price < 1000 || p.price > 5000)) return false
        if (priceFilter === 'above5000' && p.price <= 5000) return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0)
        // Default Featured
        if (a.isHot && !b.isHot) return -1
        if (!a.isHot && b.isHot) return 1
        return 0
      })
  }, [products, searchQuery, selectedCategory, priceFilter, sortBy])

  // Projectors for Spec Matrix
  const projectorProducts = useMemo(() => {
    return products.filter((p) => p.category === 'Smart Projectors')
  }, [products])

  // Cart Subtotal & Total Count
  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
  }, [cart])

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }, [cart])

  const handleOpenAccountTab = (tab: 'profile' | 'orders' | 'subscriptions' | 'library' | 'wishlist' | 'settings') => {
    if (tab === 'wishlist') {
      setIsWishlistOpen(true)
    } else {
      setAccountTab(tab)
      setIsAccountOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#091330] border border-yellow-400/50 shadow-2xl text-xs font-semibold text-white animate-in slide-in-from-bottom-5">
          <div className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      {viewMode === 'storefront' && (
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenCart={() => setIsCartOpen(true)}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          onOpenAdmin={() => setViewMode('admin')}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenAccountTab={handleOpenAccountTab}
          user={user}
          onSignOut={() => {
            setUser(null)
            showToast('Signed out of PlayBeat')
          }}
        />
      )}

      {viewMode === 'admin' ? (
        <AdminInsightsView
          products={products}
          selectedCurrency={selectedCurrency}
          onBackToStorefront={() => setViewMode('storefront')}
          onQuickViewProduct={(p) => setQuickViewProduct(p)}
          onUpdateProductStock={handleUpdateProductStock}
          onImportProducts={handleImportProducts}
        />
      ) : (
        <>
          {/* Hero Section (Matching Screenshot 1) */}
          {selectedCategory === 'all' && !searchQuery && (
            <HeroBanner
              onExploreProducts={() => {
                const el = document.getElementById('popular-products-section')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              onExploreSubscriptions={() => setSelectedCategory('Subscriptions')}
            />
          )}

          {/* Browse Top Categories (Matching Screenshot 1) */}
          {selectedCategory === 'all' && !searchQuery && (
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onViewAll={() => setSelectedCategory('all')}
            />
          )}

          {/* Popular Products Row (Matching Screenshot 3 & 2) */}
          {selectedCategory === 'all' && !searchQuery && (
            <section id="popular-products-section" className="w-full py-8 bg-[#050814]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-[#FFC107] inline-block"></span>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
                      Popular Products
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-yellow-400 transition group"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* 5 Popular Cards in Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {popularProducts.map((prod) => (
                    <ProductCard
                      key={`popular-${prod.id}`}
                      product={prod}
                      currency={selectedCurrency}
                      onAddToCart={handleAddToCart}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={isWishlisted(prod.id)}
                      onInstantBuy={handleInstantBuy}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Main Full Catalog View */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
            {/* Catalog Header & Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-400/10">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-[#FFC107] inline-block"></span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
                  {selectedCategory === 'all' ? 'All Digital Licenses & Cinema Gear' : selectedCategory}
                </h2>
                <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-semibold text-yellow-300 bg-[#0A122E] border border-yellow-400/25">
                  {filteredProducts.length} items
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                {/* Price Filter */}
                <div className="flex items-center bg-[#0A122E] p-1 rounded-xl border border-slate-400/15">
                  <button
                    onClick={() => setPriceFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition font-mono ${
                      priceFilter === 'all'
                        ? 'btn-gold-gradient text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setPriceFilter('under1000')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition font-mono ${
                      priceFilter === 'under1000'
                        ? 'btn-gold-gradient text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    &lt; 1k
                  </button>
                  <button
                    onClick={() => setPriceFilter('1000to5000')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition font-mono ${
                      priceFilter === '1000to5000'
                        ? 'btn-gold-gradient text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1k - 5k
                  </button>
                  <button
                    onClick={() => setPriceFilter('above5000')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition font-mono ${
                      priceFilter === 'above5000'
                        ? 'btn-gold-gradient text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hardware (5k+)
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 bg-[#0A122E] px-3 py-1.5 rounded-xl border border-slate-400/15 text-slate-300">
                  <ArrowUpDown className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-slate-400 text-[11px] font-mono">Sort:</span>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white text-xs font-mono focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="featured" className="bg-[#0A122E] text-white">Featured</option>
                    <option value="price-low" className="bg-[#0A122E] text-white">Price: Low to High</option>
                    <option value="price-high" className="bg-[#0A122E] text-white">Price: High to Low</option>
                    <option value="rating" className="bg-[#0A122E] text-white">Top Rated</option>
                    <option value="discount" className="bg-[#0A122E] text-white">Biggest Discount</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center rounded-[22px] bg-[#0A122E] border border-slate-400/15 p-8">
                <Search className="w-10 h-10 text-slate-500 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No matching items found</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4 font-sans">
                  Try adjusting your search keywords, exploring other category filters, or resetting price thresholds.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setPriceFilter('all')
                  }}
                  className="px-4 py-2 rounded-xl btn-gold-gradient text-slate-950 font-bold text-xs transition font-mono"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={`catalog-${product.id}`}
                    product={product}
                    currency={selectedCurrency}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={isWishlisted(product.id)}
                    onInstantBuy={handleInstantBuy}
                  />
                ))}
              </div>
            )}

            {/* Social Sign Up Section (Google, Facebook, TikTok, Instagram) */}
            {!searchQuery && (
              <SocialSignUpSection
                user={user}
                onSocialAuth={(provider, newUser) => {
                  setUser(newUser)
                  showToast(`Successfully signed up via ${provider}! Welcome to PlayBeat.`)
                }}
              />
            )}

            {/* Smart Projector Spec Matrix Section */}
            {(selectedCategory === 'all' || selectedCategory === 'Smart Projectors' || selectedCategory === 'IPTV & Services') && !searchQuery && (
              <ProjectorSpecMatrix
                projectors={projectorProducts}
                currency={selectedCurrency}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            )}

            {/* Bottom Trust Features Bar (Matching Screenshot 3) */}
            <TrustFeatures />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        currency={selectedCurrency}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={selectedCurrency}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={selectedCurrency}
        onAddToCart={handleAddToCart}
        onRemoveWishlist={handleToggleWishlist}
      />

      {/* Sign Up / Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u)
          showToast(`Welcome to PlayBeat, ${u.name}!`)
        }}
      />

      {/* Account Profile Drawer */}
      {user && (
        <AccountDrawer
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          activeTab={accountTab}
          onSelectTab={setAccountTab}
          user={user}
          currency={selectedCurrency}
          onSignOut={() => {
            setUser(null)
            setIsAccountOpen(false)
            showToast('Signed out of PlayBeat')
          }}
          onOpenWishlist={() => {
            setIsAccountOpen(false)
            setIsWishlistOpen(true)
          }}
        />
      )}
      {/* Floating Quick Mode Switcher Dock */}
      <aside aria-label="View mode switcher" className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#060B1E]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <button
          id="mode-switch-storefront-btn"
          onClick={() => setViewMode('storefront')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'storefront'
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md scale-105'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
          title="Switch to Storefront (Alt+S)"
        >
          <Store className="w-3.5 h-3.5" />
          <span>Storefront</span>
        </button>

        <button
          id="mode-switch-admin-btn"
          onClick={() => setViewMode('admin')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'admin'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
          title="Switch to Admin Insights & Importer (Alt+A)"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Admin Console</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </aside>
    </div>
  )
}
export default App
