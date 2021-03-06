import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Container, Typography, Alert, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../../components/Spinner';
import { userRequest } from '../../requestMethods';

const UsersScreen = () => {
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await userRequest.get(`/api/users`);
        setUsers(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getUsers();
  }, []);

  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const displayDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format('MM/DD/YYYY');
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'username',
      headerName: 'Username',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Typography>{titleCase(params.row.username)}</Typography>
          </>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Joined',
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
      field: 'action',
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
        <Typography variant='h4'>Users</Typography>
        <Button variant='outlined' color='primary' sx={{ mt: 1, mb: 2 }}>
          <Link to={'/admin'}>Admin Dashboard</Link>
        </Button>
        {!users && <Spinner />}
        {message && <Alert severity='error'>{message}</Alert>}
        {users && (
          <div style={{ height: '800', width: '100%' }} className='productList'>
            <DataGrid
              rows={users}
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
export default UsersScreen;
