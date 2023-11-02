import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
//layouts
import RootLayout from './layouts/RootLayout';
import ProductsLayout from './layouts/ProductsLayout';
import CheckoutLayout from './layouts/CheckoutLayout';
import UserMegaLayout from './layouts/UserMegaLayout';
import UserLayout from './layouts/UserLayout';
import AdminMegaLayout from './layouts/AdminMegaLayout';
import AdminLayout from './layouts/AdminLayout';
import FarmerMegaLayout from './layouts/FarmerMegaLayout';
import FarmerLayout from './layouts/FarmerLayout';
//Pages
import Home from './pages/Home';
import ProductsDisplay from './pages/ProductsDisplay';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Error from './pages/Error';
import ProductInfo from './pages/ProductInfo';
import Checkout from './pages/Checkout';

const categories = [
  "vegetables",
  "fruits",
  "grains",
  "dairy",
  "staples",
  "exoticvegetables",
  "salads",
  "momskitchen",
  "dryfruits",
  "freshbakery",
  "premiumfruits"
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>} />
      <Route path='product/' element={<ProductsLayout/>}>
        <Route index element={<ProductsDisplay category='all' />}/>
        <Route path='fruits' element={<ProductsDisplay category='fruits' />}/>
        <Route path='vegetables' element={<ProductsDisplay category='vegetables' />}/>
        <Route path='grains' element={<ProductsDisplay category='grains' />}/>
        <Route path='dairy' element={<ProductsDisplay category='dairy' />}/>
        <Route path='staples' element={<ProductsDisplay category='staples' />}/>
        <Route path='exoticvegetables' element={<ProductsDisplay category='exoticvegetables' />}/>
        <Route path='salads' element={<ProductsDisplay category='salads' />}/>
        <Route path='momskitchen' element={<ProductsDisplay category='momskitchen' />}/>
        <Route path='dryfruits' element={<ProductsDisplay category='dryfruits' />}/>
        <Route path='freshbakery' element={<ProductsDisplay category='freshbakery' />}/>
        <Route path='premiumfruits' element={<ProductsDisplay category='premiumfruits' />}/>
        <Route path=':category/:productId' element={<ProductInfo categories={categories}/>}/>
      </Route>
      <Route path='login' element={<Login/>} />
      <Route path='checkout' element={<CheckoutLayout/>}>
        <Route index element={<Checkout/>}/>
      </Route>
      <Route path='user' element={<UserMegaLayout/>}>
        <Route index element={<Error/>}/>
        <Route path=':userId' element={<UserLayout/>}/>
      </Route>
      <Route path='admin' element={<AdminMegaLayout/>}>
        <Route index element={<Error/>}/>
        <Route path=':adminId' element={<AdminLayout/>}/>
      </Route>
      <Route path='farmer' element={<FarmerMegaLayout/>}>
        <Route index element={<Error/>}/>
        <Route path=':farmerId' element={<FarmerLayout/>}/>
        <Route path='blog' element={<Blog/>} />
      </Route>
      <Route path='*' element={<Error/>}/>
    </Route>
  )
)

export default function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}