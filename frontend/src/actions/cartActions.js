import { 
    CART_ADD_ITEM, 
    GET_CART_INFO,
    CART_REMOVE_ITEM} from "./actionTypes/cartTypes"


export const addToCart = (cartItemData) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: cartItemData
    })
    localStorage.setItem('cart', JSON.stringify(getState().cart))
}

export const getCartInfo = () => async (dispatch, getState) => {
    const data = getState().cart

    dispatch({
        type: GET_CART_INFO,
        payload: data
    })
}

export const removeFromCart = (item) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: item,
    })
    localStorage.setItem('cart', JSON.stringify(getState().cart))

}