import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Alert, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../../components/Spinner';
import { userRequest } from '../../requestMethods';

const TransactionsScreen = () => {
  const [orders, setOrders] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await userRequest.get(`/orders`);
        setOrders(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getOrders();
  }, []);

  //populate users when you get orders

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'user', headerName: 'User', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    {
      field: 'status',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {' '}
            <Link to={`/admin/userorders/${params.row._id}`}>
              {' '}
              <Button
                variant='contained'
                size='small'
                sx={{ backgroundColor: 'green !important', mr: 3 }}
              >
                {' '}
                Check Orders
              </Button>{' '}
            </Link>{' '}
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
        {orders && (
          <div style={{ height: '800', width: '100%' }} className='productList'>
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
