import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Box, Typography, Avatar, createTheme, ThemeProvider, InputBase} from '@mui/material';
import {List, ListItemButton, ListItemText, Button, FormControl, Badge, Select, MenuItem} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SearchBar from './SearchBar';
import Cart from './Cart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useSelector } from 'react-redux';

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
    },
    typography: {
        button: {
          textTransform: "none"
        }
    }
  });

  const CustomBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.pentenary.main,
    },
  }));  

  const LogoutMenuItem = styled(MenuItem)(({ theme })=>({
    color: theme.palette.quaternary.main
  })
  );

  const StyledSelect = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#ffffff2c',
      color: '#347f46',
      fontSize: 16,
      padding: '8px 26px 8px 12px',
      '&:hover': {
        backgroundColor: '#ffffff44'
      },
      overflowX: 'hidden'
    },
  }));

  const StyledSelect2 = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
    //   backgroundColor: '#ffffff2c',
      fontSize: 16,
      padding: '8px 24px 8px 12px !important',
      '&:hover': {
        backgroundColor: '#ffffff44'
      },
    },
  }));

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cityList, setCities] = useState([]);
  const [city, setCity] = useState('Location');
  const [loggedIn, setLoggedIn] = useState(false);
  const cartLength = useSelector(state=>state.cart.length);

  useEffect(()=>{
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "WExOZ3ZyQ1VPNHlqMkNOeDFDUGhuN3Z2QmVUbDFFREMxZHNtMmRIWg==");
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };

    fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
    .then(response => response.json())
    .then(result =>{
      setCities(result);
    })
    .catch(error => console.log('error', error));

  }, [])

  const anchor = 'right';
  const [cartState, setCartState] = useState(false);
  const navItems = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Products',
        path: '/product'
    }
  ];

  function toggleDrawer(open){
    setCartState(open);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
        <AppBar sx={{background: "radial-gradient(at top left, #208939, #45b45f)", width: '100%',
            p:'0 !important'}}>
            <Toolbar>
                <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                    <Avatar sx={{bgcolor: 'transparent', width: 56, height: 50}}><img src="/img/Logo.png" alt="Logo" height='45'/></Avatar>
                    <Typography sx={{ml: 1, color: '#1a231d',
                     fontWeight: 'bold', fontSize: '3vh'}}>
                        AgriGo
                    </Typography>
                </Box>
                <Box sx={{height:"5vh", width:"5vh", borderRadius:'50%', bgcolor: 'transparent'}}
                  onClick={()=>setLoggedIn(!loggedIn)}/>
                <List sx={{display: 'flex'}}>
                    {navItems.map((navItem, index)=>
                        <ListItemButton
                            key={index}
                            onClick={()=>{navigate(navItem.path)}}
                        >
                            <ListItemText 
                                primaryTypographyProps={{
                                    fontSize: '20px',  color: navItem.path === location.pathname? '#ffffff': '#170b20'
                                }} 
                                primary={navItem.name} 
                            />
                        </ListItemButton>
                    )}
                </List>
                <SearchBar/>
                <FormControl >
                    <Select
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        required
                        color='secondary'
                        input={<StyledSelect/>}
                        style={{width:'fit-content', marginLeft: '2vh', fontSize: '1rem'}}
                    >
                        <MenuItem value='Location'>Location</MenuItem>
                        {cityList.map((city, index)=>{
                        return <MenuItem key={index} value={city.name}>{city.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <CustomBadge badgeContent={cartLength}
                  sx={{overflow: 'visible', color: '#fff'}}>
                  <Button 
                      onClick={()=>toggleDrawer(true)} 
                      startIcon={<LocalMallIcon color="tertiary"/>}
                      color="secondary"
                      variant="contained"
                      sx={{ml: 2, fontSize: '1rem', fontWeight: 'bold', color: '#0d5b2b'}}
                  >
                      My Cart
                  </Button>
                </CustomBadge>
                <Cart anchor={anchor} cartState={cartState} toggleDrawer={toggleDrawer}/>
                {
                !loggedIn && 
                    <Button onClick={()=>navigate('/login')}>
                        <Avatar sx={{ml: '2vh', bgcolor: '#ffffff', color: '#45b45f', 
                        borderRadius:'1vh'}}/>
                    </Button>
                }
                {loggedIn && <Box sx={{display: 'flex'}}>
                    <Avatar sx={{ml: '2vh', bgcolor: '#ffffff', color: '#45b45f'}}/>
                    <Select
                        value={null}
                        required
                        color='secondary'
                        input={<StyledSelect2/>}
                        style={{width:'fit-content', fontSize: '1rem'}}
                    >
                        <MenuItem value='My Orders'>My Orders</MenuItem>
                        <MenuItem value='My Account'>My Profile</MenuItem>
                        <MenuItem value='Manage Addresses'>My Address</MenuItem>
                        <LogoutMenuItem value='Logout'>Logout</LogoutMenuItem>
                    </Select>
                </Box>}
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  )
}
