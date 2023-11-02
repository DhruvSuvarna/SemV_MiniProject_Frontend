import React, {useState, useEffect} from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid} from '@mui/material';
import ProductCard from './ProductCard';

export default function Display() {

  const [productList, setProductList] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:8000/products')
    .then(response => response.json())
    .then(data => setProductList(data))
  }, [])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:'2vh', py: '5vh'}}>
      <Box sx={{mx: '7vh'}}>
        <Typography align='center' variant="h4" sx={{fontWeight: 'bold', mb: 2, overflowY: 'hidden'}}>
          Buying Categories
        </Typography>
        <Typography align='center' color='#6d6d6d' sx={{fontSize: '18px'}}>
          Here Farmers can Sell and customers can review or buy agriculture produce online
        </Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center', mx: '5vw'}}>
        <Grid container spacing={3} sx={{width: '100%', mt:'5vh'}}>
          {productList.map((product, index)=>{
              return(
                <Grid item sm={12} md={6} lg={4} xl={3} key={index} sx={{p:'0.5vh', display:'flex', 
                justifyContent: 'center', alignItems: 'center'}}>
                  <ProductCard product={product}/>
                </Grid>
              )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

const products = [
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 5
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 3
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 4
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 3
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 5
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 4
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 3
  },
  {
    img: './img/product.jpeg',
    title: 'Vegetables',
    stars: 5
  }
]