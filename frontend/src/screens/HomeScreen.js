import React from 'react'
import ProductListComponent from '../components/products/ProductListComponent'
import ShowcaseComponent from '../components/ShowcaseComponent'

const HomeScreen = () => {
    return (
        <>
            <ShowcaseComponent />
            <ProductListComponent home={true}/>
        </>
    )
}

export default HomeScreen
