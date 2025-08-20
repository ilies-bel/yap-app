import React, { useState, useRef, useEffect } from 'react'
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Tag, 
  useTags, 
  useCreateTag, 
  CreateTagRequest 
} from '@/services/api/tags/tagService'
import { TagPill } from './TagPill'

interface TagSelectorProps {
  selectedTags: Tag[]
  onTagsChange: (tags: Tag[]) => void
  placeholder?: string
  className?: string
}

export function TagSelector({ 
  selectedTags, 
  onTagsChange, 
  placeholder = "Select tags...",
  className 
}: TagSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [newTagColor, setNewTagColor] = useState('#808080')

  const { data: tagsPage } = useTags({ search: searchValue, size: 50 })
  const createTagMutation = useCreateTag()

  const availableTags = tagsPage?.content || []
  const selectedTagIds = new Set(selectedTags.map(tag => tag.id))

  const handleTagToggle = (tag: Tag) => {
    if (selectedTagIds.has(tag.id)) {
      // Remove tag
      onTagsChange(selectedTags.filter(t => t.id !== tag.id))
    } else {
      // Add tag
      onTagsChange([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tagId: number) => {
    onTagsChange(selectedTags.filter(t => t.id !== tagId))
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return

    try {
      const newTag = await createTagMutation.mutateAsync({
        name: newTagName.trim(),
        color: newTagColor
      })
      
      // Add the new tag to selected tags
      onTagsChange([...selectedTags, newTag])
      
      // Reset form
      setNewTagName('')
      setNewTagColor('#808080')
      setShowCreateForm(false)
      setSearchValue('')
    } catch (error) {
      console.error('Failed to create tag:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (showCreateForm) {
        handleCreateTag()
      } else if (searchValue && !availableTags.some(tag => 
        tag.name.toLowerCase() === searchValue.toLowerCase()
      )) {
        setNewTagName(searchValue)
        setShowCreateForm(true)
      }
    } else if (e.key === 'Escape') {
      setShowCreateForm(false)
      setNewTagName('')
    }
  }

  const filteredTags = availableTags.filter(tag => 
    !selectedTagIds.has(tag.id) &&
    tag.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const shouldShowCreateOption = searchValue && 
    !availableTags.some(tag => tag.name.toLowerCase() === searchValue.toLowerCase()) &&
    !showCreateForm

  return (
    <div className={cn("space-y-2", className)}>
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <TagPill
              key={tag.id}
              tag={tag}
              showRemove
              onRemove={handleRemoveTag}
              size="sm"
            />
          ))}
        </div>
      )}

      {/* Tag Selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {selectedTags.length > 0 
                ? `${selectedTags.length} tag${selectedTags.length === 1 ? '' : 's'} selected`
                : placeholder
              }
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command onKeyDown={handleKeyDown}>
            <CommandInput
              placeholder="Search or create tags..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <div className="max-h-64 overflow-y-auto">
              {!showCreateForm && (
                <>
                  <CommandEmpty>
                    {searchValue ? "No tags found." : "Start typing to search tags"}
                  </CommandEmpty>
                  
                  {filteredTags.length > 0 && (
                    <CommandGroup heading="Available Tags">
                      {filteredTags.map((tag) => (
                        <CommandItem
                          key={tag.id}
                          onSelect={() => handleTagToggle(tag)}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: tag.color }}
                            />
                            <span>{tag.name}</span>
                            {tag.usageCount > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {tag.usageCount}
                              </Badge>
                            )}
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedTagIds.has(tag.id) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {shouldShowCreateOption && (
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setNewTagName(searchValue)
                          setShowCreateForm(true)
                        }}
                        className="flex items-center space-x-2 text-primary"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Create "{searchValue}"</span>
                      </CommandItem>
                    </CommandGroup>
                  )}
                </>
              )}

              {showCreateForm && (
                <div className="p-3 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Create New Tag</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowCreateForm(false)
                        setNewTagName('')
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="tag-name" className="text-xs">Name</Label>
                      <Input
                        id="tag-name"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="Tag name"
                        maxLength={50}
                        className="h-8"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tag-color" className="text-xs">Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="tag-color"
                          type="color"
                          value={newTagColor}
                          onChange={(e) => setNewTagColor(e.target.value)}
                          className="w-8 h-8 border rounded cursor-pointer"
                        />
                        <Input
                          value={newTagColor}
                          onChange={(e) => setNewTagColor(e.target.value)}
                          className="h-8 font-mono text-xs"
                          maxLength={7}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCreateTag}
                      disabled={!newTagName.trim() || createTagMutation.isPending}
                      size="sm"
                      className="flex-1"
                    >
                      {createTagMutation.isPending ? 'Creating...' : 'Create Tag'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}