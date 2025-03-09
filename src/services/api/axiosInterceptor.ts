import axios from "axios";
import {tokenService} from "@/services/api/tokenService";
import qs from "qs";
import {deviceService} from "@/services/device/deviceService";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params: unknown) =>
        qs.stringify(params, {arrayFormat: "repeat"}),
});

export async function refreshTokenFromApi() {
    const response = await axios.post(`/auth/refresh`, {}, {
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`
        }
    });

    return response.data;
}

// Refresh token function
async function refreshToken(): Promise<string> {
    if (!tokenService.isTokenValid()) {
        throw new Error('No token available');
    }

    try {
        const {accessToken, expiresIn} = await refreshTokenFromApi();
        tokenService.setToken(accessToken, expiresIn);

        return accessToken;
    } catch (error) {
        tokenService.removeToken();
        throw error;
    }
}

function isRefreshEndpoint(url: string) {
    return url == "/auth/refresh";
}


axiosClient.interceptors.request.use(async (config) => {

    if (config.url && isRefreshEndpoint(config.url)) {
        return config;
    }

    if (!tokenService.isTokenValid()) {
        return config
    }

    if (tokenService.isTokenExpiringSoon()) {
        const newToken = await refreshToken()
        config.headers.Authorization = `Bearer ${newToken}`;

        return config
    }

    config.headers.Authorization = `Bearer ${tokenService.getToken()}`;
    config.headers["X-Device"] = `${deviceService.getDeviceId()}`;
    return config;
});
