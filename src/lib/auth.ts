import Cookies from 'js-cookie';
import {ACCESS_TOKEN, api} from "@/services/axiosClient.ts";


// Auth functions
export const authService = {
    // Register new user
    register: async (username, password) => {
        try {
            const response = await api.post('/auth/register', {username, password});
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Registration failed'};
        }
    },

    // Login user
    login: async (username, password) => {
        try {
            const response = await api.post('/auth/login', {username, password});
            const {token} = response.data;

            // Save token to cookies (adjust expiry as needed)
            Cookies.set(ACCESS_TOKEN, token, {expires: 7});

            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Login failed'};
        }
    },

    // Logout user
    logout: () => {
        Cookies.remove(ACCESS_TOKEN);
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!Cookies.get(ACCESS_TOKEN);
    },

    // Get current token
    getToken: () => {
        return Cookies.get(ACCESS_TOKEN);
    }
};