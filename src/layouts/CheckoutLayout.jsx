import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductsLayout() {

  useEffect(()=>{
    window.scroll(0,0);
  }, []);
  
  return (
    <div>
      <Navbar/>
      <Box sx={{mt: '6vh'}}>
        <Outlet/>
        <Footer/>
      </Box>
    </div>
  )
}