import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_URL,
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // Global content type header
    }
});

export default axiosInstance;
