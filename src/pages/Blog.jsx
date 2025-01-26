import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Box, Grid, Paper, Typography, Link, CardMedia } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import FarmerNav from '../components/FarmerNav';
import Footer from '../components/Footer';

export default function Blog() {
  const [blogList, setBlogList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/farmingArticles')
    .then(response => {
      setBlogList(response.data);
    })
  }, [])
  return (
    <div>
      <FarmerNav/>
      <Box sx={{m: 10, overflow: 'visible !important'}}>
      <Typography variant="h4" align="center">Blog: Farming Mechanisms</Typography>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{mt: 5}}>
        {blogList.map((item, index) => (
            <Paper key={index} elevation={3} 
            sx={{ padding: '16px', textAlign: 'left', '&: hover': {
              boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.425)'
            } }} 
            onClick={()=>{window.location.href=item.ArticleLink}}>
              <CardMedia 
                component="img" 
                image={item.ImageURL} 
                alt={item.AltText} 
                style={{ maxWidth: '100%' }} 
              />
              <Typography variant="h6">
                {item.ArticleTitle}
              </Typography>
            </Paper>
        ))}
      </Masonry>
      </Box>
      <Footer/>
    </div>
  )
}
