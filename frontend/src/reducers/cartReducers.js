import { CART_ADD_ITEM } from "../actions/actionTypes/cartTypes" 
 
export const cartReducer = (state = { cartItems: [], quantity: 0, total: 0}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.productId === item.productId)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.productId === existItem.productId ? item : x),
                    quantity: state.quantity += 1,
                    total: state.total +=  action.payload.price * action.payload.quantity
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    quantity: state.quantity += 1,
                    total: state.total +=  action.payload.price * action.payload.quantity
                }
        }
        default:
            return state
    }
}
