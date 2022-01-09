import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { userRequest } from '../../requestMethods';

const LatestOrdersComponent = () => {
  const [order, setOrders] = useState(null);
  const [message, setMessage] = useState(null);

  const displayDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format('MM/DD/YYYY');
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await userRequest.get(`/orders`);
        const list = data.sort(function (a, b) {
          var keyA = new Date(a.createdAt),
            keyB = new Date(b.createdAt);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        setOrders(list);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      {message ? (
        <Alert severity='error'>{message}</Alert>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Order Number</TableCell>
                <TableCell align='center'>Customer</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Amount</TableCell>
                <TableCell align='center'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order &&
                order.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row' align='center'>
                      {order._id}
                    </TableCell>
                    <TableCell align='center'>{order.user.username}</TableCell>
                    <TableCell align='center'>
                      {displayDate(order.createdAt)}
                    </TableCell>
                    <TableCell align='center'>${order.amount / 100}</TableCell>
                    <TableCell align='center'>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default LatestOrdersComponent;
