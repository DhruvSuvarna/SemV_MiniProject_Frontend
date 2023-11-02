import React from 'react';
import { Box, TextField, Button, FormControl } from '@mui/material';
import { Form, useFormik } from 'formik';
import { signInSchema } from '../schemas';

export default function SignIn() {
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  const formElements = [
    {
      label: 'username',
      name: 'username',
      value: values.username,
      type: 'text'
    },
    {
      label: 'password',
      name: 'password',
      values: values.password,
      type: 'password'
    }
  ]

  return (
    <Box component='form' align='center' sx={{ mt: 1 }} noValidate onSubmit={e=>e.preventDefault()}>
      {formElements.map((element, index) => {
          return (
          <FormControl fullWidth key={index}>
            <TextField
              key={index}
              name={element.name}
              label={element.label}
              type={element.type}
              value={element.value}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              fullWidth
              color='secondary'
              autoFocus={element.label === 'username/email'? true: false}
              sx={{my: '1vh'}}
            />
            {errors[element.name] && touched[element.name] ? (
              <div style={{color: 'red'}}>{errors[element.name]}</div>
            ) : null}
          </FormControl>
          )
        })
      }
      <Button variant="contained" color="secondary" onClick={handleSubmit} 
        sx={{color: '#fff', width: 'fit-content', px:'3vw'}}>
        Signin
      </Button>
    </Box>
  )
}
