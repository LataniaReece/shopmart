import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(orderNumber, name, date, amount, status) {
  return { orderNumber, name, date, amount, status };
}

const rows = [
  createData('#1234', 'Tania', 'Dec 3rd', 500, 'completed'),
  createData('#1235', 'Tania', 'Dec 3rd', 500, 'completed'),
  createData('#1236', 'Tania', 'Dec 3rd', 500, 'completed'),
  createData('#1237', 'Tania', 'Dec 3rd', 500, 'completed'),
];

const LatestOrdersComponent = () => {
  return (
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
          {rows.map((row) => (
            <TableRow
              key={row.orderNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row' align='center'>
                {row.orderNumber}
              </TableCell>
              <TableCell align='center'>{row.name}</TableCell>
              <TableCell align='center'>{row.date}</TableCell>
              <TableCell align='center'>{row.amount}</TableCell>
              <TableCell align='center'>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestOrdersComponent;
