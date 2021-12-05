import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, userOrderListReducer } from './reducers/orderReducers';
import { productDetailReducer, productListReduer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';
 
 
// Reducers 
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userOrders: userOrderListReducer,
    productList: productListReduer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})

let cartFromStorage

if (localStorage.getItem('cart') !== "undefined" && localStorage.getItem('cart') !== null) {
    cartFromStorage = JSON.parse(localStorage.getItem('cart'))
} else {
    cartFromStorage = {
        cartItems: [],
        quantity: 0,
        total: 0
    }
}
 
const initialState = {
    cart: cartFromStorage
}
 
const middleware = [thunk];
 
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
 
export default store;