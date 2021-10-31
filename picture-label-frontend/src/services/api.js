import {DEV_BACKEND_URL} from "../config";
import axios from "axios";

const getUrl = endpoint => process.env.NODE_ENV === 'production' ?
  `/api${endpoint}` : `${DEV_BACKEND_URL}${endpoint}`;

export const get = endpoint => axios.get(getUrl(endpoint), {
  withCredentials: true
});

export const post = (endpoint, data = {}, options = {}) => axios.post(getUrl(endpoint), data, {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  ...options
});
