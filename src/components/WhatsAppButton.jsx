import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappLink } from '../config/site'

/** Floating WhatsApp contact button (visible on every page). */
const WhatsAppButton = () => (
  <a
    href={whatsappLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with FunGearBD on WhatsApp"
    className="group fixed bottom-5 right-4 sm:bottom-7 sm:right-6 z-50 flex items-center gap-0 hover:gap-3
               bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/40
               pl-3.5 pr-3.5 sm:pl-4 sm:pr-4 py-3.5 transition-all duration-300 hover:pr-5"
  >
    <FaWhatsapp className="text-2xl sm:text-[26px]" />
    <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold font-pop transition-all duration-300 group-hover:max-w-[140px]">
      Chat with us
    </span>
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 -z-10" />
  </a>
)

export default WhatsAppButton
