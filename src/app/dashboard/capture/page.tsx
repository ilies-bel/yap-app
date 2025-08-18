'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ExternalLink, Download, Unlink} from "lucide-react"
import {RedditIcon} from "@/components/icons/RedditIcon"
import {useRedditIntegration, useRedditAuthUrl, useDeleteRedditIntegration, useRedditCapture} from "@/hooks/use-reddit"

// Simple toast replacement
const toast = {
    success: (message: string) => {
        console.log('✅ Success:', message)
        alert(message) // Temporary fallback
    },
    error: (message: string) => {
        console.error('❌ Error:', message)
        alert(message) // Temporary fallback
    }
}

export default function CapturePage() {
    const { data: integration, isLoading: integrationLoading, refetch } = useRedditIntegration()
    const { data: authUrl, refetch: getAuthUrl } = useRedditAuthUrl()
    const deleteIntegration = useDeleteRedditIntegration()
    const captureReddit = useRedditCapture()

    const handleConnectReddit = async () => {
        try {
            const result = await getAuthUrl()
            if (result.data?.authorizationUrl) {
                // Open Reddit OAuth in new window
                const popup = window.open(result.data.authorizationUrl, 'reddit-oauth', 'width=600,height=700,scrollbars=yes,resizable=yes')
                
                // Listen for messages from the popup
                const handleMessage = (event: MessageEvent) => {
                    // Verify origin for security (in production, be more specific)
                    if (event.origin !== window.location.origin) return
                    
                    if (event.data.type === 'REDDIT_AUTH_SUCCESS') {
                        // Success! Refresh the integration data
                        refetch()
                        toast.success('Reddit account connected successfully!')
                        window.removeEventListener('message', handleMessage)
                    } else if (event.data.type === 'REDDIT_AUTH_ERROR') {
                        toast.error('Failed to connect Reddit account: ' + event.data.error)
                        window.removeEventListener('message', handleMessage)
                    }
                }
                
                window.addEventListener('message', handleMessage)
                
                // Clean up listener if popup is closed manually
                const checkClosed = setInterval(() => {
                    if (popup?.closed) {
                        window.removeEventListener('message', handleMessage)
                        clearInterval(checkClosed)
                    }
                }, 1000)
            }
        } catch (error) {
            toast.error('Failed to get Reddit authorization URL')
        }
    }

    const handleDisconnectReddit = () => {
        deleteIntegration.mutate()
    }

    const handleCaptureReddit = () => {
        captureReddit.mutate()
    }

    const isConnected = !!integration
    
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Capture</h1>
                <p className="text-muted-foreground">Quick capture tools to add tasks from various sources</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <RedditIcon className="h-5 w-5 text-orange-500" />
                            Reddit Favorites
                        </CardTitle>
                        <CardDescription>
                            Import tasks from your favorited Reddit posts and comments
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• Convert saved posts to actionable tasks</p>
                            <p>• Extract key information automatically</p>
                            <p>• Organize by subreddit context</p>
                        </div>
                        
                        {integrationLoading ? (
                            <Button className="w-full" disabled>
                                Loading...
                            </Button>
                        ) : isConnected ? (
                            <div className="space-y-2">
                                <div className="text-xs text-green-600 text-center font-medium">
                                    ✓ Reddit account connected
                                </div>
                                <Button 
                                    className="w-full" 
                                    onClick={handleCaptureReddit}
                                    disabled={captureReddit.isPending}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    {captureReddit.isPending ? 'Capturing...' : 'Capture Saved Posts'}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full" 
                                    onClick={handleDisconnectReddit}
                                    disabled={deleteIntegration.isPending}
                                >
                                    <Unlink className="h-3 w-3 mr-2" />
                                    Disconnect
                                </Button>
                            </div>
                        ) : (
                            <Button className="w-full" onClick={handleConnectReddit}>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Connect Reddit Account
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}