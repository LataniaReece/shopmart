import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Container, Box, Button, Grid, Card, CardMedia} from '@mui/material'
import { getCartInfo } from '../actions/cartActions'
import Spinner from '../components/Spinner'

const CartScreen = () => {
    const [isLoading, setIsLoading ] = useState(true)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    let { cartInfo } = cart

    useEffect(() => {
        if(!cartInfo){
            dispatch(getCartInfo())
        }else{
            setIsLoading(false)
        }
    }, [cartInfo])
    
    return (
        <Container sx={{mt: 3, minHeight: '70vh'}}>
            {isLoading && <Spinner />}
            {cartInfo && (
                <>
                <Typography variant="h4" align="center" sx={{my: 3}}>Shopping Cart</Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                    <Button variant="outlined">Continue Shopping</Button>
                    <Typography variant="p" sx={{textDecoration: 'underline', alignSelf: 'center'}}>Cart Items ({cartInfo.quantity})</Typography>
                    <Button variant="outlined">Checkout</Button>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                       {cartInfo.cartItems.map(item => {
                           return  <Card className="cart-item">
                           <Link to={`/products/${item._id}`}>
                               <CardMedia
                               component="img"
                               sx={{ width: 151 }}
                               image={item.image}
                               alt={item.title}
                               />
                           </Link>
                                <div className="info">
                                    <div>
                                        <Typography component="p" variant="p"><span>Name: </span><Link to={`/products/${item._id}`}>{item.title.toUpperCase()}</Link></Typography>
                                        <Typography component="p" variant="p"><span>Size: </span>{item.size.toUpperCase()}</Typography>
                                        <button className="color" style={{backgroundColor: item.color}}></button>
                                    </div>
                                    <div>
                                        <Typography component="p" variant="p" sx={{fontSize: 18}}>{item.price}</Typography>
                                        <Typography component="p" variant="p" sx={{fontSize: 18}}><span>Qty: </span>{item.quantity}</Typography>
                                    </div>
                            </div>
                            </Card>
                       })}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={{borderRadius: '10%', border: '2px solid #C8C8C8', padding: '2rem'}}>
                            <Typography variant="h5" align="center" sx={{mb: 4}}>Order Summary</Typography>
                            <div className="order-summary-detail" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem'}}>
                                <Typography variant="p">Subtotal</Typography>
                                <Typography variant="p">${cartInfo.total}</Typography>
                            </div>
                            <div className="order-summary-detail" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem'}}>
                                <Typography variant="p">Subtotal</Typography>
                                <Typography variant="p">$50</Typography>
                            </div>
                            <div className="order-summary-detail" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem'}}>
                                <Typography variant="p">Subtotal</Typography>
                                <Typography variant="p">$50</Typography>
                            </div>
                            <div className="order-summary-detail" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem'}}>
                                <Typography variant="p">Total</Typography>
                                <Typography variant="p">${cartInfo.total}</Typography>
                            </div>
                            <Button variant="contained" color="secondary" sx={{display: 'inline-block', width: '100%'}}>Checkout Now</Button>
                        </Box>
                    </Grid>
                </Grid>
                </>
            )}            
        </Container>
    )
}

export default CartScreen
