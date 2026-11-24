import React from 'react'
import { Link } from 'react-router'
import Container from '../layout/Container'
import SectionHeader from './SectionHeader'
import { collections } from '../../data/products'
import { FaArrowRight } from 'react-icons/fa'

const FeaturedCollections = () => (
  <Container className="py-10 sm:py-14">
    <SectionHeader
      eyebrow="Handpicked"
      title="Featured Collections"
      subtitle="Curated bundles for gamers, creators and everyday tech lovers."
      viewAll="/shop"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {collections.map((c) => (
        <Link
          key={c.slug}
          to={`/shop?category=${c.slug}`}
          className="group relative rounded-2xl overflow-hidden h-64 sm:h-72 border border-gray-200"
        >
          <img
            src={c.image}
            alt={c.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-pop font-bold text-xl text-white">{c.title}</h3>
            <p className="font-pop text-sm text-white/75 mt-1">{c.subtitle}</p>
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold mt-4 group-hover:gap-3 transition-all">
              Shop collection <FaArrowRight className="text-xs" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </Container>
)

export default FeaturedCollections
