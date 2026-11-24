import React from 'react'
import Container from './layout/Container'
import { Link } from 'react-router'
import { site } from '../config/site'
import { useSEO } from '../hooks/useSEO'

/**
 * Reusable renderer for legal / policy pages.
 *
 * `sections` is an array of { id, heading, body: string[] , list?: string[] }.
 * Content is intentionally simple so a business owner can edit the copy easily.
 */
const LegalPolicy = ({ title, updated, intro, sections }) => {
  useSEO({ title, description: intro })

  return (
    <Container className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="font-pop text-2xl sm:text-3xl font-bold text-primary mb-2">{title}</h1>
          <p className="font-pop text-xs text-gray-400">Last updated: {updated}</p>
          {intro && <p className="font-pop text-sm text-gray-600 mt-4 leading-relaxed">{intro}</p>}
        </header>

        <nav className="bg-gry rounded-xl p-5 mb-10 font-pop">
          <p className="text-sm font-semibold text-gray-800 mb-3">On this page</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-gray-600 hover:text-primary transition-colors">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10 font-pop">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{s.heading}</h2>
              {s.body?.map((p, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="space-y-2 mt-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 font-pop text-sm text-gray-600">
          <p>
            Questions about this policy? Contact us at{' '}
            <a href={`mailto:${site.contact.email}`} className="text-primary underline">{site.contact.email}</a>{' '}
            or visit our{' '}
            <Link to="/contact" className="text-primary underline">Contact page</Link>.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default LegalPolicy
