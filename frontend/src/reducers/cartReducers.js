import { 
    CART_ADD_ITEM, 
    GET_CART_INFO } from "../actions/actionTypes/cartTypes" 
 
export const cartReducer = (state = { cartItems: [], quantity: 0, total: 0}, action) => {
    switch (action.type) {
        case GET_CART_INFO:
            return{
                    cartItems: action.payload.cartItems,
                    quantity: action.payload.quantity,
                    total: action.payload.total
            }
        case CART_ADD_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                quantity: state.quantity += 1,
                total: state.total +=  action.payload.price * action.payload.quantity
            }
        default:
            return state
    }
}

