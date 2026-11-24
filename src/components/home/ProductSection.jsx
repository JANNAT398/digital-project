import React from 'react'
import { Link } from 'react-router'
import Container from '../layout/Container'
import ProductCard from '../ProductCard'
import SectionHeader from './SectionHeader'
import { FaArrowRight } from 'react-icons/fa'

const ProductSection = ({ eyebrow, title, subtitle, products, viewAll, onQuickView, columns = 4, tone = 'light' }) => {
  const gridCols = {
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }

  return (
    <section className={tone === 'tint' ? 'bg-gry' : ''}>
      <Container className="py-10 sm:py-14">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} viewAll={viewAll} />

        <div className={`grid grid-cols-2 ${gridCols[columns] || gridCols[4]} gap-3 sm:gap-4`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>

        {viewAll && (
          <div className="mt-8 text-center sm:hidden">
            <Link to={viewAll} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}

export default ProductSection
