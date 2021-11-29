import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import {Box, FormControl, InputLabel, Select, MenuItem, Container, Typography, Button, Grid} from '@mui/material'
import { getProductDetail } from '../../actions/productAction'
import Spinner from '../../components/Spinner'

const ProductDetailScreen = () => {
    const [size, setSize ] = useState('')

    const dispatch = useDispatch()
    const { id } = useParams();

    const productDetail = useSelector(state => state.productDetail)
    let { loading, error, product } = productDetail

    useEffect(() => {
        console.log(id)
        dispatch(getProductDetail(id))
    }, [id])

    return (
        <>
        <div className="product-detail-container">
            {loading && <Spinner />}
            {product && product._id && (
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
            )}
        </div>
        </>
    )
}

export default ProductDetailScreen
