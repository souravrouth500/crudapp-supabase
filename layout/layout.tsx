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
      <Grid container maxWidth={'xl'} mx={'auto'}>
        <Grid item xs={12} sm={3} px={1} sx={{ pt: '80px' }}>
          {/* <CustomizedAccordions data={['User']} /> */}
          <CustomizedAccordions data={[{ 'parent': 'User', 'child': ['profile', 'list', 'add',] },]} />
        </Grid>
        <Grid item xs={12} sm={9} px={1}>
          {children}
        </Grid>
      </Grid>
    </>
  )
}

export default Layout