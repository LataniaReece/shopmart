import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Paper, Typography, Box } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
};

const RevenueComponent = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [message, setMessage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const getIncome = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/orders/stats', config);

        setIncome(data);
        setPerc((data[1].total * 100) / data[0].total - 100);
        console.log(`highest index ${indexOfMax(Object.keys(data))}`);
      } catch (err) {
        err && setMessage(err);
      }
    };
    getIncome();
  }, []);

  console.log(income);

  return (
    <>
      {income && perc && (
        <Paper elevation={3} sx={{ padding: '2rem', width: '30%' }}>
          <Typography variant='h5'>Revenue</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='p' variant='p' sx={{ fontSize: 30, my: 2 }}>
              ${income[1].total}
            </Typography>
            <Typography
              component='p'
              variant='p'
              sx={{ fontSize: 15, my: 2, alignSelf: 'center' }}
            >
              {Math.floor(perc)}%
              {perc < 0 ? (
                <ArrowDownwardIcon sx={{ alignSelf: 'center', color: 'red' }} />
              ) : (
                <ArrowUpwardIcon sx={{ alignSelf: 'center', color: 'green' }} />
              )}
            </Typography>
          </Box>
          <Typography component='p' variant='p' className='text-light'>
            Compared to Last Month
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default RevenueComponent;
