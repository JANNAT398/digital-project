import React from 'react'
import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa'

/** Section heading with optional eyebrow, subtitle and "view all" link. */
export const SectionHeader = ({ eyebrow, title, subtitle, viewAll, align = 'left' }) => (
  <div className={`flex items-end justify-between gap-4 mb-6 sm:mb-8 ${align === 'center' ? 'flex-col text-center' : ''}`}>
    <div className={align === 'center' ? 'mx-auto' : ''}>
      {eyebrow && (
        <span className="inline-block text-accent bg-accent/10 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="font-pop text-sm text-gray-500 mt-2 max-w-xl">{subtitle}</p>}
    </div>
    {viewAll && align !== 'center' && (
      <Link
        to={viewAll}
        className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors shrink-0"
      >
        View all <FaArrowRight className="text-xs" />
      </Link>
    )}
  </div>
)

export default SectionHeader
