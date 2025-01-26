import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {List, ListItemButton, ListItem, ListItemIcon, ListItemText, Button, ButtonGroup } from '@mui/material';
import { Drawer, Divider, Box, Avatar, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItem, addItem, subtractItem } from '../redux/reducers/cart/cartSlice';

export default function Cart(props) {
  const cartItems = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Drawer
      anchor={props.anchor}
      open={props.cartState}
      sx={{position: 'relative'}}
    >
      <Box
      sx={{ width: 400}}
      role="presentation"
      >
        <Box align='right' sx={{pr: '2vh', pt: '1vh', pb: 1 }}>
          <Box
            onClick={()=>props.toggleDrawer(false)} 
            sx={{borderRadius: '50%', bgcolor: '#45b45f', width: 'fit-content', pt:'0.5vh', px:'0.7vh',
              '&:hover':{boxShadow: '1px 1px 5px #00000065', bgcolor: '#3c9b52'}}}>
              <CloseIcon sx={{color: '#fff'}} fontSize="large"/>
          </Box>
          {cartItems.length!==0? <Button color="quaternary" sx={{mt:1}}
            onClick={()=>dispatch(clearCart())}>
              Clear Cart
          </Button>:null}
        </Box>

        {cartItems.length == 0 && 
        <Box sx={{height: '70vh', display: 'flex', flexDirection:'column',
          justifyContent: 'center', alignItems: 'center'}}>
          <Avatar sx={{bgcolor:'#ffffff', border: '4px solid red'}}>
            <RemoveShoppingCartIcon color="primary" fontSize="large"/>
          </Avatar>
          <Typography variant="h6">No Items added in Cart</Typography>
        </Box>
        }

        {cartItems.length != 0 && 
        <Box sx={{px: 3, pt: 1}}>
          <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 500,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
          >
            {cartItems.map((item, index) => (
                <ListItem key={index}>
                  <Box sx={{display: 'flex', gap:'3vh'}}>
                    <img src={item.image} alt={item.name} style={{borderRadius: '2vh'}} 
                      height="120px" width="120px"/>
                    <div style={{display: "inline"}}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body1">₹{item.totalprice}</Typography>
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button size="small" onClick={()=>dispatch(subtractItem(item.id))}>-</Button>
                        <Box sx={{px: 2, py: 0.5}}>{item.quantity}</Box>
                        <Button size="small" onClick={()=>dispatch(addItem(item.id))}>+</Button>
                      </ButtonGroup>
                      <Button  color="quaternary" sx={{display: 'block'}}
                        onClick={()=>dispatch(removeItem(item.id))}
                      >
                        Remove
                      </Button>
                    </div>
                  </Box>
                </ListItem>
              )
            )}
          </List>
        </Box>
        }

        {cartItems.length != 0 && 
        <Box sx={{position: 'absolute', bottom: 0, left:0, width: '100%', mb:1, py:1.5, pl:1.5, bgcolor:'#45b45f'}}>
          <Button color="secondary" variant="contained" onClick={()=>navigate('/checkout')} 
            sx={{borderRadius:'3vh', fontSize: "1.2rem", px:'3vh', color: '#0d5b2b'}}>
            Checkout
          </Button>
        </Box>
        }
      </Box>
    </Drawer>
  )
}
