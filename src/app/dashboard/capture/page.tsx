import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ExternalLink} from "lucide-react"
import {RedditIcon} from "@/components/icons/RedditIcon"

export default function CapturePage() {
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
                        <Button className="w-full" disabled>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Connect Reddit Account
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            Coming soon - No logic implemented yet
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}