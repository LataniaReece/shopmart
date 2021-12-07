import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Paper, Avatar } from '@mui/material';
import Chart from '../../components/admin/Chart';
import { getUserStats } from '../../actions/userActions';
import AdminSidenav from '../../components/AdminSidenav';
import OrderTable from '../../components/admin/OrderTable';

const DashboardScreen = () => {
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  const userStats = useSelector((state) => state.userStats);
  const { loading, error, stats } = userStats;

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    dispatch(getUserStats());
  }, []);

  useEffect(() => {
    userData &&
      userData.map((item) =>
        setUserData((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], 'Active User': item.total },
        ])
      );
  }, [userData]);

  return (
    <Box sx={{ minHeight: '85vh' }}>
      <Typography variant='h4' sx={{ my: 3, paddingLeft: '1rem' }}>
        ShopMart Admin
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          md={2}
          sx={{ marginLeft: '0.5rem', backgroundColor: '#F2F2F5' }}
        >
          <AdminSidenav />
        </Grid>
        <Grid item xs={6} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paper elevation={3} sx={{ padding: '2rem', width: '30%' }}>
              <Typography variant='h5'>Revenue</Typography>
              <Typography
                component='p'
                variant='p'
                sx={{ fontSize: 30, my: 2 }}
              >
                $3218
              </Typography>
              <Typography component='p' variant='p' className='text-light'>
                Compared to Last Month
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: '2rem', width: '30%' }}>
              <Typography variant='h5'>Revenue</Typography>
              <Typography
                component='p'
                variant='p'
                sx={{ fontSize: 30, my: 2 }}
              >
                $3218
              </Typography>
              <Typography component='p' variant='p' className='text-light'>
                Compared to Last Month
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: '2rem', width: '30%' }}>
              <Typography variant='h5'>Revenue</Typography>
              <Typography
                component='p'
                variant='p'
                sx={{ fontSize: 30, my: 2 }}
              >
                $3218
              </Typography>
              <Typography component='p' variant='p' className='text-light'>
                Compared to Last Month
              </Typography>
            </Paper>
          </Box>
          <Chart
            data={userStats}
            title='User Analytics'
            grid
            dataKey='Active User'
          />
          <Box>
            <Paper elevation={3} sx={{ padding: '2rem' }}>
              <Typography
                variant='p'
                sx={{ fontWeight: 600, fontSize: 20, mb: 3 }}
              >
                Latest Orders
              </Typography>
              <OrderTable />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
