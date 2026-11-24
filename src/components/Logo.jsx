import React from 'react'
import logoDark from '../assets/images/logo-dark.png'
import logoLight from '../assets/images/logo-light.png'

/**
 * FunGearBD Official Brand Logo.
 * variant="light" for dark backgrounds (footer/navbar)
 * variant="dark" for light backgrounds (searchbar/header)
 */
const Logo = ({ variant = 'dark', className = '', alt = 'FunGearBD Logo' }) => {
  const logoSrc = variant === 'light' ? logoLight : logoDark

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt={alt}
        className="h-9 sm:h-10 md:h-11 w-auto max-w-[170px] sm:max-w-[210px] object-contain transition-transform duration-200 hover:scale-[1.02]"
        loading="eager"
      />
    </span>
  )
}

export default Logo
