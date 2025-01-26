import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { AppBar, Toolbar, Box, Typography, Avatar, createTheme, ThemeProvider} from '@mui/material';
import {List, ListItemButton, ListItemText, MenuItem} from '@mui/material';
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

  const LogoutMenuItem = styled(MenuItem)(({ theme })=>({
    color: theme.palette.quaternary.main
  })
  );

export default function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();

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
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  )
}
