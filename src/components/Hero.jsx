import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Box sx={{background: "radial-gradient(at top left, #4cd6aa, #c0e7db, #d3efe6)", width: '100%'
      /*position:'fixed'*/}}>
      <Box 
        sx={{height:'94vh', display: 'flex', pl: '6vw', m:0,
        flexDirection: 'column', gap: '2vh', justifyContent: 'center', alignContent: 'flexstart',
        backgroundImage: "url('./img/hero.png')", backgroundSize: 'cover', width: '100%'}}
        >
          <Box>
            <Typography variant="h5" fontSize={{xs:'20px', sm: '25px', md:'30px'}}>
              Cultivating Connections
            </Typography>
            <Typography variant="h2" fontSize={{xs:'40px', sm: '50px', md:'60px'}} sx={{overflowY:'hidden'}}>
              Harvesting Goodness
            </Typography>
          </Box>
          <Typography variant="h5" fontSize={{xs:'18px', sm: '25px', md:'30px'}}>
            Bridging Fields to Families
          </Typography>
          <Button variant="contained" sx={{bgcolor: '#ffffff00', color: '#212838', height: '7vh', px: '2vw',
          width: 'fit-content', '&: hover' : {bgcolor: '#45b45f'}, fontWeight: 'bold', overflowY: 'hidden'}}
          onClick={() => navigate('/product')}>
              Shop Now
          </Button>
      </Box>
    </Box>
  )
}
