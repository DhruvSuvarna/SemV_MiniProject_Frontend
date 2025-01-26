import React from 'react';
import { useParams } from 'react-router-dom';
// import {Outlet} from 'react-router-dom';
import {Box } from '@mui/material';
import FarmerNav from '../components/FarmerNav';
import Footer from '../components/Footer';

export default function FarmerLayout() {
  const { farmerId } = useParams();
  return (
    <div>
      <FarmerNav/>
      <Box sx={{m: 10}}>
      <h1>Farmer Layout</h1>
      <p>FarmerId: {farmerId}</p>
      {/* <Outlet/> */}
      </Box>
      <Footer/>
    </div>
  )
}