import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';

const KEY = "pk_test_51JvspODSlyg5xMKfE8nRnKefK2Y8joDxY3XEQyY76u1HDLaz8wN5ODtdhQrePBZfFmZQF2iZxxCvqFgbUwAHZ2Al00q3ZzRMH1"
 
const Pay = ({history}) => {
    const [stripeToken, setStripeToken] = useState(null);

    const navigate = useNavigate()

    const onToken = (token) =>{
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/checkout/payment', 
                    {tokenId: stripeToken.id, amount: 2000}, 
                    {headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE1NTQzZjg4OWE4Nzc2MWVhODdlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODQ5NDI5NSwiZXhwIjoxNjM4NzUzNDk1fQ.KbO-WPyUGOTa_ePyiDUSQ9MDTom6RLKSgaYx-eMEALk'
                        }
                    }
                );
                console.log(res.data)
                // navigate("/success")
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, navigate])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
        {stripeToken ? <span>Processing. Please wait...</span> : (
            <StripeCheckout
                name="ShopMart"
                image="https://cdn.pixabay.com/photo/2016/12/07/15/15/lotus-with-hands-1889661_960_720.png"
                billingAddress
                shippingAddress
                description = "Your total is $20"
                amount={2000}
                token={onToken}
                stripeKey={KEY}
            >
                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}
                >
                    Pay Now
                </button>
            </StripeCheckout>
        )}
        </div>
    )
}

export default Pay
