import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  FormControl,
  Button,
  Box,
  TextField,
  Alert,
} from '@mui/material';
import { login } from '../../actions/userActions';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, success } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (success) {
      navigate(redirect);
    }
    if (userInfo) {
      return navigate(redirect);
    }
  }, [success, navigate, dispatch, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <Box className='auth-form'>
      <form className='form-container' onSubmit={handleSubmit}>
        <Typography textAlign='center' variant='h4'>
          Sign In
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <div>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='username'
              type='text'
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant='outlined'
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='password'
              type='password'
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
            />
          </FormControl>
        </div>
        <Button variant='contained' sx={{ mt: 5, width: '100%' }} type='submit'>
          Sign In
        </Button>
        <Typography component='p' variant='p' color='light' sx={{ mt: 3 }}>
          Don't have an account? <Link to='/register'>Sign Up Here</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginScreen;
