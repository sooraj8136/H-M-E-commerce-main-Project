// import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
//     withCredentials: true,
// })

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL 

export const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`, // Ensure this matches your backend API structure
    withCredentials: true, // Enables cookies & authentication headers
});
