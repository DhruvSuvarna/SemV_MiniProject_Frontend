import React from 'react'
import { Box, Typography, Button, Container, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <Box className="footer-background" sx={{background: "radial-gradient(at top left, #208939, #45b45f)",
       height: '58vh', clipPath: 'ellipse(75% 100% at 50% 100%)'}}>
        <Container className="footer-container" sx={{pt: '7vh'}}>
          <Box className="footer-grid">
            <Box className="footer-grid-child-1">
              <CardMedia className="footer-logo" component="img" image="/img/Logo.png" alt="Logo"/>
            </Box>
            <Box className="footer-grid-child-2">
              <Typography className="footer-text" color="#fff" sx={{mb:2, fontWeight: 'bold'}}>Menu</Typography>
              {menuItems.map((menuItem, index)=>{
                return(
                  <Typography key={index} className="footer-text" color="#fff" 
                    onClick={()=>{navigate(menuItem.path)}} 
                    sx={{cursor: 'pointer', mb:1}}>
                    {menuItem.name}
                  </Typography> 
                )
              })}
            </Box>
            <Box className="footer-grid-child-3">
              <Typography className="footer-text" color="#fff" sx={{mb:2, fontWeight: 'bold'}}>
                Contacts
              </Typography>
              <Typography className="footer-text" color="#fff" sx={{fontWeight: 'bold'}}>
                AgriGo Corporate Office
              </Typography>
              <Typography className="footer-text" color="#fff" component="div" 
                sx={{display: 'flex', flexDirection: 'column', 
                justifyContent: 'center', alignContent: 'center', gap: '0.5vh'}} fontSize={{xs:'0.9rem'}}>
                  Plot no. C-10, TTC Industrial Estate,<br/>
                  MIDC, Pawne, Koperkhairne, Navi Mumbai,<br/>
                  Maharashtra - 400705<br/>

                  1800 267 0997<br/>
                  customercare@agrigo.in
              </Typography>
            </Box>
            <Box className="footer-grid-child-4">
                <img className="footer-img" src="/img/footer/img4.png" alt="footer-img" style={{height: '100%',
                mb: '0 !important', pb: '0 !important'}}/>
            </Box>
            <Box className="footer-grid-child-5">
              <Typography className="footer-text" color="#fff" sx={{fontWeight: 'bold', ml:'1vw'}}>
                Follow Us
              </Typography>
              <Box sx={{/*bgcolor: '#04321f'*/background: "radial-gradient(at top left, #18672b, #3e9753)",
              borderRadius: '4vh', width: 'fit-content', px:'2vh', py:'1vh'}}>
                <FacebookIcon className="footer-icon" fontSize='large' sx={{color:"#0080ff"}}/>
                <TwitterIcon className="footer-icon" fontSize='large' sx={{color:"#00ddff"}}/>
                <InstagramIcon className="footer-icon" fontSize='large' sx={{color:"#ff0095"}}/>
              </Box>
            </Box>
            <Box className="footer-grid-child-6" align="right">
              <Typography className="footer-text" color="#fff" sx={{width: 'fit-content'}} align="center">
                © 2023, AgriGo | Privacy Policy | Sitemap | Terms & Conditions
              </Typography>
            </Box>
          </Box>
        </Container>
    </Box>
  )
}

const menuItems = [
  {
      name: 'Home',
      path: '/'
  },{
      name: 'Shop',
      path: '/shop'
  },{
    name: 'About Us',
    path: '/about'
  },{
      name: 'Contact Us',
      path: '/contact'
  },{
      name: 'Blog',
      path: '/blog'
  }
];
