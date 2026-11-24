import React from 'react'
import LegalPolicy from '../components/LegalPolicy'
import { site } from '../config/site'

const UPDATED = '1 November 2026'

const sections = [
  {
    id: 'acceptance',
    heading: '1. Acceptance of Terms',
    body: [
      `By accessing or purchasing from ${site.name}, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.`,
    ],
  },
  {
    id: 'accounts',
    heading: '2. Accounts',
    body: [
      'You are responsible for keeping your account credentials confidential and for all activity that occurs under your account. Please notify us immediately of any unauthorised use.',
    ],
  },
  {
    id: 'orders',
    heading: '3. Orders & Pricing',
    body: [
      'All prices are displayed in Bangladeshi Taka (BDT) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to cancel an order if a product is unavailable or mispriced.',
      'An order is confirmed only after you receive a confirmation from us.',
    ],
  },
  {
    id: 'payment',
    heading: '4. Payment',
    body: ['We accept the following payment methods:'],
    list: [
      'Cash on Delivery (COD)',
      'bKash, Nagad and Rocket mobile wallets',
      'Visa and Mastercard',
    ],
  },
  {
    id: 'shipping',
    heading: '5. Shipping & Delivery',
    body: [
      `Free shipping applies to orders above ${site.shipping.freeThreshold} BDT. Below this amount a flat delivery fee of ${site.shipping.flatRate} BDT applies.`,
      'Delivery times are estimates and may vary due to weather, courier delays or public holidays.',
    ],
  },
  {
    id: 'warranty',
    heading: '6. Warranty',
    body: [
      'Products are covered by the warranty stated on the product page. Warranty does not cover physical damage, misuse or unauthorised repairs.',
    ],
  },
  {
    id: 'liability',
    heading: '7. Limitation of Liability',
    body: [
      `${site.name} is not liable for any indirect or incidental damages arising from the use of our products or website, to the extent permitted by law.`,
    ],
  },
  {
    id: 'changes',
    heading: '8. Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.',
    ],
  },
]

const Terms = () => (
  <LegalPolicy
    title="Terms & Conditions"
    updated={UPDATED}
    intro={`These terms govern your use of ${site.name} and any purchase you make from us.`}
    sections={sections}
  />
)

export default Terms
