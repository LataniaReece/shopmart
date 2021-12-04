import axios from 'axios'
import { 
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL } from './actionTypes/orderTypes'

export const getUserOrders = () => async (dispatch) => {
    try {

        dispatch({
            type: GET_USER_ORDERS_REQUEST
       })

    //    const { userLogin: { userInfo } } = getState()

       const config = {
            headers: {
                 'Content-Type': 'application/json',
                //  Authorization: `Bearer ${userInfo.token}`
                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE1NTQzZjg4OWE4Nzc2MWVhODdlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODU2ODQ1NSwiZXhwIjoxNjM4ODI3NjU1fQ.87MTscTbX484uXINKRCgYW9Tp1wpbCJIXFy4am0HpIk`
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

        //  const { userLogin: { userInfo } } = getState()

         const config = {
            headers: {
                'Content-Type': 'application/json',
               //  Authorization: `Bearer ${userInfo.token}`
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTE1NTQzZjg4OWE4Nzc2MWVhODdlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODU2ODQ1NSwiZXhwIjoxNjM4ODI3NjU1fQ.87MTscTbX484uXINKRCgYW9Tp1wpbCJIXFy4am0HpIk`
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