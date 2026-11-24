import axios from 'axios'

/**
 * ============================================================================
 *  PRODUCT API SERVICE (API কনফিগারেশন)
 * ============================================================================
 *  akhn DummyJSON API diye dynamic product load kora hocche.
 *  Pore apni apnar nijer API theke product ante chaile nicher:
 *    1. `PRODUCT_API_URL` e apnar API endpoint boshie din.
 *    2. `mapApiProduct` function-e apnar API response er field gulo match korun.
 * ============================================================================
 */

// apni pore ei URL ti apnar iccha moto API endpoint diye replace korte paren:
export const PRODUCT_API_URL = 'https://dummyjson.com/products?limit=100'

/**
 * Format raw category slug into a readable label (e.g. "mobile-accessories" -> "Mobile Accessories")
 */
export const formatCategoryName = (slug = '') => {
  if (!slug) return 'General'
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Maps an item from the external API to FunGearBD's product schema.
 * Modify this function if your future API uses different field names.
 */
export const mapApiProduct = (item, index = 0) => {
  const bdtRate = 120 // Conversion rate: 1 USD ~ 120 BDT
  const priceInBDT = Math.round((Number(item.price) || 20) * bdtRate)
  const discount = Number(item.discountPercentage) || 0
  const oldPrice = discount > 5 ? Math.round(priceInBDT / (1 - discount / 100)) : null

  const categorySlug = String(item.category || 'gadgets').toLowerCase().replace(/\s+/g, '-')
  const categoryTitle = formatCategoryName(item.category)

  // Images
  const mainImage = item.thumbnail || (item.images && item.images[0]) || ''
  const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : [mainImage]

  const highlights = [
    item.warrantyInformation,
    item.shippingInformation,
    item.returnPolicy,
    item.availabilityStatus ? `Status: ${item.availabilityStatus}` : null,
  ].filter(Boolean)

  return {
    id: Number(item.id) || index + 1,
    name: item.title || item.name || 'Tech Product',
    brand: item.brand || 'Original Brand',
    price: priceInBDT,
    oldPrice: oldPrice,
    rating: Math.min(5, Math.max(1, Math.round(Number(item.rating) || 4))),
    ratingCount: Array.isArray(item.reviews) ? item.reviews.length : (item.ratingCount || 15),
    sale: discount > 5,
    inStock: item.stock !== undefined ? item.stock > 0 : true,
    stock: item.stock !== undefined ? Number(item.stock) : 25,
    sold: 45 + ((item.id || index) * 13) % 250,
    category: categorySlug,
    categoryName: categoryTitle,
    tags: Array.isArray(item.tags) && item.tags.length > 0
      ? item.tags
      : [categoryTitle, 'Genuine', 'Popular'],
    highlights: highlights.length > 0
      ? highlights
      : ['Genuine Authentic Product', 'Fast Delivery in Bangladesh', 'Warranty Included'],
    description: item.description || 'High quality tech gear and everyday accessories with official warranty and reliable performance.',
    specs: {
      Brand: item.brand || 'Original',
      Category: categoryTitle,
      SKU: item.sku || `SKU-${item.id || index}`,
      Warranty: item.warrantyInformation || '1 Year Official Warranty',
      Shipping: item.shippingInformation || 'Delivery within 2-4 business days',
      Return: item.returnPolicy || '7 Days Replacement Policy',
    },
    image: mainImage,
    images: images,
    raw: item, // preserved for future custom fields
  }
}

/**
 * Fetch products from the configured API.
 * Falls back safely if the network request fails.
 */
export const fetchProductsFromApi = async () => {
  try {
    const res = await axios.get(PRODUCT_API_URL, { timeout: 8000 })
    const rawList = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data?.products)
      ? res.data.products
      : []

    if (!rawList || rawList.length === 0) {
      throw new Error('No products received from API')
    }

    const mappedProducts = rawList.map((p, idx) => mapApiProduct(p, idx))

    // Automatically build categories list based on API products
    const categoryMap = new Map()
    mappedProducts.forEach((p) => {
      if (!categoryMap.has(p.category)) {
        categoryMap.set(p.category, {
          slug: p.category,
          name: p.categoryName || formatCategoryName(p.category),
          image: p.image,
        })
      }
    })

    const dynamicCategories = Array.from(categoryMap.values())

    return {
      success: true,
      products: mappedProducts,
      categories: dynamicCategories,
    }
  } catch (error) {
    console.warn('Product API fetch warning, using fallback products:', error.message)
    return {
      success: false,
      error: error.message,
      products: null,
      categories: null,
    }
  }
}
