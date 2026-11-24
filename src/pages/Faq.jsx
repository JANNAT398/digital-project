import React, { useState } from 'react'
import { Link } from 'react-router'
import Container from '../components/layout/Container'
import { useSEO } from '../hooks/useSEO'
import { whatsappLink } from '../config/site'
import { FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa'

const faqData = [
  {
    question: 'How do I place an order?',
    answer:
      'Browse our shop, add the products you want to your cart, then go to checkout. Fill in your delivery details, choose a payment method and confirm. You will receive an order confirmation right away.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Cash on Delivery (COD), bKash, Nagad, Rocket, and Visa/Mastercard. All online payments are processed through secure gateways.',
  },
  {
    question: 'How much is delivery and how long does it take?',
    answer:
      'Delivery inside Dhaka takes 1–2 business days and outside Dhaka 2–4 business days. Shipping is free on orders above ৳3,000; below that a flat fee of ৳80 applies.',
  },
  {
    question: 'Are your products genuine and under warranty?',
    answer:
      'Yes. Every product we sell is sourced from authorised suppliers and comes with the warranty stated on the product page. Keep your invoice safe for any warranty claims.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer:
      'You can request a return within 7 days of delivery if the item is unused and in its original packaging. See our Return & Refund Policy for full details.',
  },
  {
    question: 'Is my personal information safe?',
    answer:
      'Absolutely. We use industry-standard security measures and never sell your data. See our Privacy Policy to learn how we handle your information.',
  },
]

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) => setOpenIndex(openIndex === index ? null : index)

  useSEO({
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about ordering, payment methods, delivery times, warranty, returns and data privacy at FunGearBD.',
  })

  return (
    <Container className="py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-pop text-2xl sm:text-3xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="font-pop text-gray-500 text-sm">
          Everything you need to know about ordering, payment, delivery and returns at FunGearBD.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => {
          const open = openIndex === index
          return (
            <div key={item.question} className={`border rounded-xl overflow-hidden transition-colors ${open ? 'border-primary' : 'border-gray-200'}`}>
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-4 p-5 bg-white hover:bg-gry transition-colors text-left"
              >
                <span className="font-pop font-semibold text-sm sm:text-base">{item.question}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${open ? 'bg-primary text-white' : 'bg-gry text-primary'}`}>
                  {open ? <FaMinus size={11} /> : <FaPlus size={11} />}
                </span>
              </button>
              {open && (
                <div className="px-5 pb-5 bg-white">
                  <p className="font-pop text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="max-w-3xl mx-auto mt-10 bg-gry rounded-2xl p-8 text-center">
        <h2 className="font-pop text-lg font-bold mb-2">Still have questions?</h2>
        <p className="font-pop text-sm text-gray-500 mb-5">Our support team is happy to help you out.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary px-7 py-3 text-sm">Contact Us</Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-7 py-3 text-sm"
          >
            <FaWhatsapp size={15} /> WhatsApp
          </a>
        </div>
      </div>
    </Container>
  )
}

export default Faq
