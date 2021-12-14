import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  Typography,
  TextField,
  Alert,
  Button,
} from '@mui/material';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { createProduct } from '../../actions/productAction';

const CreateProductScreen = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [categories, setCategories] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const handleColor = (e) => {
    setColor(e.target.value.split(','));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  };
  const handleCategories = (e) => {
    setCategories(e.target.value.split(','));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(
            createProduct({
              title,
              description,
              image: downloadURL,
              categories,
              size,
              color,
              price,
            })
          );
        });
      }
    );
  };

  return (
    <Box sx={{ my: 5 }}>
      <form
        className='form-container create-product-form'
        onSubmit={handleSubmit}
      >
        <Typography textAlign='center' variant='h4'>
          Create New Product
        </Typography>
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
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='color'
              type='text'
              label='Color'
              value={color}
              onChange={handleColor}
              variant='outlined'
              helperText='e.g blue, red, green'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='categories'
              type='text'
              label='Categories'
              value={categories}
              onChange={handleCategories}
              variant='outlined'
              helperText='e.g shirt, jacket, shoes'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='size'
              type='text'
              label='Sizes'
              value={size}
              onChange={handleSize}
              variant='outlined'
              helperText='e.g small, medium, large'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='file'
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              variant='outlined'
            />
          </FormControl>
        </div>
        <Button variant='contained' sx={{ mt: 5, width: '100%' }} type='submit'>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductScreen;
