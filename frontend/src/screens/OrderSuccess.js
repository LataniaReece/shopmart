import React from 'react'
import { useLocation, Link} from 'react-router-dom'
import {Box, Typography, Button} from '@mui/material'

const OrderSuccess = () => {

    const { state } = useLocation();

    return (
        <Box sx={{textAlign: 'center', height: '80vh', mt: 5}} className="order-success">
            <Typography variant="h4"><span style={{fontWeight: 'bold'}}>Order Number: </span>{state.paymentInfo.id}</Typography>
            <Typography variant="h5" sx={{ fontSize: 20, fontStyle:'italic', fontWeight: '300', mt: 2, width: '85%', margin: '0 auto'}}>Thank you for your order, we will send you an email when your order ships!</Typography>
            <img 
            src="https://images.unsplash.com/photo-1502355984-b735cb2550ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
            alt="thank you"/>
            <Link to={'/'}><Button variant="contained" color="secondary">Continue Shopping</Button></Link>
        </Box>            
    )
}

export default OrderSuccess
