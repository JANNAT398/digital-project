import React, { useState } from 'react'
import Container from '../components/layout/Container'
import { useSEO } from '../hooks/useSEO'
import { site, whatsappLink, mapEmbedUrl } from '../config/site'
import { toast } from 'react-toastify'
import {
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaClock,
  FaFacebookF, FaInstagram, FaYoutube, FaTiktok,
} from 'react-icons/fa'

const contactCards = [
  { icon: FaMapMarkerAlt, title: 'Visit Our Office', value: site.contact.address },
  { icon: FaPhoneAlt, title: 'Call Us', value: site.contact.phone, href: site.contact.phoneHref },
  { icon: FaEnvelope, title: 'Email Us', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: FaClock, title: 'Business Hours', value: site.contact.hours },
]

const socials = [
  { href: site.social.facebook, icon: FaFacebookF, label: 'Facebook' },
  { href: site.social.instagram, icon: FaInstagram, label: 'Instagram' },
  { href: site.social.youtube, icon: FaYoutube, label: 'YouTube' },
  { href: site.social.tiktok, icon: FaTiktok, label: 'TikTok' },
]

const INITIAL = { name: '', email: '', subject: '', message: '' }

const Contact = () => {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})

  useSEO({
    title: 'Contact Us',
    description:
      'Get in touch with FunGearBD — questions about a product, your order or a partnership. Call, email or message us on WhatsApp and we will reply within 24 hours.',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name'
    if (!form.email.trim()) next.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.subject.trim()) next.subject = 'Please enter a subject'
    if (!form.message.trim()) next.message = 'Please write a message'
    else if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the highlighted fields')
      return
    }
    // Demo submission — connect this to your backend / email service.
    toast.success('Message sent! Our team will get back to you within 24 hours.')
    setForm(INITIAL)
  }

  const fieldClass = (name) => (errors[name] ? 'fromInput !border-red-400' : 'fromInput')

  return (
    <>
      <Container className="py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-pop text-2xl sm:text-3xl font-bold mb-3">Get in Touch</h1>
          <p className="font-pop text-gray-500 text-sm">
            Questions about a product, an order or a partnership? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {contactCards.map(({ icon: Icon, title, value, href }) => {
            const inner = (
              <>
                <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                  <Icon size={18} />
                </span>
                <h3 className="font-pop font-semibold text-sm mb-1">{title}</h3>
                <p className="font-pop text-sm text-gray-500 leading-relaxed">{value}</p>
              </>
            )
            return href ? (
              <a key={title} href={href} className="block p-6 rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all">
                {inner}
              </a>
            ) : (
              <div key={title} className="p-6 rounded-2xl border border-gray-100">{inner}</div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <h2 className="font-pop text-xl font-bold mb-5">Send Us a Message</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={fieldClass('name')} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={fieldClass('email')} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className={fieldClass('subject')} />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Your Message" className={`${fieldClass('message')} resize-none`} />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary px-8 py-3 text-sm">Send Message</button>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold rounded-full px-8 py-3 text-sm hover:brightness-95 transition"
                >
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </a>
              </div>
            </form>

            <div className="mt-8">
              <p className="font-pop text-sm font-semibold text-gray-800 mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-gry text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="font-pop text-xl font-bold mb-5">Find Us</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-80 lg:h-[420px]">
              <iframe
                title="FunGearBD location map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contact
