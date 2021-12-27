import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { getProductDetail } from '../../actions/productAction';
import Spinner from '../../components/Spinner';
import { addToCart } from '../../actions/cartActions';

const ProductDetailScreen = () => {
  const [message, setMessage] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  let { loading, error, product } = productDetail;

  useEffect(() => {
    if (!product || !product._id || id !== product._id) {
      dispatch(getProductDetail(id));
    } else if (product) {
      if (product.color.length === 1) {
        setColor(product.color[0]);
      }
      if (product.size.length === 1) {
        setSize(product.size[0]);
      }
    }
  }, [id, product]);

  const displaySize = (size) => {
    if (size === 'S') {
      return 'Small';
    } else if (size === 'M') {
      return 'Medium';
    } else if (size === 'L') {
      return 'Large';
    }
  };

  const handleQuantity = (type) => {
    if (type === 'sub') {
      quantity > 1 && setQuantity(quantity - 1);
    } else if (type === 'add') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (!quantity || !color || !size) {
      setMessage('Please select all fields');
    } else {
      setMessage('');
      dispatch(
        addToCart({
          ...product,
          quantity,
          color,
          totalPrice: quantity * product.price,
          size,
          productId: product._id + Date.now(),
        })
      );
      setMessage('Added to cart!');
    }
  };

  return (
    <>
      <div className='product-detail-container'>
        {loading ? (
          <Spinner />
        ) : (
          product &&
          product._id && (
            <Container>
              <Typography
                variant='h3'
                sx={{ fontWeight: 'light', mt: 4, mb: 2, fontSize: 38 }}
              >
                {product.title}
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item sx={{ width: '100%' }} xs={12} md={6}>
                  <img src={product.image} alt={product.title} />
                </Grid>
                <Grid item sx={{ width: '100%' }} xs={12} md={6}>
                  <Typography
                    gutterbottom
                    variant='h4'
                    sx={{ fontWeight: 'light', my: 3 }}
                  >
                    $ {product.price}
                  </Typography>
                  <Typography gutterbottom variant='p' sx={{ lineHeight: 1.5 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 3, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant='p' sx={{ fontSize: 20, mr: 1 }}>
                        Color
                      </Typography>
                      <div className='colors'>
                        {product.color.map((c) => {
                          return (
                            <button
                              className='color'
                              style={{ backgroundColor: `${c}` }}
                              key={c}
                              onClick={() => setColor(c)}
                            ></button>
                          );
                        })}
                      </div>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth sx={{ ml: 4 }}>
                        <InputLabel id='size'>Size</InputLabel>
                        <Select
                          labelId='size'
                          id='size-select'
                          value={size}
                          label='Size'
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                        >
                          {product.size.map((size) => {
                            return (
                              <MenuItem value={size} key={size}>
                                {displaySize(size)}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <div className='quantity-counter'>
                    <button onClick={() => handleQuantity('sub')}>
                      <i class='fas fa-minus'></i>
                    </button>
                    <span className='number'>{quantity}</span>
                    <button onClick={() => handleQuantity('add')}>
                      <i class='fas fa-plus'></i>
                    </button>
                  </div>
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{ mt: 4, display: 'inline-block', width: '100%' }}
                    onClick={() => handleAddToCart()}
                  >
                    Add to cart
                  </Button>
                  {message && <Alert variant='info'>{message}</Alert>}
                </Grid>
              </Grid>
            </Container>
          )
        )}
      </div>
    </>
  );
};

export default ProductDetailScreen;
