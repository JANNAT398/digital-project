import React, { useState } from 'react'
import { Link } from 'react-router'
import { FaChevronDown, FaChevronUp, FaStar, FaBolt } from 'react-icons/fa'
import PriceRangeSlider from './PriceRangeSlider'
import { useFormatPrice } from '../hooks/useFormatPrice'

const FilterSection = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full font-pop font-semibold text-gray-900 text-base mb-3"
      >
        {title}
        {open ? <FaChevronUp size={12} className="text-gray-400" /> : <FaChevronDown size={12} className="text-gray-400" />}
      </button>
      {open && children}
    </div>
  )
}

const FilterSidebar = ({
  categories,
  categoryCounts,
  selectedCategories,
  onCategoryToggle,
  priceBounds,
  priceRange,
  onPriceChange,
  selectedRatings,
  onRatingToggle,
  popularTags,
  selectedTags,
  onTagToggle,
  saleProducts,
}) => {
  const formatPrice = useFormatPrice()
  const ratingOptions = [5, 4, 3, 2, 1]

  return (
    <aside className="font-pop space-y-0">
      <FilterSection title="All Categories">
        <ul className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const count = categoryCounts[cat.slug] || 0
            const checked = selectedCategories.includes(cat.slug)
            return (
              <li key={cat.slug}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onCategoryToggle(cat.slug)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <span className={`text-sm flex-1 ${checked ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-primary'}`}>
                    {cat.name}
                  </span>
                  <span className="text-xs text-gray-400">({count})</span>
                </label>
              </li>
            )
          })}
        </ul>
      </FilterSection>

      <FilterSection title="Price">
        <PriceRangeSlider
          min={priceBounds.min}
          max={priceBounds.max}
          value={priceRange}
          onChange={onPriceChange}
          formatLabel={formatPrice}
        />
      </FilterSection>

      <FilterSection title="Rating">
        <ul className="space-y-2.5">
          {ratingOptions.map((stars) => {
            const checked = selectedRatings.includes(stars)
            return (
              <li key={stars}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onRatingToggle(stars)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={i < stars ? 'text-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </span>
                  <span className={`text-sm ${checked ? 'text-primary font-medium' : 'text-gray-500'}`}>
                    {stars === 5 ? '5.0' : `${stars}.0 & up`}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </FilterSection>

      <FilterSection title="Popular Tag">
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => {
            const active = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-100 text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <div className="relative overflow-hidden rounded-xl mt-6 mb-6 bg-primary text-white p-5">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-accent/20" aria-hidden="true" />
        <div className="absolute -right-2 -bottom-4 w-16 h-16 rounded-full bg-accent/10" aria-hidden="true" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1 text-accent text-xs font-semibold uppercase tracking-wider">
            <FaBolt size={12} /> Hot Deals
          </span>
          <p className="font-bold text-lg mt-2 leading-tight">Up to 40% off tech &amp; gaming gear</p>
          <p className="text-white/70 text-xs mt-1">Limited-time offers on selected items.</p>
          <Link
            to="/shop?sale=true"
            className="inline-block bg-accent text-primary text-sm font-semibold mt-3 px-4 py-2 rounded-full hover:bg-accent-dark transition-colors"
          >
            Shop deals →
          </Link>
        </div>
      </div>

      <FilterSection title="Sale Products" defaultOpen={true}>
        <ul className="space-y-4">
          {saleProducts.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`} className="flex gap-3 group">
                <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-1 border border-gray-100">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={10}
                        className={i < (product.ratingCount || product.rating) ? 'text-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  )
}

export default FilterSidebar
