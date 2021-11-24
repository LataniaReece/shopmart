import axios from 'axios'
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "./actionTypes/productTypes"
 
 
export const getProducts = (category = '', sort, filters) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
 
 
        const { data } = await axios.get(`/api/products?category=${category}`)
 
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
