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
 
const initialState = {
    cart: {
        cartItems: [],
        quantity: 0,
        total: 0
    }
}
 
const middleware = [thunk];
 
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
 
export default store;