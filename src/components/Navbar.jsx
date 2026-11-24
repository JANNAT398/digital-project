import React, { useRef, useState } from 'react'
import Container from '../components/layout/Container'
import { Link } from 'react-router'
import { FaBars, FaAngleDown } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { useOutsideClick } from '../hooks/useOutsideClick '
import { site } from '../config/site'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

const policyLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/return-refund', label: 'Return & Refund' },
]

const linkClass =
  'block py-4 px-3 font-medium text-white/90 hover:text-accent transition-colors'

const NavDropdown = ({ label, links }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false), open)

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 py-4 px-3 text-sm font-medium text-white/90 hover:text-accent transition-colors"
      >
        {label}
        <FaAngleDown className="text-[10px]" />
      </button>
      {open && (
        <div className="absolute left-0 top-full bg-white text-gray-800 py-2 rounded-b-lg shadow-xl border-t-2 border-accent min-w-[200px] z-50">
          <ul>
            {links.map(({ to, label: linkLabel }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block px-4 py-2.5 text-sm hover:bg-gry hover:text-primary transition-colors"
                >
                  {linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const dropdownRefMobileMenu = useRef(null)

  useOutsideClick(dropdownRefMobileMenu, () => setMobileMenu(false), mobileMenu)

  return (
    <div className="bg-primary text-white shadow-md">
      <Container>
        <div className="flex justify-between items-center w-full">
          {/* Mobile & Tablet header controls */}
          <div className="flex lg:hidden items-center justify-between w-full py-2.5">
            <button
              onClick={() => setMobileMenu(true)}
              className="p-2.5 bg-accent text-primary rounded-md flex items-center gap-2 font-pop text-sm font-semibold focus:outline-none"
              aria-label="Open navigation menu"
            >
              <FaBars className="text-lg" />
              <span>Menu</span>
            </button>

            <Link
              to={site.contact.phoneHref}
              className="flex items-center gap-2 text-xs sm:text-sm hover:text-accent transition-colors"
            >
              <FiPhoneCall className="text-accent text-base" />
              <span>{site.contact.phone}</span>
            </Link>
          </div>

          {/* Desktop navbar */}
          <div className="hidden lg:flex justify-between items-center w-full">
            <ul className="flex items-center gap-1 xl:gap-2 text-sm font-pop list-none m-0 p-0">
              {navLinks.map(({ to, label }) => (
                <li key={to} className="list-none">
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
              <li className="list-none">
                <NavDropdown label="Policies" links={policyLinks} />
              </li>
            </ul>

            <div>
              <Link
                to={site.contact.phoneHref}
                className="flex text-sm gap-2 items-center text-white hover:text-accent transition-colors"
              >
                <FiPhoneCall className="text-accent text-base" />
                <span>{site.contact.phone}</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile slide-over menu */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/60 z-50 lg:hidden">
          <div
            ref={dropdownRefMobileMenu}
            className="fixed top-0 left-0 h-full w-[290px] sm:w-[330px] bg-white text-gray-800 p-5 overflow-y-auto shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                <span className="font-bold font-pop text-lg text-primary">Menu</span>
                <button
                  onClick={() => setMobileMenu(false)}
                  className="text-gray-500 hover:text-black font-bold text-2xl"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5 font-pop">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Browse
                  </h4>
                  <ul className="space-y-1.5 text-sm font-medium">
                    {navLinks.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1.5 hover:text-primary"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Policies
                  </h4>
                  <ul className="space-y-1.5 text-sm font-medium">
                    {policyLinks.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          onClick={() => setMobileMenu(false)}
                          className="block py-1.5 hover:text-primary"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-200 text-xs text-gray-500 font-pop">
              <p>Call us:</p>
              <Link to={site.contact.phoneHref} className="text-sm font-bold text-primary block mt-1">
                {site.contact.phone}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
