/**
 * FunGearBD — central site configuration.
 * Everything that a business owner may need to change lives here (or in a .env
 * file). Values fall back to safe demo defaults so the site works out of the box.
 */

const env = import.meta.env || {}

export const site = {
  name: 'FunGearBD',
  legalName: 'FunGearBD Ltd.',
  tagline: 'Gadgets, Gaming Gear & Everyday Tech',
  shortDescription:
    'FunGearBD is Bangladesh’s trusted online store for headphones, smart watches, gaming gear and everyday tech accessories — with genuine products, fast delivery and easy returns.',
  url: env.VITE_SITE_URL || 'https://fungearbd.com',
  logoText: 'FunGear',
  logoTextAccent: 'BD',

  // --- Contact -------------------------------------------------------------
  contact: {
    phone: env.VITE_CONTACT_PHONE || '+880 1700-000000',
    phoneHref: 'tel:+8801700000000',
    email: env.VITE_CONTACT_EMAIL || 'support@fungearbd.com',
    address: 'Level 4, Rahman Plaza, Dhanmondi 27, Dhaka 1209, Bangladesh',
    hours: 'Saturday – Thursday, 10:00 AM – 8:00 PM',
  },

  // --- WhatsApp ------------------------------------------------------------
  whatsapp: {
    // international format, digits only (no "+", spaces or dashes)
    number: env.VITE_WHATSAPP_NUMBER || '8801700000000',
    defaultMessage: 'Hello FunGearBD! I would like to know more about a product.',
  },

  // --- Social links --------------------------------------------------------
  social: {
    facebook: env.VITE_SOCIAL_FACEBOOK || 'https://facebook.com/fungearbd',
    instagram: env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com/fungearbd',
    youtube: env.VITE_SOCIAL_YOUTUBE || 'https://youtube.com/@fungearbd',
    tiktok: env.VITE_SOCIAL_TIKTOK || 'https://tiktok.com/@fungearbd',
  },

  // --- Commerce ------------------------------------------------------------
  shipping: {
    freeThreshold: 3000, // BDT — free shipping above this subtotal
    flatRate: 80, // BDT — flat shipping fee
  },
  taxRate: 0,

  paymentMethods: ['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard', 'Cash on Delivery'],
}

/** Build a wa.me link with an optional custom message. */
export const whatsappLink = (message) => {
  const text = encodeURIComponent(message || site.whatsapp.defaultMessage)
  return `https://wa.me/${site.whatsapp.number}?text=${text}`
}

/** Google Maps embed URL (placeholder, configurable via env). */
export const mapEmbedUrl =
  env.VITE_MAP_EMBED_URL ||
  'https://www.google.com/maps?q=Dhanmondi%2027%2C%20Dhaka&output=embed'

export default site
