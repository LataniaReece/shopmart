import axios from 'axios'
import { 
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL} from './actionTypes/orderTypes'

export const getUserOrders = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: GET_USER_ORDERS_REQUEST
       })

       const { userLogin: { userInfo } } = getState()
       console.log(userInfo)

       const config = {
            headers: {
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${userInfo.token}`
            },
       }

        const {data} = await axios.get(`/api/users/orders`, config);

        dispatch({
            type: GET_USER_ORDERS_SUCCESS,
            payload: data
        })
     
    } catch (error) {
        dispatch({
            type: GET_USER_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createOrder = (orderInfo) => async (dispatch, getState) => {
    try {
         dispatch({
              type: ORDER_CREATE_REQUEST
         })

         const { userLogin: { userInfo } } = getState()

         const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
           },
         }

         const { data } = await axios.post(
              `/api/orders`,
              orderInfo,
              config
         )

         dispatch({
              type: ORDER_CREATE_SUCCESS,
              payload: data
         })

    } catch (error) {
         dispatch({
              type: ORDER_CREATE_FAIL,
              payload: error.response && error.response.data.message
                   ? error.response.data.message
                   : error.message
         })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
     try {
          dispatch({
               type: ORDER_DETAILS_REQUEST
          })

          const { userLogin: { userInfo } } = getState()

          const config = {
               headers: {
                    Authorization: `Bearer ${userInfo.token}`
               },
          }

          const { data } = await axios.get(
               `/api/orders/${id}`,
               config
          )

          dispatch({
               type: ORDER_DETAILS_SUCCESS,
               payload: data
          })

     } catch (error) {
          dispatch({
               type: ORDER_DETAILS_FAIL,
               payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
          })
     }
}