import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes, FaStar, FaHeart, FaRegHeart, FaShoppingBag, FaCheck } from 'react-icons/fa'
import { addToCart } from '../slices/cartSlice'
import { toggleWishlist, selectIsInWishlist } from '../slices/wishlistSlice'
import { useFormatPrice } from '../hooks/useFormatPrice'
import { toast } from 'react-toastify'

/** Accessible quick-view modal used from product grids. */
const QuickViewModal = ({ product, onClose }) => {
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const [qty, setQty] = useState(1)
  const isWishlisted = useSelector(selectIsInWishlist(product?.id))

  useEffect(() => {
    setQty(1)
  }, [product?.id])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const outOfStock = product.inStock === false || product.stock === 0
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  const handleAdd = () => {
    if (outOfStock) return toast.error('This product is out of stock')
    for (let i = 0; i < qty; i++) dispatch(addToCart(product))
    toast.success(`${qty} item(s) added to cart`)
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-[fadeUp_0.25s_ease-out]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gry hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
        >
          <FaTimes />
        </button>

        <div className="grid sm:grid-cols-2 gap-6 p-6 sm:p-8">
          <div className="bg-gry rounded-xl flex items-center justify-center p-6 min-h-[260px]">
            <img src={product.image} alt={product.name} className="max-h-64 object-contain" />
          </div>

          <div>
            <p className="font-pop text-xs uppercase tracking-wide text-gray-400">{product.brand}</p>
            <h2 className="font-pop font-bold text-xl text-gray-900 mt-1">{product.name}</h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={12} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} className={i < Math.round(product.rating) ? '' : 'text-gray-300'} />
                ))}
              </div>
              <span className="font-pop text-xs text-gray-400">({product.ratingCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="font-pop font-bold text-2xl text-primary">{formatPrice(product.price)}</span>
              {discountPercent > 0 && (
                <>
                  <span className="font-pop text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="bg-accent text-primary text-xs font-bold px-2 py-0.5 rounded">-{discountPercent}%</span>
                </>
              )}
            </div>

            <p className="font-pop text-sm text-gray-600 mt-4 leading-relaxed line-clamp-2">{product.description}</p>

            <p className={`font-pop text-sm mt-3 flex items-center gap-1.5 ${outOfStock ? 'text-red-500' : 'text-[color:var(--color-success)]'}`}>
              {!outOfStock && <FaCheck className="text-xs" />}
              {outOfStock ? 'Out of stock' : `In stock (${product.stock} available)`}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} disabled={outOfStock} className="px-3.5 py-2.5 font-pop disabled:opacity-50">−</button>
                <span className="px-3 py-2.5 font-pop text-sm border-x border-gray-300 min-w-[40px] text-center">{qty}</span>
                <button type="button" onClick={() => setQty(qty + 1)} disabled={outOfStock} className="px-3.5 py-2.5 font-pop disabled:opacity-50">+</button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={outOfStock}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-pop text-sm font-semibold transition-colors ${
                  outOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                <FaShoppingBag /> Add to Cart
              </button>
              <button
                type="button"
                onClick={() => { dispatch(toggleWishlist(product)); toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist') }}
                aria-label="Toggle wishlist"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                  isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="inline-block font-pop text-sm font-semibold text-primary hover:text-accent underline mt-5 transition-colors"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default QuickViewModal
