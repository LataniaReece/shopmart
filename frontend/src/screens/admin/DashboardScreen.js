import { useEffect, useMemo, useState } from 'react';
import { Grid, Typography, Box, Paper, Alert } from '@mui/material';
import Chart from '../../components/admin/Chart';
import { getUserStats } from '../../actions/userActions';
import AdminSidenav from '../../components/admin/AdminSidenav';
import NewUsersComponent from '../../components/admin/NewUsersComponent';
import LatestOrdersComponent from '../../components/admin/LatestOrdersComponent';
import RevenueComponent from '../../components/admin/RevenueComponent';
import { userRequest } from '../../requestMethods';

const DashboardScreen = () => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState([]);

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
        const { data } = await userRequest.get(`/api/users/stats`);

        const list = data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setUserData((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total / 100 },
          ])
        );
      } catch (err) {
        setMessage(err.message);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <Box sx={{ minHeight: '85vh', pb: 5 }} className='admin-dashboard-page'>
      <Typography
        variant='h4'
        sx={{ my: 3, paddingLeft: '1rem' }}
        align='center'
      >
        ShopMart Admin
      </Typography>
      {message && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
      <Grid container spacing={2} className='dashboard-container'>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ marginLeft: '0.5rem', backgroundColor: '#F2F2F5' }}
        >
          <AdminSidenav />
        </Grid>
        <Grid item xs={12} md={8}>
          <RevenueComponent />
          <Chart
            data={userData}
            title='User Analytics'
            grid
            dataKey='Active User'
          />
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            className='dashboard-container-bottom'
          >
            <Paper
              elevation={3}
              sx={{ padding: '2rem' }}
              className='new-members'
            >
              <Typography
                variant='p'
                sx={{ fontWeight: 600, fontSize: 20, mb: 3 }}
              >
                Newly Joined Members
              </Typography>
              <NewUsersComponent />
            </Paper>
            <Paper
              elevation={3}
              sx={{ padding: '2rem' }}
              className='latest-orders'
            >
              <Typography
                variant='p'
                sx={{ fontWeight: 600, fontSize: 20, mb: 3 }}
              >
                Latest Orders
              </Typography>
              <LatestOrdersComponent />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
