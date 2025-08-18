'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRedditAuth } from '@/hooks/use-reddit'

export default function RedditCallbackPage() {
    const searchParams = useSearchParams()
    const { mutate: handleAuth, isPending, isError, error } = useRedditAuth()
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')

    useEffect(() => {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
            setStatus('error')
            // Send error message to parent window
            if (window.opener) {
                window.opener.postMessage({
                    type: 'REDDIT_AUTH_ERROR',
                    error: error
                }, '*')
            }
            // Close window after delay
            setTimeout(() => window.close(), 2000)
            return
        }

        if (code && state) {
            // Call backend to exchange code for tokens
            handleAuth(
                { code, state },
                {
                    onSuccess: () => {
                        setStatus('success')
                        // Send success message to parent window
                        if (window.opener) {
                            window.opener.postMessage({
                                type: 'REDDIT_AUTH_SUCCESS',
                                data: { success: true }
                            }, '*')
                        }
                        // Close window after delay
                        setTimeout(() => window.close(), 2000)
                    },
                    onError: (err: any) => {
                        setStatus('error')
                        const errorMessage = err.response?.data?.error || err.message || 'Failed to connect Reddit account'
                        console.error('Reddit auth error:', err)
                        // Send error message to parent window
                        if (window.opener) {
                            window.opener.postMessage({
                                type: 'REDDIT_AUTH_ERROR',
                                error: errorMessage
                            }, '*')
                        }
                        // Close window after delay
                        setTimeout(() => window.close(), 3000)
                    }
                }
            )
        }
    }, [searchParams, handleAuth])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
                {status === 'processing' && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔄</div>
                        <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>
                            Connecting Reddit Account...
                        </h1>
                        <p style={{ margin: 0, opacity: 0.8 }}>Please wait while we authenticate</p>
                        {isPending && (
                            <div style={{
                                marginTop: '1rem',
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                border: '3px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                borderTopColor: 'white',
                                animation: 'spin 1s ease-in-out infinite'
                            }} />
                        )}
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                        <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>
                            Reddit Connected Successfully!
                        </h1>
                        <p style={{ margin: 0, opacity: 0.8 }}>You can now close this window</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
                        <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>
                            Connection Failed
                        </h1>
                        <p style={{ margin: 0, opacity: 0.8 }}>
                            {error?.response?.data?.error || error?.message || searchParams.get('error') || 'Failed to connect Reddit account'}
                        </p>
                    </>
                )}
            </div>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}