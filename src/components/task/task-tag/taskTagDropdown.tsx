"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {ChevronDown, Plus, Tag as TagIcon, X} from "lucide-react"
import {Task} from "@/services/api/task/taskService"
import {useTags, useAssignTagsToTask, useRemoveTagsFromTask, useCreateTag, Tag} from "@/services/api/tags/tagService"
import {TagPill} from "@/components/tag/TagPill"
import React, {useState} from "react"
import {Input} from "@/components/ui/input"

interface TaskTagDropdownProps {
    task: Task
}

export function TaskTagDropdown({task}: TaskTagDropdownProps) {
    const {data: tagsPage} = useTags({size: 50}) // Get more tags for selection
    const assignTags = useAssignTagsToTask()
    const removeTags = useRemoveTagsFromTask()
    const createTag = useCreateTag()
    const [isOpen, setIsOpen] = useState(false)
    const [isCreatingTag, setIsCreatingTag] = useState(false)
    const [newTagName, setNewTagName] = useState('')
    const [newTagColor, setNewTagColor] = useState('#808080')

    const availableTags = tagsPage?.content ?? []
    const taskTags = task.tags ?? []
    const taskTagIds = taskTags.map(tag => tag.id)

    const handleAddTag = (tag: Tag) => {
        if (!taskTagIds.includes(tag.id)) {
            assignTags.mutate({
                taskId: task.id,
                tagIds: [tag.id]  // Only send the new tag ID to add
            }, {
                onError: (error) => {
                    console.error('Failed to add tag:', error)
                },
                onSuccess: () => {
                    console.log('Tag added successfully')
                }
            })
        }
        setIsOpen(false)
    }

    const handleRemoveTag = (tagId: number) => {
        removeTags.mutate({
            taskId: task.id,
            tagIds: [tagId]
        }, {
            onError: (error) => {
                console.error('Failed to remove tag:', error)
            },
            onSuccess: () => {
                console.log('Tag removed successfully')
            }
        })
    }

    const handleCreateAndAssignTag = () => {
        if (newTagName.trim()) {
            createTag.mutate({
                name: newTagName.trim(),
                color: newTagColor
            }, {
                onSuccess: (newTag) => {
                    // Immediately assign the new tag to the task
                    assignTags.mutate({
                        taskId: task.id,
                        tagIds: [newTag.id]
                    })
                    setNewTagName('')
                    setIsCreatingTag(false)
                },
                onError: (error) => {
                    console.error('Failed to create tag:', error)
                }
            })
        }
    }

    const getRandomColor = () => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFA07A', '#DDA0DD', '#98D8C8', '#F7DC6F']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click when clicking dropdown
    }

    const unassignedTags = availableTags.filter(tag => !taskTagIds.includes(tag.id))

    return (
        <div onClick={handleClick}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 px-2 text-left justify-start max-w-32">
                        {taskTags.length > 0 ? (
                            <div className="flex items-center space-x-1 overflow-hidden">
                                <div className="flex space-x-1 overflow-hidden">
                                    {taskTags.slice(0, 2).map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs"
                                            style={{
                                                backgroundColor: tag.color + '20',
                                                borderColor: tag.color,
                                                color: tag.color
                                            }}
                                        >
                                            <TagIcon size={10} />
                                            <span className="truncate max-w-16">{tag.name}</span>
                                        </div>
                                    ))}
                                    {taskTags.length > 2 && (
                                        <span className="text-xs text-muted-foreground">
                                            +{taskTags.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <TagIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">No tags</span>
                            </div>
                        )}
                        <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 max-h-80 overflow-y-auto" onInteractOutside={(e) => {
                    if (isCreatingTag) {
                        e.preventDefault()
                    }
                }}>
                    {/* Current tags */}
                    {taskTags.length > 0 && (
                        <>
                            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                                Current Tags
                            </div>
                            {taskTags.map((tag) => (
                                <DropdownMenuItem
                                    key={tag.id}
                                    className="flex items-center justify-between"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        <span>{tag.name}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 hover:bg-destructive/20"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveTag(tag.id)
                                        }}
                                    >
                                        <X size={12} />
                                    </Button>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {/* Available tags to add */}
                    {unassignedTags.length > 0 ? (
                        <>
                            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                                Add Tags
                            </div>
                            {unassignedTags.slice(0, 10).map((tag) => (
                                <DropdownMenuItem
                                    key={tag.id}
                                    onClick={() => handleAddTag(tag)}
                                    className="flex items-center space-x-2"
                                >
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: tag.color }}
                                    />
                                    <span>{tag.name}</span>
                                    <Plus size={12} className="ml-auto text-muted-foreground" />
                                </DropdownMenuItem>
                            ))}
                            {unassignedTags.length > 10 && (
                                <div className="px-2 py-1 text-xs text-muted-foreground">
                                    +{unassignedTags.length - 10} more available
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                            All available tags are already assigned
                        </div>
                    )}

                    <DropdownMenuSeparator />

                    {/* Create new tag section */}
                    {!isCreatingTag ? (
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault()
                                setIsCreatingTag(true)
                                setNewTagColor(getRandomColor())
                            }}
                            className="flex items-center space-x-2 text-primary"
                        >
                            <Plus size={16} />
                            <span>Create new tag</span>
                        </DropdownMenuItem>
                    ) : (
                        <div className="p-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setNewTagColor(getRandomColor())}
                                    className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                                    style={{ backgroundColor: newTagColor }}
                                    title="Click to change color"
                                />
                                <Input
                                    placeholder="Tag name"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCreateAndAssignTag()
                                        } else if (e.key === 'Escape') {
                                            setIsCreatingTag(false)
                                            setNewTagName('')
                                        }
                                    }}
                                    className="flex-1 h-8"
                                    autoFocus
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    onClick={handleCreateAndAssignTag}
                                    disabled={!newTagName.trim() || createTag.isPending}
                                    className="flex-1 h-7"
                                >
                                    {createTag.isPending ? 'Creating...' : 'Create'}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreatingTag(false)
                                        setNewTagName('')
                                    }}
                                    className="flex-1 h-7"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}