import React, {useState} from 'react';
import { Box, Container, Tabs, Tab, Grid, Paper, Link} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: '#45b45f',
    },
  },
})

export default function Login() {

  const [value, setValue] = React.useState('signup');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("./img/Login/background.png")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square 
          sx={{backgroundImage: 'url("https://transparenttextures.com/patterns/cubes.png")'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{width: 'fit-content'}}
              >
                <Tab value="signup" label="Signup" icon={<AppRegistrationIcon/>} sx={{width: '15vw'}} />
                <Tab value="signin" label="Signin" icon={<LockOpenIcon/>} sx={{width: '15vw'}} />
            </Tabs>
            {value==='signup'?<SignUp/>: <SignIn/>}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}