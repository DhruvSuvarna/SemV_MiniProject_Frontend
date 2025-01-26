import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button, ButtonGroup } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {createTheme, ThemeProvider} from '@mui/material';
import { FlashOnRounded } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { pushItem, addItem, subtractItem } from '../redux/reducers/cart/cartSlice';
import { use } from 'react';

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
  const cartItems = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    setIsAdded(() => {
      return cartItems.some(item => item.id === props.product.id);
    })
    setQuantity(() => {
      return cartItems.filter(item => item.id === props.product.id).map(item => item.quantity)[0]
    })
  }, [cartItems])

  const AddToCart = (product) => {
    product = {...product, quantity: 1, totalprice: product.price};
    console.log(product);
    dispatch(pushItem(product));
    setIsAdded(true);
  }

  const handleAdd = (id) => {
    dispatch(addItem(id));
  }

  const handleSubtract = (id) => {
    dispatch(subtractItem(id));
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Card
        sx={{maxWidth: '300px', minWidth: '285px',
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
