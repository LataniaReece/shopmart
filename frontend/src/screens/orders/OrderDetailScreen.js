import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Container, Button } from '@mui/material';
import moment from 'moment';
import { getOrderDetails } from '../../actions/orderActions';
import Spinner from '../../components/Spinner';

const OrderDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, []);

  const displayDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format('MM/DD/YYYY');
  };

  return (
    <Container sx={{ minHeight: '85vh', pt: 3 }}>
      {loading ? (
        <Spinner />
      ) : (
        order && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h4' sx={{ mt: 2, mb: 1 }}>
                Order Details: (Order# {order._id})
              </Typography>
              <Link to='/' style={{ alignSelf: 'center' }}>
                <Button variant='contained' color='secondary'>
                  Continue Shopping
                </Button>
              </Link>
            </Box>
            <Typography component='p' variant='p'></Typography>
            <Typography component='p' variant='p' sx={{ mb: 2 }}>
              Order placed on: {displayDate(order.createdAt)}
            </Typography>
            <Box
              sx={{
                border: '2px solid #DCDCDC',
                borderRadius: '10px',
                padding: '1.5rem',
                mb: 3,
              }}
              key={order._id}
            >
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                className='order-details'
              >
                <div className='address'>
                  <Typography
                    variant='p'
                    component='p'
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Shipping Address
                  </Typography>
                  <Typography variant='p' component='p'>
                    {order.address.name.toUpperCase()}
                  </Typography>
                  <Typography variant='p' component='p'>
                    {order.address.address.line1}
                  </Typography>
                  <Typography variant='p' component='p'>
                    {order.address.address.line2}
                  </Typography>
                  <Typography variant='p' component='p'>
                    {order.address.address.city}, {order.address.address.state}
                  </Typography>
                  <Typography variant='p' component='p'>
                    {order.address.address.postal_code}
                  </Typography>
                </div>
                <div className='payment-method'>
                  <Typography
                    variant='p'
                    component='p'
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Payment Method
                  </Typography>
                  <Typography variant='p' component='p'>
                    {order.paymentMethod.card.network.toUpperCase()} ****{' '}
                    {order.paymentMethod.card.last4}
                  </Typography>
                </div>
                <Box sx={{ width: 275 }}>
                  <Typography
                    variant='p'
                    component='p'
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Order Summary
                  </Typography>
                  <div
                    className='order-summary-detail'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <Typography variant='p'>Item(s) Subtotal</Typography>
                    <Typography variant='p'>${order.amount}</Typography>
                  </div>
                  <div
                    className='order-summary-detail'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <Typography variant='p'>Shipping & Handling</Typography>
                    <Typography variant='p'>$50</Typography>
                  </div>
                  <div
                    className='order-summary-detail'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <Typography variant='p'>Tax</Typography>
                    <Typography variant='p'>$50</Typography>
                  </div>
                  <div
                    className='order-summary-detail'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <Typography variant='p'>Grand Total</Typography>
                    <Typography variant='p'>${order.amount}</Typography>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box
              className='order-products'
              sx={{
                border: '2px solid #DCDCDC',
                borderRadius: '10px',
                padding: '1.5rem',
                my: 3,
              }}
            >
              {order.products &&
                order.products.map((product) => {
                  return (
                    <Link to={`/products/${product._id}`} key={product._id}>
                      <img src={product.image} alt='image' />
                    </Link>
                  );
                })}
            </Box>
          </>
        )
      )}
    </Container>
  );
};

export default OrderDetailScreen;
