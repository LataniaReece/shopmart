import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux';
import store from './store'
import './App.css'

import Pay from './components/Pay'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/products/ProductDetailScreen';
import ProductsListScreen from './screens/products/ProductsListScreen';

import customTheme from './assets/theme';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={customTheme}>
                <Router>
                    <main style={{ height: "100%", width: "100%", minWidth: "100%" }}>
                        <Navbar />
                        <Routes>
                            <Route path='/products/category/:category' element={<ProductsListScreen/>} />
                            <Route path='/products/:id' element={<ProductDetailScreen/>} />
                            <Route path='/' element={<HomeScreen/>} />
                        </Routes>
                        <Footer />
                    </main>
                </Router>
            </ThemeProvider> 
        </Provider>
    )
}

export default App
