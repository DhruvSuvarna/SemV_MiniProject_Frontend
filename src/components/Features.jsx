import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent} from '@mui/material';

export default function Features() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:'7vh', py: '5vh'}}>
      <Box sx={{mx: '7vh'}}>
        <Typography align='center' variant="h4" sx={{fontWeight: 'bold', mb: 2, overflowY: 'hidden'}}>
          AgriGo
        </Typography>
        <Typography align='center' color='#6d6d6d' sx={{display: 'flex', fontSize: '18px', px:'5vw'}} variant="p">
          At Agrigo, we take pride in connecting farmers directly to customers, fostering a vibrant online 
          marketplace where fresh and locally grown products are just a click away. Our platform serves as 
          a bridge between hardworking farmers and discerning customers who value quality, sustainability, 
          and supporting local communities.
        </Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap:'1vh'}}>
        {featureItems.map((featureItem, index)=>{
          return(
            <Card key={index} sx={{maxWidth: '180px', padding: '2vh',
            '&:hover': {border: '1px solid #6ad1ad', boxShadow: '10px 10px 54px rgba(0, 0, 0, 0.1)'}}}>
              <CardMedia
                component="img"
                height="100"
                image={featureItem.img}
                title={featureItem.title}
              />
              <CardContent align="center" sx={{pb:'0 !important'}} >
                  <Typography sx={{bgcolor: featureItem.highlight, width:'fit-content', 
                  p: '0.7vh',fontSize: '2vh', borderRadius: '0.7vh', m:0}}>
                    {featureItem.title}
                  </Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}

const featureItems = [
  {
    img: './img/features/f1.png',
    title: 'Free Shipping',
    highlight: '#5ce0d9'
  },
  {
    img: './img/features/f2.png',
    title: 'Cost Effective',
    highlight: '#f8a4d7'
  },
  {
    img: './img/features/f3.png',
    title: 'Promotion',
    highlight: '#9cd8a9'
  },
  {
    img: './img/features/f4.png',
    title: '24/7 support',
    highlight: '#5cbde0'
  },
  {
    img: './img/features/f5.png',
    title: 'On time',
    highlight: '#ca85e8'
  }
]