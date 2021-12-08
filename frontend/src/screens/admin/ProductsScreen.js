import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const image =
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'product',
    headerName: 'Product',
    width: 200,
    renderCell: (params) => {
      return (
        <div className='productListItem'>
          <img className='productListImg' src={params.row.img} alt='' />
          {params.row.name}
        </div>
      );
    },
  },
  { field: 'inStock', headerName: 'Stock', width: 130 },
  { field: 'price', headerName: 'Price', width: 70 },
  { field: 'action', headerName: 'Action', width: 70 },
];

const rows = [
  {
    id: 123,
    product: (
      <div>
        <img src={image} alt='image' style={{ maxWidth: '100%' }} />
        <span>Product Name</span>
      </div>
    ),
    inStock: true,
    price: 350,
  },
  {
    id: 123,
    product: (
      <div>
        <img src={image} alt='image' style={{ maxWidth: '100%' }} />
        <span>Product Name</span>
      </div>
    ),
    inStock: true,
    price: 350,
  },
  {
    id: 123,
    product: (
      <div>
        <img src={image} alt='image' style={{ maxWidth: '100%' }} />
        <span>Product Name</span>
      </div>
    ),
    inStock: true,
    price: 350,
  },
  {
    id: 123,
    product: (
      <div>
        <img src={image} alt='image' style={{ maxWidth: '100%' }} />
        <span>Product Name</span>
      </div>
    ),
    inStock: true,
    price: 350,
  },
  {
    id: 123,
    product: (
      <div>
        <img src={image} alt='image' style={{ maxWidth: '100%' }} />
        <span>Product Name</span>
      </div>
    ),
    inStock: true,
    price: 350,
  },
];

const ProductsScreen = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductsScreen;
