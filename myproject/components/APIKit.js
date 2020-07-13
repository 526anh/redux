/* eslint-disable prettier/prettier */
import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'http://192.168.1.13:3000/login',
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default APIKit;