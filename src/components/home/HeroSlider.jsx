import React from 'react'
import { Link } from 'react-router'
import Container from '../layout/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaArrowRight, FaStar } from 'react-icons/fa'
import { HiOutlineBadgeCheck } from 'react-icons/hi'

const img = (prompt, size = 'square') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

const slides = [
  {
    eyebrow: 'New Season Drop',
    title: 'Gear Up With',
    highlight: 'Pro Tech',
    subtitle: 'Headphones, smart watches and gaming gear — 100% genuine, delivered across Bangladesh.',
    cta: { label: 'Shop Now', to: '/shop' },
    secondary: { label: 'View Deals', to: '/shop?sale=true' },
    image: img('premium wireless headphones smartwatch and earbuds floating arrangement, navy blue background, studio lighting'),
  },
  {
    eyebrow: 'Mega Deal Week',
    title: 'Save Up To',
    highlight: '45% Off',
    subtitle: 'Limited-time discounts on our best-rated audio, wearables and accessories.',
    cta: { label: 'Explore Deals', to: '/shop?sale=true' },
    secondary: { label: 'Best Sellers', to: '/shop' },
    image: img('many tech gadgets collection sale promo, earbuds speaker watch powerbank, navy background, studio lighting'),
  },
  {
    eyebrow: 'Power & Charging',
    title: 'Power That',
    highlight: 'Keeps Up',
    subtitle: 'GaN chargers, power banks and cables designed for everyday Bangladesh.',
    cta: { label: 'Browse Power', to: '/shop?category=power-charging' },
    secondary: { label: 'All Products', to: '/shop' },
    image: img('gan fast charger power bank usb cables product arrangement, navy background, studio lighting'),
  },
]

const HeroSlider = () => {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFC928 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-primary-light/40 blur-3xl" />

      <Container>
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true, el: '.hero-pagination' }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          className="relative z-10"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.highlight}>
              <div className="grid md:grid-cols-2 items-center gap-8 md:gap-6 py-12 md:py-16 lg:py-20">
                <div className="text-white text-center md:text-left order-2 md:order-1">
                  <span className="inline-flex items-center gap-2 bg-accent/15 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                    <HiOutlineBadgeCheck /> {s.eyebrow}
                  </span>
                  <h1 className="font-pop font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-[1.1] text-white mt-5">
                    {s.title}{' '}
                    <span className="text-accent">{s.highlight}</span>
                  </h1>
                  <p className="font-pop text-white/70 text-sm sm:text-base mt-4 max-w-lg mx-auto md:mx-0 leading-relaxed">
                    {s.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-7">
                    <Link
                      to={s.cta.to}
                      className="btn-accent px-7 py-3 text-sm shadow-lg shadow-accent/20"
                    >
                      {s.cta.label} <FaArrowRight className="text-xs" />
                    </Link>
                    <Link
                      to={s.secondary.to}
                      className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold rounded-full px-7 py-3 text-sm hover:bg-white hover:text-primary transition-all duration-300"
                    >
                      {s.secondary.label}
                    </Link>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-6 mt-8 text-white/70">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-300">
                        {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
                      </div>
                      <span className="text-xs font-pop">4.9/5 rated by 12k+ buyers</span>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative w-64 sm:w-80 lg:w-[26rem] aspect-square">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
                    <img
                      src={s.image}
                      alt={`${s.title} ${s.highlight}`}
                      className="relative z-10 w-full h-full object-contain animate-[float_5s_ease-in-out_infinite] drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="hero-pagination flex justify-center gap-2 pb-6 relative z-10" />
        </Swiper>
      </Container>
    </section>
  )
}

export default HeroSlider
