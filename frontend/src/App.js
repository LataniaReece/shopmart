import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import './App.css';

import Pay from './components/Pay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/products/ProductDetailScreen';
import ProductsListScreen from './screens/products/ProductsListScreen';
import CartScreen from './screens/CartScreen';

import customTheme from './assets/theme';
import OrderSuccess from './screens/OrderSuccess';
import OrdersScreen from './screens/orders/OrdersScreen';
import OrderDetailScreen from './screens/orders/OrderDetailScreen';
import LoginScreen from './screens/users/LoginScreen';
import RegisterScreen from './screens/users/RegisterScreen';
import DashboardScreen from './screens/admin/DashboardScreen';
import ProductsScreen from './screens/admin/ProductsScreen';
import CreateProductScreen from './screens/admin/CreateProductScreen';
import ProductScreen from './screens/admin/ProductScreen';
import UsersScreen from './screens/admin/UsersScreen';
import TransactionsScreen from './screens/admin/TransactionsScreen';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function ProtectedUserRoute({ children, redirectTo }) {
    let isAuthenticated = false;

    if (userInfo && userInfo._id) {
      isAuthenticated = true;
    }
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  function ProtectedAdminRoute({ children, redirectTo }) {
    let isAuthenticated = false;

    if (userInfo && userInfo.isAdmin) {
      isAuthenticated = true;
    }
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <main style={{ height: '100%', width: '100%', minWidth: '100%' }}>
          <Navbar />
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route
              path='/products/category/:category'
              element={<ProductsListScreen />}
            />
            <Route path='/products/:id' element={<ProductDetailScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/success' element={<OrderSuccess />} />
            <Route
              path='/orders/:id'
              element={
                <ProtectedUserRoute redirectTo='/login?redirect=/orders'>
                  <OrderDetailScreen />
                </ProtectedUserRoute>
              }
            />
            <Route
              path='/orders'
              element={
                <ProtectedUserRoute redirectTo='/login?redirect=/orders'>
                  <OrdersScreen />
                </ProtectedUserRoute>
              }
            />
            <Route
              path='/admin/users'
              element={
                <ProtectedAdminRoute redirectTo='/login?redirect=/admin/users'>
                  <UsersScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path='/admin/products'
              element={
                <ProtectedAdminRoute redirectTo='/login?redirect=/admin/products'>
                  <ProductsScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path='/admin/products/create'
              element={
                <ProtectedAdminRoute redirectTo='/login?redirect=/admin/products/create'>
                  <CreateProductScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path='/admin/products/:id'
              element={
                <ProtectedAdminRoute redirectTo='/login?redirect=/admin/products'>
                  <ProductScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path='/admin/transactions'
              element={
                <ProtectedAdminRoute redirectTo='/login?redirect=/admin/transactions'>
                  <TransactionsScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path='/admin'
              element={
                <ProtectedAdminRoute redirectTo='/login?redirect=/admin'>
                  <DashboardScreen />
                </ProtectedAdminRoute>
              }
            />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default AppWrapper;
