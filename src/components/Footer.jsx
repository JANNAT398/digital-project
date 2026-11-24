import React from 'react'
import Container from './layout/Container'
import Logo from './Logo'
import { Link } from 'react-router'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { site, whatsappLink } from '../config/site'
import { categories } from '../data/products'

const socials = [
  { href: site.social.facebook, icon: FaFacebookF, label: 'Facebook' },
  { href: site.social.instagram, icon: FaInstagram, label: 'Instagram' },
  { href: site.social.youtube, icon: FaYoutube, label: 'YouTube' },
  { href: site.social.tiktok, icon: FaTiktok, label: 'TikTok' },
]

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-16">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {[
              { icon: FaPhoneAlt, title: 'Call Support', value: site.contact.phone, href: site.contact.phoneHref },
              { icon: FaEnvelope, title: 'Email Us', value: site.contact.email, href: `mailto:${site.contact.email}` },
              { icon: FaMapMarkerAlt, title: 'Visit Store', value: site.contact.address },
              { icon: FaWhatsapp, title: 'WhatsApp Order', value: 'Message us anytime', href: whatsappLink() },
            ].map(({ icon: Icon, title, value, href }) => {
              const inner = (
                <div className="flex items-start gap-3">
                  <span className="w-11 h-11 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                    <Icon className="text-lg" />
                  </span>
                  <span className="font-pop">
                    <span className="block text-xs uppercase tracking-wider text-white/50">{title}</span>
                    <span className="block text-sm text-white/90 mt-0.5">{value}</span>
                  </span>
                </div>
              )
              return href ? (
                <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                  {inner}
                </a>
              ) : (
                <div key={title}>{inner}</div>
              )
            })}
          </div>
        </Container>
      </div>

      {/* Main footer */}
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="max-w-[340px] text-sm text-white/60 my-5 leading-6 font-pop">
              {site.shortDescription}
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-accent hover:text-primary transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h5 className="font-semibold text-white mb-5 font-pop">Shop</h5>
            <ul className="text-sm text-white/60 space-y-3 font-pop">
              <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link to="/shop?sale=true" className="hover:text-accent transition-colors">Hot Deals</Link></li>
              <li><Link to="/wishlist" className="hover:text-accent transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-accent transition-colors">Shopping Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-accent transition-colors">Checkout</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="lg:col-span-2">
            <h5 className="font-semibold text-white mb-5 font-pop">Help</h5>
            <ul className="text-sm text-white/60 space-y-3 font-pop">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/return-refund" className="hover:text-accent transition-colors">Return & Refund</Link></li>
              <li><Link to="/dashboard/orders" className="hover:text-accent transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h5 className="font-semibold text-white mb-5 font-pop">Categories</h5>
            <ul className="text-sm text-white/60 space-y-3 font-pop">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link to={`/shop?category=${c.slug}`} className="hover:text-accent transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + payment */}
          <div className="lg:col-span-2">
            <h5 className="font-semibold text-white mb-5 font-pop">Legal</h5>
            <ul className="text-sm text-white/60 space-y-3 font-pop">
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/return-refund" className="hover:text-accent transition-colors">Return & Refund</Link></li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 font-pop text-center md:text-left">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {site.paymentMethods.map((m) => (
                <span key={m} className="text-[11px] font-pop text-white/70 bg-white/10 px-2.5 py-1 rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
