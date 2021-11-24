import React, {useState}from 'react'
import {Box, FormControl, InputLabel, Select, MenuItem, Container, Typography, Button, Grid} from '@mui/material'

const product = {
        title: 'Orange Coat',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        categories: ["coat", "men"],
        size: ["S", "M", "L"],
        color: ["orange"],
        price: 30,
        inStock: true
}

const ProductDetailScreen = () => {
    const [size, setSize ] = useState('')

    return (
        <div className="product-detail-container">
            <Container>
            <Typography variant="h3" sx={{fontWeight: "light", mt: 4, mb:2, fontSize: 38}}>{product.title}</Typography>
                <Grid container spacing={{ xs: 2, md: 3}}>
                    <Grid item sx={{ width:'100%'}} xs={12} md={6}>
                        <img src={product.image} alt={product.title} /> 
                    </Grid>
                    <Grid item sx={{ width:'100%' }} xs={12} md={6}>
                        <Typography gutterbottom variant="h4" sx={{fontWeight: "light", my: 3}}>$ {product.price}</Typography>
                        <Typography gutterbottom variant="p" sx={{lineHeight: 1.5}}>{product.description}</Typography>
                        <Box sx={{display: 'flex', mt: 3, alignItems: 'center'}}>
                            <Box sx={{display: 'flex'}}>
                                <Typography variant="p" sx={{fontSize: 20, mr: 1}}>Color</Typography>
                                <div className="colors">
                                    {product.color.map( color => {
                                        return  <div className="color" style={{backgroundColor: `${color}`}}></div>
                                    })}
                                </div>
                            </Box> 
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth sx={{ml: 4}}>
                                <InputLabel id="size">Size</InputLabel>
                                <Select
                                    labelId="size"
                                    id="size-select"
                                    value={size}
                                    label="Size"
                                    onChange={(e) => {setSize(e.target.value)}}
                                >
                                    <MenuItem value={"S"}>Small</MenuItem>
                                    <MenuItem value={"M"}>Medium</MenuItem>
                                    <MenuItem value={"L"}>Large</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                        </Box>   
                        <div className="quantity-counter">
                            <button><i class="fas fa-minus"></i></button>
                            <span className="number">1</span>
                            <button><i class="fas fa-plus"></i></button>
                        </div>
                        <Button variant="contained" sx={{mt: 4}}>Add to cart</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ProductDetailScreen
