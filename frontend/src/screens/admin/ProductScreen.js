import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { getUserStats } from '../../actions/userActions';
import AdminSidenav from '../../components/admin/AdminSidenav';
import { useParams } from 'react-router';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { getProductDetail } from '../../actions/productAction';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { createProduct } from '../../actions/productAction';
const data = [
  { month: 'Jan', sale: 500 },
  { month: 'Feb', sale: 500 },
];

const ProductScreen = () => {
  const [message, setMessage] = useState('');
  const [pStats, setPStats] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [categories, setCategories] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  let { loading, error, product } = productDetail;

  const handleColor = (e) => {
    setColor(e.target.value.split(','));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  };
  const handleCategories = (e) => {
    setCategories(e.target.value.split(','));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(
            createProduct({
              title,
              description,
              image: downloadURL,
              categories,
              size,
              color,
              price,
            })
          );
        });
      }
    );
  };

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setTitle(product.title);
      setDescription(product.description);
      setColor(product.color.join(', '));
      setSize(product.size.join(', '));
      setCategories(product.categories.join(', '));
      setPrice(product.price);
    }
  }, [productId, product]);

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
    !userInfo && navigate('/login?redirect=/admin');
    userInfo && !userInfo.isAdmin && navigate('/');

    const getStats = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const res = await axios.get(
          '/api/orders/stats?pid=' + productId,
          config
        );
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
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
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          md={2}
          sx={{ marginLeft: '0.5rem', backgroundColor: '#F2F2F5' }}
        >
          <AdminSidenav />
        </Grid>
        {product && (
          <Grid item xs={6} md={9}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <form className='product-update-form' onSubmit={handleSubmit}>
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
                          onChange={handleColor}
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
                          onChange={handleCategories}
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
                          onChange={handleSize}
                          variant='standard'
                          helperText='e.g small, medium, large'
                        />
                      </FormControl>
                      <FormControl sx={{ mt: 3, width: '100%' }}>
                        <TextField
                          name='file'
                          type='file'
                          onChange={(e) => setFile(e.target.files[0])}
                          variant='outlined'
                        />
                      </FormControl>
                    </div>
                    <Button
                      variant='contained'
                      sx={{ mt: 5, width: '100%' }}
                      type='submit'
                    >
                      Update
                    </Button>
                  </form>
                </Box>
              </Paper>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductScreen;
