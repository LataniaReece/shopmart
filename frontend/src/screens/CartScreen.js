import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Container, Box, Button, Grid, Card, CardMedia} from '@mui/material'
import StripeCheckout from 'react-stripe-checkout'
import { getCartInfo } from '../actions/cartActions'
import Spinner from '../components/Spinner'

const KEY = process.env.REACT_APP_STRIPE


const CartScreen = () => {
    const [isLoading, setIsLoading ] = useState(true)
    const [stripeToken, setStripeToken] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        if(!cart){
            dispatch(getCartInfo())
        }else{
            setIsLoading(false)
        }
    }, [cart])

      const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async (cartTotal) => {
            try {
                const res = await axios.post(`/api/checkout/payment`, 
                    {tokenId: stripeToken.id, amount: cartTotal}, 
                    {headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE1NTQzZjg4OWE4Nzc2MWVhODdlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODQ5NDI5NSwiZXhwIjoxNjM4NzUzNDk1fQ.KbO-WPyUGOTa_ePyiDUSQ9MDTom6RLKSgaYx-eMEALk'
                        }
                    }
                );
                // console.log(res.data)
                navigate("/success", {
                    state: {
                        paymentInfo: res.data
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest(cart.total)
    }, [stripeToken, cart])

  
    
    // console.log(stripeToken)
    return (
        <Container sx={{mt: 3, minHeight: '70vh'}}>
            {isLoading && <Spinner />}
            {cart && (
                <>
                <Typography variant="h4" align="center" sx={{my: 3}}>Shopping Cart</Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                    <Button variant="outlined">Continue Shopping</Button>
                    <Typography variant="p" sx={{textDecoration: 'underline', alignSelf: 'center'}}>Cart Items ({cart.quantity})</Typography>
                    <Button variant="outlined">Checkout</Button>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                       {cart.cartItems.map((item, index) => {
                           return  <Card className="cart-item" key={`${item._id}_${index}`}>
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
                                    <Typography component="p" variant="p" sx={{fontSize: 18}}><span>Qty: </span>{item.quantity}</Typography>
                                    <Typography component="p" variant="p" sx={{fontSize: 18}}>${item.price * item.quantity}</Typography>
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
                                <Typography variant="p">${cart.total}</Typography>
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
                                <Typography variant="p">${cart.total}</Typography>
                            </div>
                            <StripeCheckout
                            name="ShopMart"
                            image="https://cdn.pixabay.com/photo/2016/12/07/15/15/lotus-with-hands-1889661_960_720.png"
                            billingAddress
                            shippingAddress
                            description = {`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button variant="contained" color="secondary" sx={{display: 'inline-block', width: '100%'}}>Checkout Now</Button>
                        </StripeCheckout>
                        </Box>
                    </Grid>
                </Grid>
                </>
            )}            
        </Container>
    )
}

export default CartScreen
