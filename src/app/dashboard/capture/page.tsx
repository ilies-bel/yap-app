'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ExternalLink, Download, Unlink, Bookmark, Camera, FileText, ChevronLeft, ChevronRight} from "lucide-react"
import {RedditIcon} from "@/components/icons/RedditIcon"
import {useRedditIntegration, useRedditAuthUrl, useDeleteRedditIntegration, useRedditCapture, useRedditCapturedTasks} from "@/hooks/use-reddit"
import {ExternalLink as ExternalLinkIcon, Clock, CheckCircle2, AlertCircle} from "lucide-react"
import {useState, useRef, useEffect} from "react"

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
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

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
    
    const captureCards = [
        {
            id: 'reddit',
            icon: <RedditIcon className="h-5 w-5 text-orange-500" />,
            title: 'Reddit Favorites',
            description: 'Import tasks from your favorited Reddit posts and comments',
            features: [
                '• Convert saved posts to actionable tasks',
                '• Extract key information automatically',
                '• Organize by subreddit context'
            ],
            content: (
                integrationLoading ? (
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
                )
            )
        },
        {
            id: 'browser',
            icon: <Bookmark className="h-5 w-5 text-blue-500" />,
            title: 'Browser Extension',
            description: 'Sync all your browser bookmarks directly as tasks',
            features: [
                '• One-click bookmark sync',
                '• Works with Chrome, Edge, and other browsers',
                '• Secure authentication with your account',
                '• Automatic bookmark organization'
            ],
            content: (
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
                    
                    <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border">
                        <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                            💡 Pro Tip
                        </div>
                        <p>
                            The extension runs entirely in your browser and only sends bookmark data to your YAP account. 
                            Your bookmarks are never stored elsewhere.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'screenshot',
            icon: <Camera className="h-5 w-5 text-purple-500" />,
            title: 'Screenshot Capture',
            description: 'Extract tasks and information from screenshots using AI',
            features: [
                '• Capture text from any screenshot',
                '• AI-powered text extraction',
                '• Convert visual content to actionable tasks',
                '• Support for multiple image formats'
            ],
            content: (
                <>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                Coming Soon
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            We're working on bringing you powerful screenshot capture capabilities. 
                            You'll be able to drag and drop screenshots or paste them directly to 
                            automatically extract tasks and information.
                        </p>
                    </div>
                    
                    <Button 
                        className="w-full" 
                        disabled
                        variant="outline"
                    >
                        <Camera className="h-4 w-4 mr-2" />
                        Available Soon
                    </Button>
                </>
            )
        },
        {
            id: 'notes',
            icon: <FileText className="h-5 w-5 text-green-500" />,
            title: 'Note Apps',
            description: 'Import tasks from your favorite note-taking applications',
            features: [
                '• Connect to Notion, Obsidian, or Apple Notes',
                '• Sync todos and checklists automatically',
                '• Preserve formatting and context',
                '• Two-way sync capabilities'
            ],
            content: (
                <>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                Coming Soon
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Integration with popular note-taking apps is on the way. 
                            You'll be able to seamlessly import tasks from Notion databases, 
                            Obsidian markdown files, and Apple Notes.
                        </p>
                    </div>
                    
                    <Button 
                        className="w-full" 
                        disabled
                        variant="outline"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Available Soon
                    </Button>
                </>
            )
        }
    ]
    
    const totalCards = captureCards.length
    
    const handlePrevious = () => {
        setCurrentCardIndex((prev) => Math.max(0, prev - 1))
    }
    
    const handleNext = () => {
        setCurrentCardIndex((prev) => Math.min(totalCards - 3, prev + 1))
    }
    
    useEffect(() => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.scrollWidth / totalCards
            carouselRef.current.scrollTo({
                left: cardWidth * currentCardIndex,
                behavior: 'smooth'
            })
        }
    }, [currentCardIndex, totalCards])
    
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Capture</h1>
                <p className="text-muted-foreground">Quick capture tools to add tasks from various sources</p>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-7xl mx-auto">
                {/* Navigation Buttons */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-12"
                    onClick={handlePrevious}
                    disabled={currentCardIndex === 0}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-12"
                    onClick={handleNext}
                    disabled={currentCardIndex >= totalCards - 3}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Carousel */}
                <div className="overflow-hidden">
                    <div 
                        ref={carouselRef}
                        className="flex gap-4 transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentCardIndex * (100 / 3)}%)`,
                        }}
                    >
                        {captureCards.map((card) => (
                            <div 
                                key={card.id}
                                className="w-1/3 flex-shrink-0"
                            >
                                <Card className="hover:shadow-md transition-shadow h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            {card.icon}
                                            {card.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {card.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-sm text-muted-foreground">
                                            {card.features.map((feature, idx) => (
                                                <p key={idx}>{feature}</p>
                                            ))}
                                        </div>
                                        {card.content}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: Math.max(1, totalCards - 2) }).map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full transition-colors ${
                                index === currentCardIndex 
                                    ? 'bg-primary' 
                                    : 'bg-muted-foreground/30'
                            }`}
                            onClick={() => setCurrentCardIndex(index)}
                        />
                    ))}
                </div>
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
                                                {task.status === 'DONE' && (
                                                    <span className="flex items-center gap-1 text-green-600">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        {task.status}
                                                    </span>
                                                )}
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