import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Container, Typography, Alert, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../../components/Spinner';
import { userRequest } from '../../requestMethods';
import AlertClosable from '../../components/AlertClosable';

const UserTransactionsScreen = () => {
  const [orders, setOrders] = useState(null);
  const [message, setMessage] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    setUpdateSuccess(false);
    const getUserOrders = async () => {
      try {
        const { data } = await userRequest.get(`/api/orders/find/${id}`);
        setOrders(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getUserOrders();
  }, [updateSuccess]);

  const updateOrderStatus = async (orderId) => {
    if (window.confirm('Are you sure you want to update this order?')) {
      try {
        await userRequest.put(`/api/orders/${orderId}`, {
          status: 'completed',
        });
        setUpdateSuccess(true);
        setSuccessMessage('Order Updated!');
      } catch (error) {
        setMessage(error);
      }
    }
  };

  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const displayDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format('MM/DD/YYYY');
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'user', headerName: 'User', width: 200 },
    {
      field: 'user',
      headerName: 'User',
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Typography>
              {titleCase(params.row.user.username)} - {params.row.user._id}
            </Typography>
          </>
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 200,
      renderCell: (params) => {
        return <Typography>${params.row.amount}</Typography>;
      },
    },
    { field: 'amount', headerName: 'Amount', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Date Ordered',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Typography>{displayDate(params.row.createdAt)}</Typography>
          </>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant='contained'
              size='small'
              onClick={
                params.row.status === 'pending'
                  ? () => updateOrderStatus(params.row._id)
                  : undefined
              }
              style={{
                backgroundColor:
                  params.row.status === 'pending' ? 'red' : 'green',
              }}
            >
              {params.row.status}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container sx={{ minHeight: '85vh', mt: 4 }}>
        {' '}
        <Typography variant='h4'>User Transactions</Typography>
        <Button variant='outlined' color='primary' sx={{ mt: 1, mb: 2, mr: 2 }}>
          <Link to={'/admin'}>Admin Dashboard</Link>
        </Button>
        {!orders && <Spinner />}
        {message && <Alert severity='error'>{message}</Alert>}
        {successMessage && (
          <AlertClosable message={successMessage} variant='succesS' />
        )}
        {orders && orders.length > 0 ? (
          <div
            style={{ height: '800', width: '100%', marginTop: '1rem' }}
            className='productList'
          >
            <DataGrid
              rows={orders}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={10}
              checkboxSelection
            />
          </div>
        ) : (
          <Alert>No orders found for this user</Alert>
        )}
      </Container>{' '}
    </>
  );
};
export default UserTransactionsScreen;
