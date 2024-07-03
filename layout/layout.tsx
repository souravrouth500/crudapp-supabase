import Navbar from '@/components/Navbar'
import React from 'react'

function Layout({ children }: any) {
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default Layout