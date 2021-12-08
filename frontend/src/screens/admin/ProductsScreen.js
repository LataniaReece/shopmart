import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts } from "../../actions/productAction";

const image =
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "product",
    headerName: "Product",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="productListItem">
          <img className="productListImg" src={params.row.image} alt="" />
          {params.row.title}
        </div>
      );
    },
  },
  { field: "inStock", headerName: "Stock", width: 200 },
  { field: "price", headerName: "Price", width: 160 },
  { field: "action", headerName: "Action", width: 150 },
];

const rows = [
  {
    id: 123,
    product: (
      <div>
        <img src={image} alt="image" style={{ maxWidth: "100%" }} />
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
        <img src={image} alt="image" style={{ maxWidth: "100%" }} />
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
        <img src={image} alt="image" style={{ maxWidth: "100%" }} />
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
        <img src={image} alt="image" style={{ maxWidth: "100%" }} />
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
        <img src={image} alt="image" style={{ maxWidth: "100%" }} />
        <span>Product Name</span>
      </div>
    ),
    inStock: true,
    price: 350,
  },
];

const ProductsScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {products && (
        <Container sx={{ minHeight: "85vh" }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default ProductsScreen;
