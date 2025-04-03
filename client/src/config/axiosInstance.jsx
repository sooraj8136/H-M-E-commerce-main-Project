// import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
//     withCredentials: true,
// }) 



import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,  // Uses environment variable
    withCredentials: true,  // Ensures cookies are sent if needed
});

// ✅ Add an interceptor to include the Authorization token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");  // Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
