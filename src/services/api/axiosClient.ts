import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
export const ACCESS_TOKEN = 'access_token';

// Configure axios instance
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
