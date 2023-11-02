import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import {Box, Typography, CardMedia} from '@mui/material';

export default function Error() {
  // const [testData, setTestData] =useState([]);
  // useEffect(()=>{
  //   axios.get('http://localhost:4000/products/xyz/hi')
  //   .then(response=>{
  //     console.log('Connected');
  //     console.log(typeof(response.data));
  //     setTestData(response.data.products);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, []);
  return (
    // <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', 
    //   height:'100vh'}}>
      /* <Box>
        <Typography variant="h2" align="center" className='error' sx={{height: '20vh', width: '80vw'}}>
          404: Page Not Found
          { {testData.map(test=>`${test}, `)}}
        </Typography>
      </Box> */
      <div style={{background: 'linear-gradient(to top right, #ffe9cc, #dcffa4)'}}>
        <div className="background">
          <div className="foreground">
            <center>
              <h1 className="error"><span>404</span>: Page Not Found!!</h1>
              <CardMedia 
                component="img"
                sx={{width: '300px'}}
                image='/img/ErrorApple.png'
                alt="Error 404"
                title="Error 404"
              />
            </center>
          </div>
        </div>
      </div>
      /* <CardMedia 
        component="img"
        // image="https://i.imgur.com/qIufhof.png"
        sx={{width: '700px'}}
        image='/img/error.jpg'
        alt="Error 404"
        title="Error 404"
      // /> */
    // </Box>
  )
}
