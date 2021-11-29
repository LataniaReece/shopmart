import React, {useState, useEffect} from 'react'
import {Box} from '@mui/material'
import { useLocation } from 'react-router';

import ProductListComponent from '../../components/products/ProductListComponent';
import ProductsComponent from '../../components/products/ProductsComponent';

const ProductsListScreen = ({ home=false }) => {
    const [filters, setFilters] = useState({color: '', size: ''});
    const [sort, setSort ] = useState('newest')

    const location = useLocation();
    const category = location.pathname.split('/')[3]

    useEffect(() => {
    }, [category])

    return (
        <Box sx={{mt: 3}}>
            <ProductsComponent category={category} filters={filters} sort={sort}/>
       </Box>
    )
}

export default ProductsListScreen
