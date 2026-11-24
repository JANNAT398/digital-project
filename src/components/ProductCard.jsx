import React from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar, FaHeart, FaRegHeart, FaEye, FaShoppingBag } from 'react-icons/fa'
import { addToCart } from '../slices/cartSlice'
import { toggleWishlist, selectIsInWishlist } from '../slices/wishlistSlice'
import { toast } from 'react-toastify'
import { useFormatPrice } from '../hooks/useFormatPrice'
import { resolveProductImage } from '../utils/productImage'

const ProductCard = ({ product, onQuickView }) => {
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const isWishlisted = useSelector(selectIsInWishlist(product.id))

  const outOfStock = product.inStock === false || product.stock === 0
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) {
      toast.error('This product is out of stock')
      return
    }
    dispatch(addToCart(product))
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock && !isWishlisted) {
      toast.warning('This product is out of stock and cannot be added to wishlist')
      return
    }
    dispatch(toggleWishlist(product))
    toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 relative group p-3 sm:p-4 flex flex-col justify-between h-full">
      <div>
        <div className="relative mb-3">
          {/* Badges */}
          <div className="absolute top-0 left-0 z-10 flex flex-col gap-1.5">
            {outOfStock ? (
              <span className="bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md font-pop">Out of Stock</span>
            ) : (
              discountPercent > 0 && (
                <span className="bg-accent text-primary text-[11px] font-bold px-2.5 py-1 rounded-md font-pop">-{discountPercent}%</span>
              )
            )}
            {product.tags?.includes('New Arrival') && !outOfStock && (
              <span className="bg-primary text-white text-[11px] font-medium px-2.5 py-1 rounded-md font-pop">New</span>
            )}
          </div>

          {/* Hover actions */}
          <div className="absolute top-0 right-0 z-10 flex flex-col gap-2 translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button
              type="button"
              onClick={handleWishlist}
              aria-label="Toggle wishlist"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors shadow-sm ${
                isWishlisted ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-600 border-gray-200 bg-white hover:bg-primary hover:text-white hover:border-primary'
              }`}
            >
              {isWishlisted ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
            </button>
            {onQuickView && (
              <button
                type="button"
                onClick={handleQuickView}
                aria-label="Quick view"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm"
              >
                <FaEye size={13} />
              </button>
            )}
          </div>

          {/* Image */}
          <Link to={`/product/${product.id}`} className="block h-40 sm:h-48 bg-gray-50 rounded-lg flex items-center justify-center p-2 overflow-hidden">
            <img
              src={resolveProductImage(product)}
              alt={product.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        <p className="font-pop text-[11px] uppercase tracking-wide text-gray-400 mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-pop text-sm sm:text-[15px] text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={11}
              fill={i < Math.round(product.rating || 0) ? 'currentColor' : 'none'}
              className={i < Math.round(product.rating || 0) ? 'text-amber-400' : 'text-gray-300'}
            />
          ))}
          <span className="font-pop text-[11px] text-gray-400">({product.ratingCount || 0})</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="font-pop leading-tight">
          <span className="font-bold text-base sm:text-lg text-primary">{formatPrice(product.price)}</span>
          {discountPercent > 0 && (
            <span className="block text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          aria-label="Add to cart"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border shrink-0 ${
            outOfStock
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gry border-gray-200 text-primary hover:bg-accent hover:border-accent'
          }`}
        >
          <FaShoppingBag size={14} />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
