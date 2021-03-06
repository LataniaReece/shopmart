import { publicRequest } from '../requestMethods';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_STATS_FAIL,
  USER_STATS_REQUEST,
  USER_STATS_SUCCESS,
} from './actionTypes/userTypes';

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await publicRequest.post('/api/auth/register', {
      username,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await publicRequest.post('/api/auth/login', {
      username,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  window.location.reload();
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
};
