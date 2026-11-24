import React, { useState, useCallback } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/layout/Container'
import ProductCard from '../components/ProductCard'
import QuickViewModal from '../components/QuickViewModal'
import { removeFromWishlist, selectWishlistItems } from '../slices/wishlistSlice'
import { FaRegHeart } from 'react-icons/fa'

const Wishlist = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectWishlistItems)
  const [quickView, setQuickView] = useState(null)
  const openQuickView = useCallback((product) => setQuickView(product), [])

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gry flex items-center justify-center text-primary">
          <FaRegHeart size={30} />
        </div>
        <h1 className="font-pop text-2xl font-bold mb-3">Your wishlist is empty</h1>
        <p className="font-pop text-gray-500 mb-8">Save products you love for later.</p>
        <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-pop text-sm font-semibold hover:bg-primary-dark transition-colors">
          Browse Products
        </Link>
      </Container>
    )
  }

  return (
    <>
      <Container className="py-8 sm:py-12">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="font-pop text-xl sm:text-2xl font-bold">My Wishlist ({items.length})</h1>
          <Link to="/shop" className="font-pop text-sm font-semibold text-primary hover:underline">
            Continue shopping →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} onQuickView={openQuickView} />
              <button
                type="button"
                onClick={() => dispatch(removeFromWishlist(product.id))}
                className="absolute top-3 left-3 text-xs bg-white/90 hover:bg-red-500 hover:text-white text-red-500 border border-red-200 px-2.5 py-1 rounded-md font-pop z-30 shadow-sm transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </Container>

      {quickView && (
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      )}
    </>
  )
}

export default Wishlist
