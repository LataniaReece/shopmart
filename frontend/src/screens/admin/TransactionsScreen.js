import React, { useEffect, useState } from 'react';
import { Container, Typography, Alert, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../../components/Spinner';
import { userRequest } from '../../requestMethods';
import AlertClosable from '../../components/AlertClosable';

const TransactionsScreen = () => {
  const [orders, setOrders] = useState(null);
  const [message, setMessage] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setUpdateSuccess(false);
    const getOrders = async () => {
      try {
        const { data } = await userRequest.get(`/orders`);
        console.log(data);
        setOrders(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getOrders();
  }, [updateSuccess]);

  const updateOrderStatus = async (orderId) => {
    if (window.confirm('Are you sure you want to update this order?')) {
      try {
        await userRequest.put(`/orders/${orderId}`, {
          status: 'completed',
        });
        setUpdateSuccess(true);
        setSuccessMessage('Order Updated!');
      } catch (error) {
        setMessage(error);
      }
    }
  };
  //populate users when you get orders
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
              {params.row.user.username}({params.row.user._id})
            </Typography>
          </>
        );
      },
    },
    { field: 'amount', headerName: 'Amount', width: 200 },
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
              onClick={() => updateOrderStatus(params.row._id)}
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
        <Typography variant='h4'>Transactions</Typography>
        {!orders && <Spinner />}
        {message && <Alert severity='error'>{message}</Alert>}
        {successMessage && (
          <AlertClosable message={successMessage} variant='succesS' />
        )}
        {orders && (
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
        )}
      </Container>{' '}
    </>
  );
};
export default TransactionsScreen;
