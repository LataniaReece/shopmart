import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Container, Typography, Alert, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import { deleteProduct, getProducts } from '../../actions/productAction';
import Spinner from '../../components/Spinner';
import AlertClosable from '../../components/AlertClosable';

const ProductsScreen = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: deleteError, success: successDelete } = productDelete;

  useEffect(() => {
    const history = createBrowserHistory();
    if (history.location.state && history.location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      let state = { ...history.location.state };
      delete state.successMessage;
      history.replace({ ...history.location, state });
    }
    dispatch(getProducts());
  }, [successDelete, location]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'product',
      headerName: 'Product',
      width: 220,
      renderCell: (params) => {
        return (
          <div className='productListItem'>
            <img className='productListImg' src={params.row.image} alt='' />
            {params.row.title}
          </div>
        );
      },
    },
    { field: 'inStock', headerName: 'Stock', width: 200 },
    { field: 'price', headerName: 'Price', width: 160 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/products/${params.row._id}`}>
              <Button
                variant='contained'
                size='small'
                sx={{ mr: 3 }}
                color='secondary'
              >
                Edit
              </Button>
            </Link>
            <DeleteOutlineIcon
              className='productListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container sx={{ minHeight: '90vh', mt: 4, mb: 5 }}>
        <Typography variant='h4'>Products</Typography>
        <Button variant='contained' color='secondary' sx={{ mt: 1, mb: 2 }}>
          <Link to={'/admin/products/create'}>Create Product</Link>
        </Button>
        {loading && <Spinner />}
        {error && <Alert severity='error'>{error}</Alert>}
        {successMessage && (
          <AlertClosable message={successMessage} variant='success' />
        )}
        {products && (
          <div style={{ height: '800', width: '100%' }} className='productList'>
            <DataGrid
              rows={products}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={10}
              checkboxSelection
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductsScreen;
