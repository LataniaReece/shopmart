import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  Typography,
  TextField,
  Alert,
  Button,
} from '@mui/material';
import ProgressBar from '../../components/ProgressBar';
import { createProduct } from '../../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../../actions/actionTypes/productTypes';

const CreateProductScreen = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [categories, setCategories] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.productCreate);
  const { error: successError, success: createSuccess } = productCreate;

  const types = ['image/png', 'image/jpeg'];

  const handleFileChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && url && categories && size && color && price) {
      dispatch(
        createProduct({
          title,
          description,
          image: url,
          categories: categories.map((item) => item.trim()),
          size: size.map((item) => item.trim()),
          color: color.map((item) => item.trim()),
          price,
        })
      );
    } else {
      setMessage('Please enter all fields');
    }
  };

  useEffect(() => {
    if (createSuccess) {
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
      navigate('/admin/products', {
        state: {
          successMessage: 'Product Created!',
        },
      });
    }
  }, [createSuccess]);

  return (
    <Box sx={{ my: 5 }}>
      <form
        className='form-container create-product-form'
        onSubmit={handleSubmit}
      >
        <Typography textAlign='center' variant='h4'>
          Create New Product
        </Typography>
        {successError && <Alert severity='error'>{successError}</Alert>}
        {message && <Alert severity='error'>{message}</Alert>}
        <div>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='title'
              type='text'
              label='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant='outlined'
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='description'
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant='outlined'
              placeholder='Product description'
              multiline
              rows={5}
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='price'
              type='number'
              label='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant='outlined'
              inputProps={{ inputMode: 'numeric', min: '0' }}
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='color'
              type='text'
              label='Color'
              value={color}
              onChange={(e) => setColor(e.target.value.split(','))}
              variant='outlined'
              helperText='e.g blue, red, green'
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='categories'
              type='text'
              label='Categories'
              value={categories}
              onChange={(e) => setCategories(e.target.value.split(','))}
              variant='outlined'
              helperText='e.g shirt, jacket, shoes'
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='size'
              type='text'
              label='Sizes'
              value={size}
              onChange={(e) => setSize(e.target.value.split(','))}
              variant='outlined'
              helperText='e.g S, M, L, XL, XXL'
              required
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='file'
              type='file'
              onChange={handleFileChange}
              variant='outlined'
              required
            />
          </FormControl>
          <div className='file-output'>
            {error && <Alert severity='warning'>{error}</Alert>}
            {file && (
              <ProgressBar
                file={file}
                setFile={setFile}
                url={url}
                setUrl={setUrl}
              />
            )}
          </div>
        </div>
        <Button
          variant='contained'
          sx={{ mt: 5, width: '100%' }}
          type='submit'
          // disabled={progress ? true : false}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductScreen;
