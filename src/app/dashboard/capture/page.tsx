'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ExternalLink, Download, Unlink, Bookmark} from "lucide-react"
import {RedditIcon} from "@/components/icons/RedditIcon"
import {useRedditIntegration, useRedditAuthUrl, useDeleteRedditIntegration, useRedditCapture, useRedditCapturedTasks} from "@/hooks/use-reddit"
import {ExternalLink as ExternalLinkIcon, Clock, CheckCircle2, AlertCircle} from "lucide-react"

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
    const { refetch: getAuthUrl } = useRedditAuthUrl()
    const deleteIntegration = useDeleteRedditIntegration()
    const captureReddit = useRedditCapture()
    const { data: capturedTasks, isLoading: tasksLoading } = useRedditCapturedTasks()

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
                {/* Reddit Favorites Card */}
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

                {/* Browser Favorites Card */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Bookmark className="h-5 w-5 text-blue-500" />
                            Browser Extension
                        </CardTitle>
                        <CardDescription>
                            Sync all your browser bookmarks directly as tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• One-click bookmark sync</p>
                            <p>• Works with Chrome, Edge, and other browsers</p>
                            <p>• Secure authentication with your account</p>
                            <p>• Automatic bookmark organization</p>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="text-sm font-medium mb-2">How to install:</h4>
                                <ol className="text-xs text-muted-foreground space-y-1 ml-3">
                                    <li>1. Download the YAP Browser Extension</li>
                                    <li>2. Install from Chrome Web Store (coming soon) or load unpacked</li>
                                    <li>3. Click the extension icon in your browser</li>
                                    <li>4. Sign in with your YAP account</li>
                                    <li>5. Click "Sync Bookmarks" to import all at once</li>
                                </ol>
                            </div>
                            
                            <Button 
                                className="w-full" 
                                onClick={() => alert('Extension download will be available soon! For now, build from source in the yap-browser-extension directory.')}
                                variant="default"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download Extension
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                className="w-full" 
                                onClick={() => alert('For now: 1) cd yap-browser-extension 2) npm run build 3) Load unpacked extension from build/chrome-mv3-prod')}
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Installation Guide
                            </Button>
                        </div>
                        
                        <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border">
                            <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                                💡 Pro Tip
                            </div>
                            <p>
                                The extension runs entirely in your browser and only sends bookmark data to your YAP account. 
                                Your bookmarks are never stored elsewhere.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Captured Reddit Tasks */}
            {isConnected && capturedTasks && capturedTasks.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Captured Reddit Posts</h2>
                    <div className="space-y-3">
                        {capturedTasks.map((task) => (
                            <Card key={task.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-base mb-1 line-clamp-2">
                                                {task.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(task.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className={`flex items-center gap-1 ${
                                                    task.status === 'CAPTURED' ? 'text-blue-600' :
                                                    task.status === 'DONE' ? 'text-green-600' :
                                                    'text-gray-600'
                                                }`}>
                                                    {task.status === 'DONE' ? (
                                                        <CheckCircle2 className="h-3 w-3" />
                                                    ) : (
                                                        <AlertCircle className="h-3 w-3" />
                                                    )}
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {task.url && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(task.url, '_blank')}
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    <ExternalLinkIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {task.sourceUrl && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(task.sourceUrl, '_blank')}
                                                    className="text-orange-500 hover:text-orange-600"
                                                >
                                                    <RedditIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {tasksLoading && (
                        <div className="text-center py-4 text-muted-foreground">
                            Loading captured tasks...
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}