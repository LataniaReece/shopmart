import axios from 'axios';

let BASE_URL;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '';
}

const user = JSON.parse(localStorage.getItem('userInfo'));

const TOKEN = user?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
