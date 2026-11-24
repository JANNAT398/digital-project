import React, { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/layout/Container'
import ProductCard from '../components/ProductCard'
import { getProductById, products, getCategoryName, getProductReviews } from '../data/products'
import { addToCart } from '../slices/cartSlice'
import { toggleWishlist, selectIsInWishlist } from '../slices/wishlistSlice'
import { useFormatPrice } from '../hooks/useFormatPrice'
import { useSEO } from '../hooks/useSEO'
import { resolveProductImage } from '../utils/productImage'
import { site, whatsappLink } from '../config/site'
import { toast } from 'react-toastify'
import {
  FaStar, FaRegStar, FaHeart, FaRegHeart, FaShoppingBag, FaTruck,
  FaUndoAlt, FaShieldAlt, FaMinus, FaPlus, FaCheck, FaCheckCircle,
} from 'react-icons/fa'
import { FiZoomIn } from 'react-icons/fi'
import { BsWhatsapp } from 'react-icons/bs'

const TABS = ['description', 'specifications', 'shipping', 'reviews']

const Stars = ({ value = 0, size = 14, className = '' }) => (
  <span className={`inline-flex items-center gap-0.5 text-amber-400 ${className}`} aria-label={`${value} out of 5 stars`}>
    {[...Array(5)].map((_, i) =>
      i < Math.round(value)
        ? <FaStar key={i} size={size} />
        : <FaRegStar key={i} size={size} className="text-gray-300" />
    )}
  </span>
)

const Details = () => {
  const { id } = useParams()
  const product = getProductById(id)
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const isWishlisted = useSelector(selectIsInWishlist(Number(id)))

  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 })
  const [activeTab, setActiveTab] = useState('description')

  const reviews = useMemo(() => getProductReviews(product), [product])

  useSEO({
    title: product ? product.name : 'Product',
    description: product?.description,
    image: product?.image,
  })

  if (!product) return <Navigate to="/shop" replace />

  const outOfStock = product.inStock === false || product.stock === 0
  const images = product.images?.length ? product.images : [resolveProductImage(product)]
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const ratingAvg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : product.rating || 0

  const handleAddToCart = () => {
    if (outOfStock) {
      toast.error('This product is currently out of stock')
      return
    }
    for (let i = 0; i < qty; i++) dispatch(addToCart(product))
    toast.success(`${qty} × ${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    if (outOfStock) {
      toast.error('This product is currently out of stock')
      return
    }
    for (let i = 0; i < qty; i++) dispatch(addToCart(product))
    window.location.href = '/checkout'
  }

  const handleWishlist = () => {
    dispatch(toggleWishlist(product))
    toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoom({ active: true, x, y })
  }

  return (
    <>
      <Container className="py-8 sm:py-10">
        {/* Breadcrumb line */}
        <nav className="font-pop text-xs sm:text-sm text-gray-500 mb-6 flex items-center flex-wrap gap-1.5">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{getCategoryName(product.category)}</Link>
          <span>/</span>
          <span className="text-gray-800 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div
              className="relative bg-gry rounded-2xl border border-gray-100 overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setZoom((z) => ({ ...z, active: true }))}
              onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
              onMouseMove={handleMouseMove}
            >
              {discountPercent > 0 && !outOfStock && (
                <span className="absolute top-4 left-4 z-20 bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-md font-pop">
                  -{discountPercent}% OFF
                </span>
              )}
              {outOfStock && (
                <span className="absolute top-4 left-4 z-20 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-md font-pop">
                  Out of Stock
                </span>
              )}
              <div className="aspect-square flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out"
                  style={{
                    transform: zoom.active ? 'scale(2)' : 'scale(1)',
                    transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  }}
                />
              </div>
              <span className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 bg-white/90 text-gray-600 text-[11px] font-pop px-2.5 py-1 rounded-full shadow-sm">
                <FiZoomIn size={12} /> Hover to zoom
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 mt-4">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 bg-gry flex items-center justify-center p-2 transition-colors ${
                    activeImage === i ? 'border-primary' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={src} alt={`${product.name} thumbnail ${i + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="font-pop">
            <p className="text-xs uppercase tracking-wider text-accent-dark font-semibold mb-2">
              {product.brand}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Stars value={ratingAvg} />
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className="text-sm text-gray-500 hover:text-primary underline-offset-2 hover:underline"
              >
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </button>
              <span className="text-gray-300">|</span>
              {outOfStock ? (
                <span className="text-sm font-medium text-red-500">Out of stock</span>
              ) : (
                <span className="text-sm font-medium text-green-600 inline-flex items-center gap-1">
                  <FaCheck size={11} /> In stock ({product.stock})
                </span>
              )}
            </div>

            <div className="flex items-end gap-3 mb-5">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {discountPercent > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="text-sm font-semibold text-accent-dark bg-accent/20 px-2 py-0.5 rounded">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

            {product.highlights?.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                    <FaCheckCircle className="text-accent mt-0.5 shrink-0" size={14} />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity + actions */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={outOfStock}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <FaMinus size={11} />
                </button>
                <span className="w-12 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={outOfStock}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <FaPlus size={11} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`btn-primary flex-1 min-w-[150px] justify-center py-3 ${outOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaShoppingBag size={14} /> Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock}
                className={`btn-accent flex-1 min-w-[150px] justify-center py-3 ${outOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Buy Now
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-500 hover:border-primary hover:text-primary'
                }`}
              >
                {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
              </button>
            </div>

            <a
              href={whatsappLink(`Hi FunGearBD, I'm interested in "${product.name}". Is it available?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 mb-6"
            >
              <BsWhatsapp size={16} /> Order on WhatsApp
            </a>

            {/* Trust strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              <div className="flex items-start gap-2">
                <FaTruck className="text-primary mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Fast Delivery</p>
                  <p className="text-xs text-gray-500">Free over {formatPrice(site.shipping.freeThreshold)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaUndoAlt className="text-primary mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Easy Returns</p>
                  <p className="text-xs text-gray-500">7-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaShieldAlt className="text-primary mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Genuine Product</p>
                  <p className="text-xs text-gray-500">Official warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Tabs */}
      <Container className="pb-12">
        <div className="border-b border-gray-200 flex gap-6 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`font-pop text-sm font-semibold whitespace-nowrap pb-3 border-b-2 -mb-px transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-primary'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${reviews.length})` : tab}
            </button>
          ))}
        </div>

        <div className="pt-6 font-pop">
          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
              {product.highlights?.length > 0 && (
                <ul className="space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                      <FaCheckCircle className="text-accent mt-0.5 shrink-0" size={14} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gry' : 'bg-white'}>
                      <td className="py-3 px-4 font-semibold text-gray-700 w-1/2">{key}</td>
                      <td className="py-3 px-4 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-5 text-sm text-gray-600">
              <div className="flex gap-3">
                <FaTruck className="text-primary mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Delivery Information</h4>
                  <p>
                    Inside Dhaka delivery within 1–2 business days. Outside Dhaka within 2–4 business days.
                    Free shipping on orders above {formatPrice(site.shipping.freeThreshold)}; a flat fee of{' '}
                    {formatPrice(site.shipping.flatRate)} applies below that. Cash on delivery is available nationwide.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaUndoAlt className="text-primary mt-0.5 shrink-0" size={16} />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Return & Refund</h4>
                  <p>
                    Not satisfied? You can return unused items in original packaging within 7 days of delivery.
                    Refunds are issued within 3–5 business days after inspection. See our{' '}
                    <Link to="/return-refund" className="text-primary underline">Return &amp; Refund Policy</Link>.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaShieldAlt className="text-primary mt-0.5 shrink-0" size={16} />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Warranty</h4>
                  <p>{product.specs?.Warranty || 'Manufacturer warranty'} coverage for genuine defects. Keep your invoice safe.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              <div className="bg-gry rounded-xl p-6 text-center h-fit">
                <p className="text-4xl font-bold text-primary">{ratingAvg.toFixed(1)}</p>
                <Stars value={ratingAvg} size={16} className="justify-center mt-2" />
                <p className="text-sm text-gray-500 mt-2">{reviews.length} verified review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="space-y-5">
                {reviews.map((r, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2 gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center">
                          {r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <Stars value={r.rating} size={12} />
                    </div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-1">{r.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="pb-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-pop text-xl sm:text-2xl font-bold">Related Products</h2>
            <Link to={`/shop?category=${product.category}`} className="font-pop text-sm font-semibold text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      )}
    </>
  )
}

export default Details
