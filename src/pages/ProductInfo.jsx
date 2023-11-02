import React, {useState, useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, CardMedia, Grid, Typography, Button} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material';

export default function ProductInfo(props) {

  const { category, productId } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setProduct] = useState({});
  useEffect(()=>{
    window.scroll(0,0);
    axios.get('http://localhost:8000/products')
    .then(response => {
      if(Number(productId)<1 || Number(productId)>(response.data.length)){navigate('/error');}
      response.data.forEach(p=>{
        if(p.id == productId){
          if(p.category !== category){
            navigate('/error');
          }
          else{setProduct(p);}
        }
      })
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      navigate('/error');
    });

  }, [])

  const defaultTheme = createTheme({
    palette:{
      secondary:{
        main: '#45b45f'
      }
    }
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{mt:'10vh'}}>
        <Grid container spacing={10}>
          <Grid item md={5}>
            <CardMedia 
            component="img" 
            sx={{width: '25vw', height: '50vh', borderRadius: '2.5vh'}}
            image={selectedProduct.image} 
            alt={selectedProduct.name} 
            title={selectedProduct.name}
            />
          </Grid>
          <Grid item md={7}>
            <Typography component="h1" fontSize={{md:'2rem'}}>{selectedProduct.name}</Typography>
            <Typography component="h2" fontSize={{md:'4rem'}} color='secondary'>
              ₹{selectedProduct.price}
            </Typography>
            {selectedProduct.description && <Typography component="h3" fontSize={{md:'2rem'}}>
              About Product
            </Typography>}
            <Typography component='p' noWrap>
              {selectedProduct.description}
            </Typography>
            {/* {(selectedProduct.description) && <Button>Read More</Button>} */}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}