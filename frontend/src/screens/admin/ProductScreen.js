import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Alert,
  Avatar,
  FormControl,
  TextField,
  Button,
} from '@mui/material';
import Chart from '../../components/admin/Chart';
import AdminSidenav from '../../components/admin/AdminSidenav';
import { useParams } from 'react-router';
import { getProductDetail, updateProduct } from '../../actions/productAction';
import { userRequest } from '../../requestMethods';
import ProgressBar from '../../components/ProgressBar';
import AlertClosable from '../../components/AlertClosable';
import { PRODUCT_UPDATE_RESET } from '../../actions/actionTypes/productTypes';

const ProductScreen = () => {
  const [message, setMessage] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [pStats, setPStats] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  let { loading, error: detailError, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  let {
    success: successUpdate,
    error: successError,
    product: updatedProduct,
  } = productUpdate;

  const types = ['image/png', 'image/jpeg'];

  const handleFileChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      dispatch(
        updateProduct(product._id, {
          title,
          description,
          image: url,
          categories: categories.map((item) => item.trim()),
          size: size.map((item) => item.trim()),
          color: color.map((item) => item.trim()),
          price,
        })
      );
    } else {
      dispatch(
        updateProduct(product._id, {
          title,
          description,
          categories: categories.map((item) => item.trim()),
          size: size.map((item) => item.trim()),
          color: color.map((item) => item.trim()),
          price,
        })
      );
    }
  };

  useEffect(() => {
    if (!product || product._id !== productId || updatedProduct) {
      dispatch(getProductDetail(productId));
    } else {
      setTitle(product.title);
      setDescription(product.description);
      setColor(product.color.join(', '));
      setSize(product.size.join(', '));
      setCategories(product.categories.join(', '));
      setPrice(product.price);
    }
  }, [productId, product, updatedProduct]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
      setSuccessUpdateMessage('Product Updated');
      window.scrollTo(0, 0);
    }
  }, [successUpdate]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await userRequest.get(
          '/orders/stats?pid=' + productId
        );
        const list = data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        setMessage(err);
      }
    };
    getStats();
  }, [MONTHS, productId]);

  return (
    <Box sx={{ minHeight: '85vh' }}>
      <Typography
        variant='h4'
        sx={{ my: 3, paddingLeft: '1rem' }}
        align='center'
      >
        {product && product.title}
      </Typography>
      {message && <Alert severity='error'>{message}</Alert>}
      {successUpdateMessage && (
        <AlertClosable message={successUpdateMessage} variant='success' />
      )}
      {detailError && <Alert severity='error'>{detailError}</Alert>}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid
          item
          xs={6}
          md={2}
          sx={{ marginLeft: '0.5rem', backgroundColor: '#F2F2F5' }}
        >
          <AdminSidenav />
        </Grid>
        {product && (
          <>
            <Grid item xs={6} md={9}>
              <Button variant='contained' color='secondary' sx={{ mb: 3 }}>
                <Link to={`/products/${product._id}`}>View Product Page</Link>
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper elevation={3} sx={{ padding: '2rem', width: '48%' }}>
                  <Chart
                    data={pStats}
                    dataKey='Sales'
                    title='Sales Performance'
                  />
                </Paper>
                <Paper elevation={3} sx={{ padding: '2rem', width: '48%' }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Avatar alt={product.title} src={product.image} />
                    <Typography
                      component='p'
                      sx={{ ml: 2, alignSelf: 'center', fontWeight: 600 }}
                    >
                      {product.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '70%',
                    }}
                  >
                    <Typography component='p'>Id:</Typography>
                    <Typography component='p'>{product._id}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '70%',
                    }}
                  >
                    <Typography component='p'>Sales:</Typography>
                    <Typography component='p'>{product.title}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '70%',
                    }}
                  >
                    <Typography component='p'>Active:</Typography>
                    <Typography component='p'>true</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '70%',
                    }}
                  >
                    <Typography component='p'>In stock:</Typography>
                    <Typography component='p'>
                      {product.inStock ? 'true' : 'false'}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Paper elevation={3} sx={{ padding: '2rem', width: '100%' }}>
                  <Typography
                    variant='p'
                    sx={{ fontWeight: 600, fontSize: 20, mb: 3 }}
                  >
                    Edit Product
                  </Typography>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <form
                      className='product-update-form'
                      onSubmit={handleSubmit}
                    >
                      {message && <Alert severity='error'>{message}</Alert>}
                      <div>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='title'
                            type='text'
                            label='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant='standard'
                          />
                        </FormControl>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='description'
                            label='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant='outlined'
                            placeholder='Product description'
                            multiline
                            rows={5}
                          />
                        </FormControl>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='price'
                            type='number'
                            label='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            variant='standard'
                            inputProps={{ inputMode: 'numeric', min: '0' }}
                          />
                        </FormControl>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='color'
                            type='text'
                            label='Color'
                            value={color}
                            onChange={(e) =>
                              setColor(e.target.value.split(','))
                            }
                            variant='standard'
                            helperText='e.g blue, red, green'
                          />
                        </FormControl>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='categories'
                            type='text'
                            label='Categories'
                            value={categories}
                            onChange={(e) =>
                              setCategories(e.target.value.split(','))
                            }
                            variant='standard'
                            helperText='e.g shirt, jacket, shoes'
                          />
                        </FormControl>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='size'
                            type='text'
                            label='Sizes'
                            value={size}
                            onChange={(e) => setSize(e.target.value.split(','))}
                            variant='standard'
                            helperText='e.g S, M, L, XL, XXL'
                          />
                        </FormControl>
                        <FormControl sx={{ mt: 3, width: '100%' }}>
                          <TextField
                            name='file'
                            type='file'
                            onChange={handleFileChange}
                            variant='outlined'
                          />
                        </FormControl>
                        <div className='file-output'>
                          {error && <Alert severity='warning'>{error}</Alert>}
                          {file && (
                            <ProgressBar
                              file={file}
                              setFile={setFile}
                              url={url}
                              setUrl={setUrl}
                            />
                          )}
                        </div>
                      </div>
                      <Button
                        variant='contained'
                        sx={{ mt: 5, width: '100%' }}
                        type='submit'
                      >
                        Update
                      </Button>
                    </form>
                    <img className='admin-product-image' src={product.image} />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductScreen;
