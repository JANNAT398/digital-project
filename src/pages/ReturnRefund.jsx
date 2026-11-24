import React from 'react'
import LegalPolicy from '../components/LegalPolicy'
import { site } from '../config/site'

const UPDATED = '1 November 2026'

const sections = [
  {
    id: 'overview',
    heading: '1. Overview',
    body: [
      `At ${site.name} we want you to shop with confidence. If you are not completely satisfied with your purchase, you may request a return or refund under the conditions below.`,
    ],
  },
  {
    id: 'eligibility',
    heading: '2. Return Eligibility',
    body: ['To be eligible for a return, the item must meet the following conditions:'],
    list: [
      'Return requested within 7 days of delivery.',
      'Product unused and in the same condition you received it.',
      'Original packaging, accessories and invoice included.',
      'Proof of purchase (order ID or invoice) provided.',
    ],
  },
  {
    id: 'non-returnable',
    heading: '3. Non-Returnable Items',
    body: ['The following items cannot be returned for hygiene and safety reasons:'],
    list: [
      'In-ear earphones and earbuds that have been used.',
      'Screen protectors and cases that have been applied.',
      'Products damaged due to misuse or accidental damage.',
      'Items marked as final sale or clearance.',
    ],
  },
  {
    id: 'process',
    heading: '4. How to Request a Return',
    body: ['To start a return, follow these steps:'],
    list: [
      `Message us on WhatsApp or email ${site.contact.email} with your order ID.`,
      'Our team will review your request and confirm within 24 hours.',
      'Pack the item securely and hand it to our courier partner.',
      'Once received and inspected, we will process your refund or replacement.',
    ],
  },
  {
    id: 'refunds',
    heading: '5. Refunds',
    body: [
      'Approved refunds are issued within 3–5 business days after inspection. Refunds are made through your original payment method. For Cash on Delivery orders, we will arrange a bKash, Nagad or bank transfer.',
    ],
  },
  {
    id: 'damaged',
    heading: '6. Damaged or Wrong Items',
    body: [
      'If you receive a damaged, defective or incorrect product, please contact us within 48 hours of delivery with photos. We will arrange a free replacement or full refund, including any delivery charges.',
    ],
  },
  {
    id: 'contact',
    heading: '7. Need Help?',
    body: [
      `Our support team is happy to help. Reach us at ${site.contact.email}, call ${site.contact.phone}, or use the WhatsApp button on any page.`,
    ],
  },
]

const ReturnRefund = () => (
  <LegalPolicy
    title="Return & Refund Policy"
    updated={UPDATED}
    intro={`Everything you need to know about returning a product and getting your money back at ${site.name}.`}
    sections={sections}
  />
)

export default ReturnRefund
