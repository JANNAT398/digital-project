import React from 'react'
import { Link } from 'react-router'
import Container from '../components/layout/Container'
import { site } from '../config/site'
import { useSEO } from '../hooks/useSEO'
import {
  FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset, FaCheckCircle,
  FaBullseye, FaEye, FaHeart,
} from 'react-icons/fa'

const img = (prompt, size = 'landscape_4_3') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

const stats = [
  { icon: FaTruck, value: '50K+', label: 'Orders Delivered' },
  { icon: FaHeart, value: '30K+', label: 'Happy Customers' },
  { icon: FaShieldAlt, value: '100%', label: 'Genuine Products' },
  { icon: FaUndoAlt, value: '7 Days', label: 'Easy Returns' },
]

const values = [
  { icon: FaShieldAlt, title: 'Genuine Products', text: 'Every item is sourced from authorised suppliers and comes with official warranty.' },
  { icon: FaTruck, title: 'Fast Nationwide Delivery', text: 'Quick dispatch with reliable courier partners across all 64 districts of Bangladesh.' },
  { icon: FaHeadset, title: 'Friendly Support', text: 'A real human is always ready on WhatsApp and phone to help before and after your purchase.' },
  { icon: FaUndoAlt, title: 'Hassle-Free Returns', text: 'Changed your mind? Our simple 7-day return policy keeps shopping risk-free.' },
]

const About = () => {
  useSEO({
    title: 'About Us',
    description:
      'Learn about FunGearBD — a Bangladeshi online store bringing genuine gadgets, gaming gear and everyday tech to your doorstep with fast delivery and easy returns.',
  })

  return (
    <>
      {/* Hero */}
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-block bg-accent/20 text-accent-dark text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-pop mb-4">
              About {site.name}
            </span>
            <h1 className="font-pop text-3xl sm:text-4xl font-bold text-primary leading-tight mb-5">
              Gadgets &amp; Gaming Gear You Can Trust
            </h1>
            <p className="font-pop text-gray-600 leading-relaxed mb-4">
              {site.name} is a Bangladeshi online store built for tech lovers. From premium headphones
              and smart watches to gaming gear and everyday accessories, we bring you carefully selected
              products at fair prices — delivered fast, anywhere in the country.
            </p>
            <p className="font-pop text-gray-600 leading-relaxed mb-8">
              We started with a simple idea: buying genuine tech online in Bangladesh should be easy,
              transparent and reliable. Today thousands of customers shop with us every month.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary px-7 py-3 text-sm">Shop Now</Link>
              <Link to="/contact" className="btn-outline px-7 py-3 text-sm">Contact Us</Link>
            </div>
          </div>
          <img
            src={img('modern tech gadget store display with headphones smartwatch and gaming accessories, clean bright retail interior')}
            alt={`${site.name} store`}
            className="rounded-2xl w-full h-72 sm:h-96 object-cover shadow-lg"
          />
        </div>
      </Container>

      {/* Stats */}
      <div className="bg-primary py-12">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="inline-flex p-4 bg-white/10 rounded-full mb-4 text-accent">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="font-pop text-2xl sm:text-3xl font-bold text-white">{value}</h3>
                <p className="font-pop text-sm text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Story */}
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <img
            src={img('warehouse team packing tech gadgets into delivery boxes, professional e-commerce logistics', 'landscape_4_3')}
            alt="Our story"
            className="rounded-2xl w-full h-72 sm:h-80 object-cover"
          />
          <div>
            <h2 className="font-pop text-2xl sm:text-3xl font-bold mb-4">Our Story</h2>
            <p className="font-pop text-gray-600 leading-relaxed mb-4">
              Founded in Dhaka, {site.name} grew out of a passion for great gadgets and a frustration with
              unreliable online shopping. We wanted a store where product details are honest, prices are
              fair and support actually responds.
            </p>
            <p className="font-pop text-gray-600 leading-relaxed">
              That commitment to trust is still what drives us. We test our catalogue, stand behind every
              warranty and treat every order — big or small — with the same care.
            </p>
          </div>
        </div>
      </Container>

      {/* Mission & Vision */}
      <div className="bg-gry py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                <FaBullseye size={20} />
              </span>
              <h3 className="font-pop text-xl font-bold mb-3">Our Mission</h3>
              <p className="font-pop text-gray-600 leading-relaxed text-sm">
                To make authentic, quality technology accessible to everyone in Bangladesh — with honest
                pricing, real warranties and a shopping experience that feels effortless from click to doorstep.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <span className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mb-4">
                <FaEye size={20} />
              </span>
              <h3 className="font-pop text-xl font-bold mb-3">Our Vision</h3>
              <p className="font-pop text-gray-600 leading-relaxed text-sm">
                To become the most trusted gadget destination in Bangladesh — known for genuine products,
                exceptional service and a community of happy, loyal customers.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Values */}
      <Container className="py-14 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-pop text-2xl sm:text-3xl font-bold mb-3">What We Stand For</h2>
          <p className="font-pop text-gray-500 text-sm">The values that shape every decision we make.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all">
              <span className="w-14 h-14 mx-auto rounded-full bg-gry text-primary flex items-center justify-center mb-4">
                <Icon size={22} />
              </span>
              <h3 className="font-pop font-semibold text-base mb-2">{title}</h3>
              <p className="font-pop text-sm text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Why choose us */}
      <div className="bg-primary py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-pop text-2xl sm:text-3xl font-bold text-white mb-5">
                Why Choose {site.name}?
              </h2>
              <ul className="space-y-3">
                {[
                  'Genuine, warranty-backed products only',
                  'Free delivery on orders above ৳3,000',
                  'Cash on delivery available nationwide',
                  'Fast, friendly support on WhatsApp',
                  'Simple 7-day return and refund policy',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-white/85 font-pop text-sm">
                    <FaCheckCircle className="text-accent mt-0.5 shrink-0" size={15} />
                    {point}
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="btn-accent px-7 py-3 text-sm mt-8 inline-flex">
                Explore the Store
              </Link>
            </div>
            <img
              src={img('happy customer unboxing a tech gadget delivery parcel at home, warm natural light')}
              alt="Happy customer"
              className="rounded-2xl w-full h-72 sm:h-96 object-cover"
            />
          </div>
        </Container>
      </div>
    </>
  )
}

export default About
