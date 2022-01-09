import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { userRequest } from '../../requestMethods';

const NewUsersComponent = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getNewUserInfo = async () => {
      try {
        const { data } = await userRequest.get(`/users?new=true`);
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
