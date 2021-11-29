import React, {useState} from 'react'
import {Box, FormControl, InputLabel, Select, MenuItem, Container, Typography} from '@mui/material'
import { useLocation } from 'react-router';


import ProductListComponent from './ProductListComponent';

const ProductsComponent = ({ home = false, category}) => {
    const [filters, setFilters] = useState({color: '', size: ''});
    const [sort, setSort ] = useState('newest')

    const handleFilters = (e) =>{
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }

    return (
        <Container>
            <Box className="product-filters" sx={{ display: 'flex', marginTop: home ? '3rem' : '', justifyContent: 'space-between'}}>
                <div className="left-section">
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
                        <Typography variant="h5" sx={{fontSize: '1.5rem'}}>Filter Products:</Typography>
                    </div>
                    <Box sx={{ minWidth: 120, mr:3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="size">Size</InputLabel>
                            <Select
                                labelId="size"
                                label="Size"
                                name="size"
                                value={filters.size}
                                onChange={(e)=>handleFilters(e)}
                            >
                                <MenuItem value={"S"}>Small</MenuItem>
                                <MenuItem value={"M"}>Medium</MenuItem>
                                <MenuItem value={"L"}>Large</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="size">Color</InputLabel>
                            <Select
                                labelId="color"
                                label="color"
                                name="color"
                                value={filters.color}
                                onChange={(e)=>handleFilters(e)}
                            >
                                <MenuItem value={"black"}>Black</MenuItem>
                                <MenuItem value={"yellow"}>Yellow</MenuItem>
                                <MenuItem value={"orange"}>Orange</MenuItem>
                                <MenuItem value={"blue"}>Blue</MenuItem>
                                <MenuItem value={"khaki"}>Khaki</MenuItem>
                                <MenuItem value={"beige"}>Beige</MenuItem>
                                <MenuItem value={"pink"}>Pink</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="right-section">
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
                        <Typography variant="h5" sx={{fontSize: '1.5rem'}}>Sort Products:</Typography>
                    </div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="size">Sort</InputLabel>
                            <Select
                                labelId="sort"
                                id="sort-select"
                                value={sort}
                                label="sort"
                                name="sort"
                                onChange={(e) => {setSort(e.target.value)}}
                            >
                                <MenuItem value={"newest"}>Newest</MenuItem>
                                <MenuItem value={"desc"}>Price: High To Low</MenuItem>
                                <MenuItem value={"asc"}>Price: Low To High</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    </div>
                </Box>
                <ProductListComponent category={category} filters={filters} sort={sort}/>
        </Container>
    )
}

export default ProductsComponent
