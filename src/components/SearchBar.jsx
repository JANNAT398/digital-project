import React, { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Container from './layout/Container'
import Logo from './Logo'
import { FaSearch, FaRegHeart, FaUser } from 'react-icons/fa'
import { FaBagShopping } from 'react-icons/fa6'
import { selectCartCount, selectCartTotal } from '../slices/cartSlice'
import { selectWishlistCount } from '../slices/wishlistSlice'
import { searchProducts } from '../data/products'
import { useFormatPrice } from '../hooks/useFormatPrice'
import { useOutsideClick } from '../hooks/useOutsideClick '

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const boxRef = useRef(null)
  const formatPrice = useFormatPrice()

  const cartCount = useSelector(selectCartCount)
  const cartTotal = useSelector(selectCartTotal)
  const wishlistCount = useSelector(selectWishlistCount)

  useOutsideClick(boxRef, () => setFocused(false), focused)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    return searchProducts(query).slice(0, 6)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
      setFocused(false)
    }
  }

  const goToProduct = (id) => {
    navigate(`/product/${id}`)
    setQuery('')
    setFocused(false)
  }

  const showSuggestions = focused && query.trim().length > 0

  return (
    <div className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 md:py-5">
          {/* Logo + mobile actions */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link to="/" className="shrink-0" aria-label="FunGearBD home">
              <Logo />
            </Link>
            <div className="flex md:hidden items-center gap-4">
              <Link to="/wishlist" className="relative p-1" aria-label="Wishlist">
                <FaRegHeart className="text-xl text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-1" aria-label="Cart">
                <FaBagShopping className="text-xl text-gray-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search with suggestions */}
          <div ref={boxRef} className="relative w-full md:w-[380px] lg:w-[500px]">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  placeholder="Search headphones, watches, gaming gear..."
                  aria-label="Search products"
                  className="border border-gray-300 border-r-0 w-full h-11 sm:h-12 pl-11 pr-3 placeholder:text-gray-400 font-pop text-sm rounded-l-full focus:outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="font-pop font-semibold text-sm text-white px-5 sm:px-7 h-11 sm:h-12 bg-primary rounded-r-full hover:bg-primary-dark transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden">
                {suggestions.length === 0 ? (
                  <p className="px-4 py-5 text-sm text-gray-500 font-pop">No products match “{query}”.</p>
                ) : (
                  <ul className="max-h-96 overflow-y-auto">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onMouseDown={() => goToProduct(p.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gry text-left transition-colors"
                        >
                          <span className="w-11 h-11 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm text-gray-800 line-clamp-1 font-pop">{p.name}</span>
                            <span className="block text-xs text-gray-400">{p.brand}</span>
                          </span>
                          <span className="text-sm font-semibold text-primary shrink-0">{formatPrice(p.price)}</span>
                        </button>
                      </li>
                    ))}
                    <li className="border-t border-gray-100">
                      <button
                        type="button"
                        onMouseDown={handleSearch}
                        className="w-full text-center text-sm font-semibold text-primary py-3 hover:bg-gry transition-colors font-pop"
                      >
                        View all results for “{query}”
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex gap-4 lg:gap-6 items-center shrink-0">
            <Link to="/dashboard" className="hidden lg:flex items-center gap-2.5 hover:text-primary transition-colors">
              <FaUser className="text-xl text-gray-700" />
              <span className="font-pop text-sm">
                <span className="block text-gray-500 text-xs leading-none">Account</span>
                <span className="font-semibold text-gray-900">My Account</span>
              </span>
            </Link>

            <Link to="/wishlist" className="relative pr-4 lg:pr-6 border-r border-gray-200" aria-label="Wishlist">
              <FaRegHeart className="text-2xl text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 right-2 bg-accent text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="flex gap-3 items-center hover:opacity-90" aria-label="Shopping cart">
              <div className="relative">
                <FaBagShopping className="text-2xl text-gray-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="font-pop">
                <span className="text-xs text-gray-500 block leading-none mb-1">Cart total</span>
                <span className="text-sm font-bold text-gray-900">{formatPrice(cartTotal)}</span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SearchBar
