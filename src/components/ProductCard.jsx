import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button, ButtonGroup } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {createTheme, ThemeProvider} from '@mui/material';
import { FlashOnRounded } from '@mui/icons-material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#45b45f',
    },
    secondary: {
      main: '#ffec1e',
    },
    tertiary: {
      main: '#0d5b2b',
    },
    quaternary: {
      main: '#ff2d2d',
    },
    pentenary: {
      main: '#0073ff',
    }
  }
});

export default function ProductCard(props) {

  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:8000/cart')
    .then(response=>{
      response.data.map(item=>{
        if (item.id === props.product.id){
          setIsAdded(true);
          setQuantity(item.quantity);
        }
      })
     })
    .catch(err=>console.log(err))
  }, [])

  function AddToCart(product) {
    let cart = []
    fetch('http://localhost:8000/cart', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          price: product.price,
          totalprice: product.price,
          rating: product.rating,
          quantity: 1})
      })
    .then((response)=>console.log(response))
    .catch(err=>console.log(err));
    setQuantity(quantity+1);
    setIsAdded(true);
    window.location.reload();
  }

  function handleRemove(id) {
    axios.delete(`http://localhost:8000/cart/${id}`)
    .then(response => {
      console.log(response.data);
      setIsAdded(false);
      window.location.reload();
    })
    .catch(err=>console.log(err));
  }

  function handleSubtract(id){
    let q = quantity, p=props.product.price;
    axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity: q-1,
      totalprice: p*(q-1)
    })
    .then((response) => {
      console.log(response.data);
      if(response.data.quantity === 0){
        handleRemove(id);
        window.location.reload();
      } else {
        setQuantity(response.data.quantity);
        window.location.reload();
      }
    })
    .catch(err=>console.log(err));
  }
  function handleAdd(id){
    let q = quantity, p=props.product.price;
    axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity: q+1,
      totalprice: p*(q+1)
    })
    .then(response => {
      console.log(response.data);
      setQuantity(response.data.quantity);
    })
    .catch(err=>console.log(err));
  }

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Card
        sx={{maxWidth: '300px', 
          '&:hover': {boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.425)'},
          padding: '2vh', borderRadius: '2vh'
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={props.product.image}
          alt={props.product.name}
          title={props.product.name}
          sx={{borderRadius: '2vh'}}
          onClick={()=>navigate(`/product/${props.product.category}/${props.product.id}`)}
        />
        <CardContent sx={{display: 'flex',pb: '0 !important'}} >
            <Typography component='div' sx={{fontSize: '2.5vh', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1vh'}}>
              {props.product.name}
              <Box>
                ₹{props.product.price}/kg
              </Box>
            </Typography>
            {!isAdded && <Button onClick={()=>AddToCart(props.product)}><Avatar sx={{bgcolor: '#afe1c8'}} >
              <ShoppingCartIcon sx={{color: '#092516'}}/>
            </Avatar></Button>}
            {isAdded && <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{height: '50%'}}>
                        <Button size="small" onClick={()=>handleSubtract(props.product.id)}>-</Button>
                        <Box sx={{px: 2, py: 0.5}}>{quantity}</Box>
                        <Button size="small" onClick={()=>handleAdd(props.product.id)}>+</Button>
            </ButtonGroup>}
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
