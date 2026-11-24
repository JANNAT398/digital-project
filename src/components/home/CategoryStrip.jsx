import React from 'react'
import { Link } from 'react-router'
import Container from '../layout/Container'
import SectionHeader from './SectionHeader'
import { categories } from '../../data/products'

const CategoryStrip = () => (
  <Container className="py-10 sm:py-14">
    <SectionHeader
      eyebrow="Shop by category"
      title="Featured Categories"
      subtitle="Everything you need for work, play and everyday life — organised so you can find it fast."
      viewAll="/shop"
    />

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/shop?category=${cat.slug}`}
          className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col items-center text-center hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gry flex items-center justify-center overflow-hidden mb-3 group-hover:bg-accent/15 transition-colors">
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="max-h-[70%] max-w-[70%] object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h3 className="font-pop font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors leading-snug">
            {cat.name}
          </h3>
        </Link>
      ))}
    </div>
  </Container>
)

export default CategoryStrip
