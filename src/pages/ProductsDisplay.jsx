import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Box, Typography, Button, Avatar, CardMedia, Grid} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ProductCard from '../components/ProductCard';
import MenuIcon from '@mui/icons-material/Menu';

export default function ShopDisplay(props) { 
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filterState, setFilterState] = useState(false)

  useEffect(()=>{
    if (props.category === 'all'){
    axios.get('http://localhost:8000/products')
    .then(response=>setProducts(response.data))
    .catch(err=>console.log(err));
    } else {
        axios.get(`http://localhost:8000/products?category=${props.category}`)
        .then(response=>setProducts(response.data))
        .catch(err=>console.log(err));
    }
  }, [location.pathname])
  
  return (
    <Box sx={{mx: '5vw', my:'5vh', py: '5vh'}}>
        {!filterState? 
            <div style={{display:'flex'}}>
                <Box onClick={()=>{setFilterState(!filterState)}} 
                    sx={{borderRadius: '1vh'}}
                >
                    <MenuIcon sx={{fontSize: '40px'}}/>
                </Box>
                <Typography variant="h6" sx={{ml: 2, color:'#004e70', pt:0.5}}>Filter</Typography>
            </div>:
            <div style={{display:'flex'}}>
                <Box onClick={()=>{setFilterState(!filterState)}}>
                    <MenuIcon sx={{fontSize: '40px'}}/>
                </Box>
                <Typography variant="h6" sx={{ml: 2, color:'#004e70', pt:0.5}}>Remove Filter</Typography>
            </div>
        }
        <Grid container spacing={1}>
            {filterState && <Grid item sm={12} md={3}>
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
                        onClick={()=>{navigate(category.path);}}
                        >
                            {category.name}
                        </Button>
                        )
                    })}
                </Stack>
            </Grid>}
            <Grid item sm={12} md={filterState?9:12} sx={{display: 'flex', flexDirection: 'column', gap:'2vh'}}>
                <CardMedia
                    component="img"
                    image={props.category!=='all'?`/img/products/categories/${props.category}.png`:'/img/product.jpeg'}
                    sx={{borderRadius: '1vh', borderTopRightRadius: '5vh', borderTopLeftRadius: filterState?0:'5vh', 
                    width: '100%'}}
                />
                <Grid container spacing={3} sx={{width: '100%', ml:'-10px !important'}}>
                    {products.map((product, index)=>{
                        return(
                            <Grid item xs={12} sm={filterState?12:6} md={filterState?6:4} 
                            lg={filterState?4:3} key={index} sx={{pb:'0.5vh', pr: '0.5vh'}}>
                            <ProductCard product={product}/>
                            </Grid>
                        )
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