import React from 'react'
import Container from '../components/layout/Container'
import SectionHeader from './home/SectionHeader'
import { BiSolidQuoteAltRight } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Autoplay } from 'swiper/modules'
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Tanvir Ahmed',
    role: 'Dhaka',
    initials: 'TA',
    text: 'Ordered a pair of headphones and a power bank. Both were 100% genuine and delivery took only two days across Dhaka. Customer support on WhatsApp was super responsive.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Chattogram',
    initials: 'NJ',
    text: 'The smartwatch I bought works perfectly and the packaging was really secure. Prices are competitive and the return policy gave me confidence to order.',
  },
  {
    name: 'Rakib Hasan',
    role: 'Sylhet',
    initials: 'RH',
    text: 'Best online gadget shop I have used in Bangladesh. Genuine products, honest pricing and they actually answer your questions before you buy.',
  },
  {
    name: 'Sadia Islam',
    role: 'Rajshahi',
    initials: 'SI',
    text: 'I have ordered three times now — gaming mouse, keyboard and earbuds. Every single product matched the description. Highly recommended for tech lovers.',
  },
]

const Testimonials = () => {
  const slider = {
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: { prevEl: '.prevarrow', nextEl: '.nextarrow' },
    breakpoints: { 769: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } },
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    modules: [Navigation, Autoplay],
  }

  return (
    <section className="bg-gry py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="Customer stories"
          title="What Our Customers Say"
          subtitle="Trusted by thousands of tech lovers across Bangladesh."
        />

        <div className="flex justify-end gap-3 -mt-14 mb-8">
          <button aria-label="Previous testimonial" className="prevarrow w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <FaArrowLeft className="text-sm" />
          </button>
          <button aria-label="Next testimonial" className="nextarrow w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        <Swiper {...slider}>
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} className="h-auto">
              <div className="bg-white rounded-xl p-6 h-full flex flex-col border border-gray-100">
                <BiSolidQuoteAltRight className="text-3xl text-accent" />
                <div className="flex text-amber-400 gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={13} />)}
                </div>
                <p className="font-pop text-sm text-gray-600 leading-relaxed my-4 flex-1">“{t.text}”</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <span className="w-11 h-11 rounded-full bg-primary text-accent font-pop font-bold flex items-center justify-center">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-pop font-semibold text-sm text-gray-900">{t.name}</span>
                    <span className="block font-pop text-xs text-gray-400">Verified buyer · {t.role}</span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Testimonials
