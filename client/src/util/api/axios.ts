import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies if needed
});

export default instance;
