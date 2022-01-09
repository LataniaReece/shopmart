import React, { useEffect } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Container, Alert, Button } from '@mui/material';
import { getUserOrders } from '../../actions/orderActions';
import Spinner from '../../components/Spinner';

const OrdersScreen = () => {
  const dispatch = useDispatch();

  const userOrders = useSelector((state) => state.userOrders);
  let { loading, error, orders } = userOrders;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const displayDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format('MM/DD/YYYY');
  };

  return (
    <Container sx={{ minHeight: '85vh', pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4' sx={{ my: 3 }}>
          Your Orders
        </Typography>
        <Link to='/' style={{ alignSelf: 'center' }}>
          <Button variant='contained' color='secondary'>
            Continue Shopping
          </Button>
        </Link>
      </Box>
      {error && <Alert severity='error'>{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : orders && orders.length !== 0 ? (
        orders.map((order) => {
          return (
            <Box
              sx={{
                border: '2px solid #DCDCDC',
                borderRadius: '10px',
                padding: '1.5rem',
                mb: 3,
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
              }}
              key={order._id}
            >
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                className='order-details'
              >
                <div className='info'>
                  <div>
                    <Typography component='p' variant='p'>
                      Order Placed
                    </Typography>
                    <Typography component='p' variant='p'>
                      {displayDate(order.createdAt)}
                    </Typography>
                  </div>
                  <div>
                    <Typography component='p' variant='p'>
                      Total
                    </Typography>
                    <Typography component='p' variant='p'>
                      ${order.amount}
                    </Typography>
                  </div>
                  <div>
                    <Typography component='p' variant='p'>
                      Ship To
                    </Typography>
                    <Typography component='p' variant='p'>
                      {order.address.name && order.address.name.toUpperCase()}
                    </Typography>
                  </div>
                </div>
                <div className='order-number'>
                  <Typography variant='p'>Order #: {order._id}</Typography>
                  <Link to={`/orders/${order._id}`}>View Order Details</Link>
                </div>
              </Box>
              <Box className='order-products' sx={{ mt: 3 }}>
                {order.products &&
                  order.products.map((product) => {
                    return (
                      <Link to={`/products/${product._id}`} key={product._id}>
                        <img src={product.image} alt='image' />
                      </Link>
                    );
                  })}
              </Box>
            </Box>
          );
        })
      ) : (
        <Alert severity='info'>No Orders Found...</Alert>
      )}
    </Container>
  );
};

export default OrdersScreen;
