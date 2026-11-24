import React from 'react'
import { Outlet, useLocation } from 'react-router'
import SearchBar from '../components/SearchBar'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import WhatsAppButton from './WhatsAppButton'

const hideBreadcrumb = ['/', '/login', '/registration', '/forgot-password', '/reset-password', '/otp']

const MainlayOut = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 shadow-sm">
        <SearchBar />
        <Navbar />
      </header>

      {!hideBreadcrumb.includes(pathname) && <Breadcrumb />}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default MainlayOut
