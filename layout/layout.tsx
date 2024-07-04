'use client'
// import Navbar from '@/components/Navbar'
import CustomizedAccordions from '@/components/Accordions'
import Navbar from '@/components/Navbar'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Layout({ children }: any) {

  return (
    <>
      <Navbar />
      <Grid container maxWidth={'xl'} mx={'auto'} mt={1}>
        <Grid item xs={12} sm={3} px={1} sx={{ pt: '80px', borderRight: '2px solid #00A76F', height: '100vh' }}>
          {/* <CustomizedAccordions data={['User']} /> */}
          <CustomizedAccordions data={[{ 'parent': 'User', 'child': ['profile', 'list', 'add',] },]} />
          <CustomizedAccordions data={[{ 'parent': 'Product', 'child': ['profile', 'list', 'add',] },]} />
          <CustomizedAccordions data={[{ 'parent': 'Order', 'child': ['profile', 'list', 'add',] },]} />
        </Grid>
        <Grid item xs={12} sm={9} px={1}>
          {children}
        </Grid>
      </Grid>
    </>
  )
}

export default Layout