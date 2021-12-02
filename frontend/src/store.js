import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productDetailReducer, productListReduer } from './reducers/productReducers';
 
 
// Reducers 
const reducer = combineReducers({
    productList: productListReduer,
    productDetail: productDetailReducer,
    cart: cartReducer,
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