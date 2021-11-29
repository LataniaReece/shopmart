import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productDetailReducer, productListReduer } from './reducers/productReducers';
 
 
// Reducers 
const reducer = combineReducers({
    productList: productListReduer,
    productDetail: productDetailReducer
})
 
const initialState = {
 
}
 
const middleware = [thunk];
 
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
 
export default store;