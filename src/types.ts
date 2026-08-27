export type CurrencyCode = 'PKR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SAR' | 'CAD'

export interface ProductVariant {
  id: string
  name: string
  price: number // base price in PKR
  originalPrice?: number
  sku?: string
  badge?: string
}

export interface ProjectorSpec {
  nativeResolution: string
  brightnessAnsi: number | string
  os?: string
  cpu?: string
  ramRom?: string
  wifi?: string
  bluetooth?: string
  focus?: string
  keystone?: string
  speaker?: string
  power?: string
  specialFeatures?: string[]
}

export type ProductCategory =
  | 'Digital Products'
  | 'Gift Cards'
  | 'Streaming'
  | 'Subscriptions'
  | 'Gaming'
  | 'Software'
  | 'IPTV & Services'
  | 'Smart Projectors'
  | 'AI & Productivity'
  | 'Games'
  | 'IPTV & Streaming'
  | 'Bundles'
  | string

export interface Product {
  id: string
  sku: string
  name: string
  category: ProductCategory
  description: string
  detailedDescription?: string
  price: number // base price in PKR
  originalPrice?: number
  currency?: string
  discountPercent?: number
  image: string
  galleryImages?: string[]
  tags: string[]
  digital: boolean
  stock: number
  rating: number
  reviewCount: number
  isHot?: boolean
  isFeatured?: boolean
  isFlashDeal?: boolean
  flashDealEnds?: string
  variants?: ProductVariant[]
  projectorSpec?: ProjectorSpec
  deliveryType: 'Instant Auto-Email' | 'Courier Shipping (1-3 Days)' | 'Direct Activation'
  region: 'Global' | 'USA' | 'Europe' | 'Asia' | 'Pakistan'
  features?: string[]
}

export interface CartItem {
  product: Product
  selectedVariant?: ProductVariant
  quantity: number
  unitPrice: number
}

export interface CategoryMeta {
  name: string
  slug: string
  iconName: string
  description: string
  accentColor: string
  glowColor: string
  badgeText?: string
  image: string
}
