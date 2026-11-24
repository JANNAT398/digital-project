import { getProductById } from '../data/products'

const FALLBACK =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=' +
  encodeURIComponent('tech gadget product photo on white background') +
  '&image_size=square'

/** Resolve the best available image for a product (cart/wishlist items included). */
export function resolveProductImage(product) {
  if (!product) return FALLBACK
  if (typeof product.image === 'string' && product.image.length > 0) {
    return product.image
  }
  const fresh = getProductById(product.id)
  return fresh?.image || FALLBACK
}
