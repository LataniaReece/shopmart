import React from 'react'
import ProductsComponent from '../components/products/ProductsComponent'
import ShowcaseComponent from '../components/ShowcaseComponent'

const HomeScreen = () => {
    return (
        <>
            <ShowcaseComponent />
            <ProductsComponent home={true}/>
        </>
    )
}

export default HomeScreen
