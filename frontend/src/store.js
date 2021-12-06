import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, userOrderListReducer } from './reducers/orderReducers';
import { productDetailReducer, productListReduer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
 
 
// Reducers 
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userOrders: userOrderListReducer,
    productList: productListReduer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})

let cartFromStorage
let userInfoFromStorage

if (localStorage.getItem('cart') !== "undefined" && localStorage.getItem('cart') !== null) {
    cartFromStorage = JSON.parse(localStorage.getItem('cart'))
} else {
    cartFromStorage = {
        cartItems: [],
        quantity: 0,
        total: 0
    }
}

if (localStorage.getItem('userInfo') !== "undefined" && localStorage.getItem('userInfo') !== null) {
    userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
} else {
    userInfoFromStorage = null
}
 
const initialState = {
    cart: cartFromStorage,
    userLogin: { userInfo: userInfoFromStorage },
}
 
const middleware = [thunk];
 
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
 
export default store;