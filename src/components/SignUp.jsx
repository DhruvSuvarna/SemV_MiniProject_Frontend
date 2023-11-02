import React, {useEffect, useState} from 'react'
import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Form, useFormik } from 'formik';
import { signUpSchema } from '../schemas';

const initialValues ={
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  location: ''
};

export default function () {

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  // console.log(errors);

  const [cityList, setCities] = useState([]);

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

  const formInputElements = [
    {
      label: 'username',
      name: 'username',
      type: 'text',
      value: values.username
    },{
      label: 'firstname',
      name: 'firstname',
      type: 'text',
      value: values.firstname
    },{
      label: 'lastname',
      name: 'lastname',
      type: 'text',
      value: values.lastname
    },{
      label: 'email',
      name: 'email',
      type: 'email',
      value: values.email
    },{
      label: 'password',
      name: 'password',
      type: 'password',
      value: values.password
    },{
      label: 'confirm Password',
      name: 'confirmPassword',
      type: 'password',
      value: values.confirmPassword
    },{
      label: 'phone',
      name: 'phone',
      type: 'tel',
      value: values.phone
    }
  ]

  return (
    <Box component='form' align='center' sx={{ mt: 1 }} noValidate onSubmit={e=>e.preventDefault()}>
      {formInputElements.map((element, index) => {
          return (
            <FormControl fullWidth key={index}>
              <TextField
              name={element.name}
              label={element.label}
              type={element.type}
              value={element.value}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
              color='secondary'
              autoFocus={element.label === 'username'? true: false}
              sx={{my: '1vh'}}
              />
              {errors[element.name] && touched[element.name] ? 
                <Typography sx={{color: '#bd0000'}}>{errors[element.name]}</Typography> : 
                null}
            </FormControl>
          )
        })
      }
      {/* City */}
      <FormControl sx={{my: '1vh'}} fullWidth>
        <InputLabel id="LocationLabel">Location</InputLabel>
          <Select
            labelId="LocationLabel"
            id="location"
            name="location"
            label="Location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            color='secondary'
            fullWidth
            // onChange={element.func}
          >
            <MenuItem value=''>Select Location</MenuItem>
            {cityList.map((city, index)=>{
              return <MenuItem key={index} value={city.name}>{city.name}</MenuItem>
            })}
        </Select>
        {errors.location && touched.location ? 
        <Typography sx={{color: '#bd0000'}}>{errors.location}</Typography> : null}
      </FormControl>

      <Button variant="contained" color="secondary" 
        onClick={handleSubmit}
       sx={{color: '#fff', width: 'fit-content', px:'3vw'}}>
        Signup
      </Button>
    </Box>
  )
}