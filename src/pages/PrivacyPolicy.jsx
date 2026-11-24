import React from 'react'
import LegalPolicy from '../components/LegalPolicy'
import { site } from '../config/site'

const UPDATED = '1 November 2026'

const sections = [
  {
    id: 'introduction',
    heading: '1. Introduction',
    body: [
      `Welcome to ${site.name}. Your privacy matters to us. This Privacy Policy explains how we collect, use, store and protect your personal information when you shop with us at ${site.url}.`,
      'By using our website and services, you agree to the practices described in this policy.',
    ],
  },
  {
    id: 'information-we-collect',
    heading: '2. Information We Collect',
    body: ['We collect information that helps us process your orders and improve your shopping experience:'],
    list: [
      'Contact details such as your name, email address, phone number and delivery address.',
      'Order information including the products you purchase and your payment method.',
      'Account information if you create an account with us.',
      'Technical data such as your browser type, device and pages visited.',
    ],
  },
  {
    id: 'how-we-use',
    heading: '3. How We Use Your Information',
    body: ['Your information is used strictly to run and improve our store:'],
    list: [
      'To process, confirm and deliver your orders.',
      'To provide customer support and respond to your enquiries.',
      'To send order updates, and — with your consent — promotional offers.',
      'To detect and prevent fraud and keep our platform secure.',
    ],
  },
  {
    id: 'sharing',
    heading: '4. Sharing Your Information',
    body: [
      'We never sell your personal data. We only share information with trusted third parties who help us operate, such as delivery partners and payment providers, and only as much as is necessary to fulfil your order.',
      'We may also disclose information when required by law.',
    ],
  },
  {
    id: 'cookies',
    heading: '5. Cookies & Local Storage',
    body: [
      'We use cookies and browser local storage to keep items in your cart and wishlist, remember your preferences and understand how the site is used. You can clear these at any time from your browser settings.',
    ],
  },
  {
    id: 'security',
    heading: '6. Data Security',
    body: [
      'We use reasonable technical and organisational measures to protect your personal information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'your-rights',
    heading: '7. Your Rights',
    body: ['You have the right to:'],
    list: [
      'Access the personal information we hold about you.',
      'Request correction or deletion of your data.',
      'Unsubscribe from marketing communications at any time.',
    ],
  },
  {
    id: 'contact',
    heading: '8. Contact Us',
    body: [
      `If you have any questions about this Privacy Policy, please contact us at ${site.contact.email} or call ${site.contact.phone}.`,
    ],
  },
]

const PrivacyPolicy = () => (
  <LegalPolicy
    title="Privacy Policy"
    updated={UPDATED}
    intro={`This policy describes how ${site.name} handles your personal data.`}
    sections={sections}
  />
)

export default PrivacyPolicy
