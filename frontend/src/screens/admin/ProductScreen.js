import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Paper, Alert, Avatar } from '@mui/material';
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
const data = [
  { month: 'Jan', sale: 500 },
  { month: 'Feb', sale: 500 },
];

const ProductScreen = () => {
  const [message, setMessage] = useState('');
  const [pStats, setPStats] = useState([]);

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  let { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [productId]);

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
                  Newly Joined Members
                </Typography>
              </Paper>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductScreen;
