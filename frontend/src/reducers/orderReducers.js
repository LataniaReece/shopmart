import { 
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL, 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS} from '../actions/actionTypes/orderTypes'
 
 
export const userOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_USER_ORDERS_REQUEST:
            return { loading: true, orders: [] }
        case GET_USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case GET_USER_ORDERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

