import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Alert } from '@mui/material';

const NewUsersComponent = ({ users }) => {
  const [newUsers, setNewUsers] = useState([]);
  const [message, setMessage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    !userInfo && navigate('/login?redirect=/admin');
    userInfo && !userInfo.isAdmin && navigate('/');

    const getNewUserInfo = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`/api/users?new=true`, config);

        setNewUsers(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getNewUserInfo();
  }, []);

  return (
    <>
      {message && <Alert severity='error'>{message}</Alert>}
      {newUsers &&
        newUsers.map((user) => {
          return (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}
              key={user._id}
            >
              <Typography component='p' variant='p'>
                {user.username}
              </Typography>
              <Typography component='p' variant='p'>
                {user.email}
              </Typography>
            </Box>
          );
        })}
    </>
  );
};

export default NewUsersComponent;
