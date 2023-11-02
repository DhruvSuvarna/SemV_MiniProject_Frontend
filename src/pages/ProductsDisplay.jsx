import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ProductCard from '../components/ProductCard';

export default function ShopDisplay(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', mx: '5vw', my:'5vh', py: '5vh'}}>
        <Grid container spacing={1}>
            <Grid item sm={12} md={3}>
                <Stack sx={{borderRadius: '1vh', borderTopLeftRadius: '5vh', borderTopRightRadius: 0,
                 border: '1px solid #45b45f', borderBottom: 'none'}}>
                    {categories.map((category, index)=>{
                        return(
                        <Button variant="outlined" sx={{height:'fit-content', py:'2vh', fontSize: '2.3vh',
                        borderRadius: '0 !important', border:'none', borderBottom: '1px solid #45b45f',
                        '&:hover':{border:'none', borderBottom: '1px solid #45b45f'}, 
                        bgcolor: category.path === location.pathname? '#b8ecc4': 'none',
                        color: '#165327'
                        }}
                        key={index}
                        onClick={()=>{navigate(category.path)}}
                        >
                            {category.name}
                        </Button>
                        )
                    })}
                </Stack>
            </Grid>
            <Grid item sm={12} md={9} sx={{display: 'flex', flexDirection: 'column', gap:'2vh'}}>
                <CardMedia
                    component="img"
                    image={props.category!=='all'?`/img/products/categories/${props.category}.png`:'/img/product.jpeg'}
                    sx={{borderRadius: '1vh', borderTopRightRadius: '5vh', borderTopLeftRadius: 0, width: '100%'}}
                />
                <Grid container spacing={3} sx={{width: '100%', ml:'-10px !important'}}>
                    {products.map((product, index)=>{
                        if(props.category === 'all'){
                            return(
                                <Grid item sm={12} md={6} lg={4} key={index} sx={{pb:'0.5vh', pr: '0.5vh'}}>
                                <ProductCard product={product}/>
                                </Grid>
                            )
                        } else {
                            if(product.category === props.category){
                                return(
                                    <Grid item sm={12} md={6} lg={4} key={index} sx={{pb:'0.5vh', pr: '0.5vh'}}>
                                    <ProductCard product={product}/>
                                    </Grid>
                                )
                            }
                        }
                    })}
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

const categories = [
    {
        name: 'Vegetables',
        path: '/product/vegetables'
    },{
        name: 'Fruits',
        path: '/product/fruits'
    },{
        name: 'Grains',
        path: '/product/grains'
    },{
        name: 'Dairy',
        path: '/product/dairy'
    },{
        name: 'Village Staples',
        path: '/product/staples'
    },{
        name: 'Exotic Vegetables',
        path: '/product/exoticvegetables'
    },{
        name: 'Salad Meals and Pan Ready Mix',
        path: '/product/salads'
    },{
        name: 'Moms Kitchen',
        path: '/product/momskitchen'
    },{
        name: 'Dry Fruits',
        path: '/product/dryfruits'
    },{
        name: 'Fresh Bakery',
        path: '/product/freshbakery'
    },{
        name: 'Premium Fruits',
        path: '/product/premiumfruits'
    }
]

const products = [
  {
    "id": 6,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 7,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 8,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 9,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 10,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  },
  {
    "id": 11,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 12,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 13,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 14,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 15,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  },
  {
    "id": 16,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 17,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 18,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 19,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 20,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  },
  {
    "id": 21,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 22,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 23,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 24,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 25,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  },
  {
    "id": 26,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 27,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 28,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 29,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 30,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  },
  {
    "id": 31,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 32,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 33,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 34,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 35,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  },
  {
    "id": 36,
    "name": "Product 1",
    "image": "/img/product.jpeg",
    "category": "vegetables",
    "price": 100,
    "rating": 3,
    "description": "This is product 1"
  },
  {
      "id": 37,
      "name": "Product 2",
      "image": "/img/products/mango.jpg",
      "category": "fruits",
      "price": 200,
      "rating": 5,
      "description": "This is product 2"
  },
  {
      "id": 38,
      "name": "Product 3",
      "image": "/img/products/papaya.jpg",
      "category": "dairy",
      "price": 300,
      "rating": 4,
      "description": "This is product 3"
  },
  {
      "id": 39,
      "name": "Product 4",
      "image": "/img/products/orange.jpg",
      "category": "salads",
      "price": 400,
      "rating": 3,
      "description": "This is product 4"
  },
  {
      "id": 40,
      "name": "Product 5",
      "image": "/img/products/strawberry.jpg",
      "category": "momskitchen",
      "price": 500,
      "rating": 5,
      "description": "This is product 5"
  }
]