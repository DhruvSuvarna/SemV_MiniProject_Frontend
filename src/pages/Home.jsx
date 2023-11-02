import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Display from '../components/Display';
import ReviewDisplay from '../components/ReviewDisplay';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Box sx={{mt: '6vh'}}>
      <Hero />
        <Features/>
        <Display/>
        <ReviewDisplay/>
        <Footer/>
      </Box>
    </div>
  )
}
