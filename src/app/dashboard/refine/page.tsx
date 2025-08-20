'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ArrowLeft, Sparkles, Filter, Tag, Calendar, Target} from "lucide-react"
import {useRouter} from "next/navigation"

export default function RefinePage() {
    const router = useRouter()
    
    const handleBackToInbox = () => {
        router.push('/dashboard/inbox')
    }
    
    return (
        <div className="p-6">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    className="mb-4"
                    onClick={handleBackToInbox}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Inbox
                </Button>
                <h1 className="text-2xl font-bold mb-2">Refine</h1>
                <p className="text-muted-foreground">Process and organize your captured tasks</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* AI Enhancement Card */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="h-5 w-5 text-yellow-500" />
                            AI Enhancement
                        </CardTitle>
                        <CardDescription>
                            Let AI improve task clarity and add context
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• Auto-generate task descriptions</p>
                            <p>• Extract action items from notes</p>
                            <p>• Suggest priority levels</p>
                            <p>• Add relevant tags automatically</p>
                        </div>
                        <Button className="w-full" disabled>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>

                {/* Batch Filtering Card */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Filter className="h-5 w-5 text-blue-500" />
                            Batch Filtering
                        </CardTitle>
                        <CardDescription>
                            Filter and organize multiple tasks at once
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• Remove duplicate tasks</p>
                            <p>• Filter by keywords or patterns</p>
                            <p>• Archive completed items</p>
                            <p>• Bulk delete irrelevant tasks</p>
                        </div>
                        <Button className="w-full" disabled>
                            <Filter className="h-4 w-4 mr-2" />
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>

                {/* Smart Tagging Card */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Tag className="h-5 w-5 text-purple-500" />
                            Smart Tagging
                        </CardTitle>
                        <CardDescription>
                            Automatically categorize and tag your tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• Auto-detect project context</p>
                            <p>• Apply tags based on content</p>
                            <p>• Create custom tag rules</p>
                            <p>• Bulk tag operations</p>
                        </div>
                        <Button className="w-full" disabled>
                            <Tag className="h-4 w-4 mr-2" />
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>

                {/* Schedule Planning Card */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Calendar className="h-5 w-5 text-green-500" />
                            Schedule Planning
                        </CardTitle>
                        <CardDescription>
                            Intelligently schedule tasks based on priorities
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• Time estimation for tasks</p>
                            <p>• Smart deadline suggestions</p>
                            <p>• Calendar integration</p>
                            <p>• Workload balancing</p>
                        </div>
                        <Button className="w-full" disabled>
                            <Calendar className="h-4 w-4 mr-2" />
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>

                {/* Goal Alignment Card */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Target className="h-5 w-5 text-red-500" />
                            Goal Alignment
                        </CardTitle>
                        <CardDescription>
                            Align tasks with your broader goals and objectives
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <p>• Link tasks to goals</p>
                            <p>• Track goal progress</p>
                            <p>• Identify missing tasks</p>
                            <p>• Priority rebalancing</p>
                        </div>
                        <Button className="w-full" disabled>
                            <Target className="h-4 w-4 mr-2" />
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
                <h2 className="text-lg font-semibold mb-2">About Refine</h2>
                <p className="text-sm text-muted-foreground">
                    The Refine page helps you process raw captured tasks into well-organized, actionable items. 
                    Use AI-powered tools to enhance descriptions, apply smart categorization, and align tasks 
                    with your goals. All features are designed to save time while improving task quality.
                </p>
            </div>
        </div>
    )
}