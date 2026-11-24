import React from 'react'
import { Outlet, useLocation } from 'react-router'
import SearchBar from '../components/SearchBar'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'

const hideBreadcrumb = ['/', '/login', '/registration', '/forgot-password', '/reset-password', '/otp']

const MainlayOut = () => {
  const { pathname } = useLocation()

  return (
    <>
      <SearchBar />
      <Navbar />
      {!hideBreadcrumb.includes(pathname) && <Breadcrumb />}
      <Outlet />
      <Footer />
    </>
  )
}

export default MainlayOut
