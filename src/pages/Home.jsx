import React, { useCallback, useState } from 'react'
import Container from '../components/layout/Container'
import { useSEO } from '../hooks/useSEO'
import HeroSlider from '../components/home/HeroSlider'
import CategoryStrip from '../components/home/CategoryStrip'
import ProductSection from '../components/home/ProductSection'
import PromoBanner from '../components/home/PromoBanner'
import FeaturedCollections from '../components/home/FeaturedCollections'
import Testimonials from '../components/Testimonials'
import QuickViewModal from '../components/QuickViewModal'
import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from 'react-icons/fa'
import {
  getTrendingProducts,
  getBestSellingProducts,
  getNewArrivals,
} from '../data/products'

const features = [
  { icon: FaTruck, title: 'Free Shipping', desc: 'On orders over ৳3,000' },
  { icon: FaShieldAlt, title: 'Secure Payment', desc: '100% protected checkout' },
  { icon: FaUndoAlt, title: 'Easy Returns', desc: '7-day return policy' },
  { icon: FaHeadset, title: 'Dedicated Support', desc: 'Chat with us 24/7' },
]

const trending = getTrendingProducts(8)
const bestSelling = getBestSellingProducts(8)
const newArrivals = getNewArrivals(8)

const Home = () => {
  const [quickView, setQuickView] = useState(null)
  const openQuickView = useCallback((product) => setQuickView(product), [])

  useSEO({
    title: 'Gadgets, Gaming Gear & Everyday Tech',
    description:
      'Shop genuine headphones, smart watches, gaming gear and tech accessories at FunGearBD. Fast delivery across Bangladesh, cash on delivery and easy returns.',
  })

  return (
    <>
      <HeroSlider />

      {/* Trust features */}
      <Container className="py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3.5 p-4 bg-gry rounded-xl hover:shadow-md transition-shadow">
              <span className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center">
                <Icon className="text-primary text-xl" />
              </span>
              <span>
                <span className="block font-pop font-semibold text-sm text-gray-900">{title}</span>
                <span className="block font-pop text-xs text-gray-500">{desc}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>

      <CategoryStrip />

      <ProductSection
        eyebrow="Hot right now"
        title="Trending Products"
        subtitle="The gadgets our customers can't stop buying this month."
        products={trending}
        viewAll="/shop"
        onQuickView={openQuickView}
      />

      <PromoBanner />

      <ProductSection
        eyebrow="Customer favourites"
        title="Best Selling Products"
        subtitle="Top-rated picks loved by thousands of shoppers."
        products={bestSelling}
        viewAll="/shop"
        onQuickView={openQuickView}
        tone="tint"
      />

      <FeaturedCollections />

      <ProductSection
        eyebrow="Just landed"
        title="New Arrivals"
        subtitle="Fresh tech, freshly stocked — be the first to try it."
        products={newArrivals}
        viewAll="/shop"
        onQuickView={openQuickView}
      />

      <Testimonials />

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </>
  )
}

export default Home
