import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = Yup.object({
  username: Yup.string().min(4).max(25).required("Please enter your username"),
  firstname: Yup.string().min(2).max(25).required("Please enter your first name"),
  lastname: Yup.string().min(2).max(25).required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string().required("required").oneOf([Yup.ref('password'), null], "Password must match"),
  phone: Yup.string().min(8).matches(phoneRegExp, 'Phone number is not valid').required("Please enter your phone number"),
  location: Yup.string().min(2).max(25).required("Please enter your location")
});

export const signInSchema = Yup.object({
  username: Yup.string().min(4).max(25).required("Please enter your username"),
  password: Yup.string().min(6).required("Please enter your password")
});