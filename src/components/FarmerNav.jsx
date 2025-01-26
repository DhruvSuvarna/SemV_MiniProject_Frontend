import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { AppBar, Toolbar, Box, Typography, Avatar, createTheme, ThemeProvider} from '@mui/material';
import {List, ListItemButton, ListItemText, MenuItem, Select, InputBase} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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

  const StyledSelect2 = styled(InputBase)(() => ({
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

  const LogoutMenuItem = styled(MenuItem)(({ theme })=>({
    color: theme.palette.quaternary.main
  })
  );

export default function FarmerNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'My Profile',
      path: '/farmer/blog'
    },
    {
      name: 'My Products',
      path: '/farmer/blog'
    },
    {
      name: 'My Sales',
      path: '/farmer/blog'
    },
    {
      name: 'Earnings and Withdraw',
      path: '/farmer/blog'
    },
    {
        name: 'Blog',
        path: '/farmer/blog'
    }
  ];

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
                <Box sx={{display: 'flex'}}>
                    <Avatar sx={{ml: '2vh', bgcolor: '#ffffff', color: '#45b45f'}}/>
                    <Select
                        value=''
                        required
                        color='secondary'
                        input={<StyledSelect2/>}
                        style={{width:'fit-content', fontSize: '1rem'}}
                    >
                        <MenuItem value=''>username</MenuItem>
                        <LogoutMenuItem value='Logout'>Logout</LogoutMenuItem>
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  )
}
