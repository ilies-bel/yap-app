import {httpClient as apiClient} from '@/services/api/apiClient'

export interface RedditIntegration {
    id: string
    userEmail: string
    redditUsername: string | null
    accessToken: string
    refreshToken: string | null
    tokenExpiresAt: string | null
    createdAt: string
    updatedAt: string
}

export interface CaptureJob {
    id: string
    userEmail: string
    status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
    progress: {
        totalPosts: number
        processed: number
        createdTasks: number
        duplicatesSkipped: number
    }
    errorMessage?: string
}

export interface AuthUrlResponse {
    authorizationUrl: string
}

export const redditApi = {
    getAuthUrl: (): Promise<AuthUrlResponse> =>
        apiClient.get('/reddit/auth/url').then(res => res.data),

    handleCallback: (code: string, state: string): Promise<RedditIntegration> =>
        apiClient.post('/reddit/callback', { code, state }).then(res => res.data),

    getIntegration: (): Promise<RedditIntegration | null> =>
        apiClient.get('/reddit/integration')
            .then(res => res.data)
            .catch(err => {
                if (err.response?.status === 404) return null
                throw err
            }),

    deleteIntegration: (): Promise<void> =>
        apiClient.delete('/reddit/integration').then(() => {
        }),

    startCapture: (): Promise<CaptureJob> =>
        apiClient.post('/reddit/capture').then(res => res.data),
}