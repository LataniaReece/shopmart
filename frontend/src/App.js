import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Pay from './components/Pay'
import Navbar from './components/Navbar/Navbar';
import HomeScreen from './screens/HomeScreen';

const App = () => {
    return (
        <Router>
            <main>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomeScreen/>} />
                </Routes>
            </main>
        </Router>
    )
}

export default App
