import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {List, ListItemButton, ListItem, ListItemIcon, ListItemText, Button, ButtonGroup } from '@mui/material';
import { Drawer, Divider, Box, Avatar, Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function Cart(props) {
  const navigate = useNavigate();
  const [itemsPresent, setItemsPresent] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // const [quantity, setQuantity] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/cart')
    .then((response) => {
      setCartItems(response.data)
    })
    .catch(err=>console.log(err));
  }, []);

  useEffect(()=>{
    if(cartItems.length!==0){
      setItemsPresent(true);
    } else {
      setItemsPresent(false);
    }
  }, [cartItems])

  function ClearCart() {
    cartItems.forEach((item)=>{
      axios.delete(`http://localhost:8000/cart/${item.id}`)
      .then(response=>console.log(response.data))
      .catch(err=>console.log(err));
    }
    )
    setItemsPresent(false);
    window.location.reload();
  }

  function handleRemove(id) {
    axios.delete(`http://localhost:8000/cart/${id}`)
    .then(response => {
      console.log(response.data);
      setCartItems(prev=>{
        let temp = [...prev];
        temp = temp.filter(t=>t.id!==id)
        return temp;
      });
      window.location.reload();
    })
    .catch(err=>console.log(err));
  }
  function handleSubtract(id){
    let q, p;
    cartItems.forEach(item=>{
      if (item.id===id){
        q = item.quantity;
        p = item.price;
      }
    })
    axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity: q-1,
      totalprice: p*(q-1)
    })
    .then((response) => {
      console.log(response.data);
      if(response.data.quantity === 0){
        handleRemove(id);
      }
      setCartItems(prev=>{
        let temp = [...prev];
        temp = temp.map(t=>{
          if(t.id===id){
            return response.data
          } else {
            return t;
          }
        })
        return temp;
      });
      window.location.reload();
    })
    .catch(err=>console.log(err));
  }
  function handleAdd(id){
    let q,p;
    cartItems.forEach(item=>{
      if (item.id===id){
        q = item.quantity;
        p = item.price;
      }
    })
    axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity: q+1,
      totalprice: p*(q+1)
    })
    .then(response => {
      console.log(response.data)
      setCartItems(prev=>{
        let temp = [...prev];
        temp = temp.map(t=>{
          if(t.id===id){
            return response.data
          } else {
            return t;
          }
        })
        return temp;
      });
      window.location.reload();
    })
    .catch(err=>console.log(err));
  }

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
            onClick={()=>ClearCart()}>
              Clear Cart
          </Button>:null}
        </Box>

        {!itemsPresent && 
        <Box sx={{height: '70vh', display: 'flex', flexDirection:'column',
          justifyContent: 'center', alignItems: 'center'}}>
          <Avatar sx={{bgcolor:'#ffffff', border: '4px solid red'}}>
            <RemoveShoppingCartIcon color="primary" fontSize="large"/>
          </Avatar>
          <Typography variant="h6">No Items added in Cart</Typography>
        </Box>
        }

        {itemsPresent && 
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
                        <Button size="small" onClick={()=>handleSubtract(item.id)}>-</Button>
                        <Box sx={{px: 2, py: 0.5}}>{item.quantity}</Box>
                        <Button size="small" onClick={()=>handleAdd(item.id)}>+</Button>
                      </ButtonGroup>
                      <Button  color="quaternary" sx={{display: 'block'}}
                        onClick={()=>handleRemove(item.id)}
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

        {itemsPresent && 
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
