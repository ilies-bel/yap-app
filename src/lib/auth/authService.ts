import {tokenService} from "@/services/api/tokenService";
import {axiosClient} from "@/services/api/axiosInterceptor";


// Auth functions
export const authService = {
    // Register new user
    register: async (email: string, password: string) => {
        try {
            const response = await axiosClient.post('/auth/register', {email, password});
            return response.data;
        } catch (error) {
            // @ts-expect-error dkdkdk
            throw error.response?.data || {message: 'Registration failed'};
        }
    },

    // Login user
    login: async (email: string, password: string) => {
        try {
            const response = await axiosClient.post('/auth/login', {email, password});
            const {token, expiresIn} = response.data;

            tokenService.setToken(token, expiresIn)
            return response.data;
        } catch (error) {
            // @ts-expect-error dkdkdk

            throw error.response?.data || {message: 'Login failed'};
        }
    },

    logout: () => {
        tokenService.removeToken()
    },

    isAuthenticated: () => {
        return tokenService.isTokenValid()
    },
};