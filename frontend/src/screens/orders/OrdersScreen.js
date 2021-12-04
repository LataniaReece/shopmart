import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Box, Container, Alert} from '@mui/material'
import { getUserOrders } from '../../actions/orderActions'
import Spinner from '../../components/Spinner'

const OrdersScreen = () => {

    const dispatch = useDispatch()

    const userOrders = useSelector(state => state.userOrders)
    let { loading, error, orders } = userOrders

    useEffect(() => { 
        dispatch(getUserOrders())
    }, [dispatch])

    return (
        <Container>
            <Typography variant="h3" sx={{my: 3}}>Your Orders</Typography>
            {loading && <Spinner />}
            {error && <Alert severity="error">{error}</Alert> }
            { orders && (
                orders.map(order => {
                   return <Box 
                        sx={{border:'2px solid #DCDCDC', borderRadius: '10px', padding: '1.5rem', mb: 3, boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'}}
                        key={order._id}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}} className="order-details">
                            <div className="info">
                                <div>
                                    <Typography component="p" variant="p">Order Placed</Typography>
                                    <Typography component="p" variant="p">{order.createdAt}</Typography>
                                </div>
                                <div>
                                    <Typography component="p" variant="p">Total</Typography>
                                    <Typography component="p" variant="p">${order.amount}</Typography>
                                </div>
                                <div>
                                    <Typography component="p" variant="p">Ship To</Typography>
                                    <Typography component="p" variant="p">Tony Tony</Typography>
                                </div>
                            </div>
                            <div className="order-number">
                                <Typography variant="p">Order #: 123-3213912312931</Typography>
                                <Link to={`orders/123`}>View Order Details</Link>
                            </div>
                        </Box>
                    <Box className="order-products">
                        <Link to={`/`}>
                            <img 
                                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80" 
                                alt="image" 
                            />   
                        </Link>                      
                    </Box>
                </Box>
                })
            )}
        </Container>
    )
}

export default OrdersScreen
