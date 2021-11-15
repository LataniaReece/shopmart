import React from 'react';
import {Grid} from '@material-ui/core';
import ProductComponent from '../../components/products/ProductComponent';

import useStyles from './styles'

const products = [
    { id: 1, name: 'Shoes', description: 'Running Shoes.', price: '$5', image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'},
    { id: 1, name: 'Macbook', description: 'Apple Macbook.',  price: '$100', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'}
]

const ProductsScreen = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductComponent product={product} />
                    </Grid>
                ))}            
            </Grid>
        </main>
    )
}

export default ProductsScreen
