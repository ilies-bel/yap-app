import React from 'react'
import { X, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tag } from '@/services/api/tags/tagService'

interface TagPillProps {
  tag: Tag
  showRemove?: boolean
  onRemove?: (tagId: number) => void
  onClick?: (tag: Tag) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
}

export function TagPill({
  tag,
  showRemove = false,
  onRemove,
  onClick,
  size = 'md',
  variant = 'default',
  className
}: TagPillProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  const variantClasses = {
    default: 'text-white shadow-sm',
    outline: 'border-2 bg-background text-foreground shadow-sm',
    ghost: 'bg-background/10 text-foreground'
  }

  const handleClick = (e: React.MouseEvent) => {
    if (showRemove) return // Don't trigger onClick when showing remove button
    e.preventDefault()
    e.stopPropagation()
    onClick?.(tag)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove?.(tag.id!)
  }

  const getContrastText = (backgroundColor: string) => {
    // Simple contrast calculation
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return brightness > 155 ? '#000000' : '#FFFFFF'
  }

  const backgroundColor = variant === 'default' ? tag.color : 'transparent'
  const textColor = variant === 'default' ? getContrastText(tag.color) : undefined
  const borderColor = variant === 'outline' ? tag.color : undefined

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-colors cursor-pointer hover:opacity-80',
        sizeClasses[size],
        variant !== 'default' && variantClasses[variant],
        onClick && 'hover:scale-105',
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
        borderColor
      }}
      onClick={handleClick}
      title={tag.description || tag.name}
    >
      <Hash size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} />
      <span className="truncate max-w-[120px]">{tag.name}</span>
      {tag.usageCount > 0 && (
        <span className="opacity-70 text-xs">
          {tag.usageCount}
        </span>
      )}
      {showRemove && (
        <button
          onClick={handleRemove}
          className={cn(
            'ml-1 hover:bg-black/20 rounded-full p-0.5 transition-colors',
            size === 'sm' && 'p-0'
          )}
          title="Remove tag"
        >
          <X size={size === 'sm' ? 8 : size === 'md' ? 10 : 12} />
        </button>
      )}
    </span>
  )
}

interface TagListProps {
  tags: Tag[]
  showRemove?: boolean
  onRemove?: (tagId: number) => void
  onTagClick?: (tag: Tag) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  maxTags?: number
  className?: string
}

export function TagList({
  tags,
  showRemove = false,
  onRemove,
  onTagClick,
  size = 'md',
  variant = 'default',
  maxTags,
  className
}: TagListProps) {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags
  const remainingCount = maxTags && tags.length > maxTags ? tags.length - maxTags : 0

  if (tags.length === 0) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {displayTags.map((tag) => (
        <TagPill
          key={tag.id}
          tag={tag}
          showRemove={showRemove}
          onRemove={onRemove}
          onClick={onTagClick}
          size={size}
          variant={variant}
        />
      ))}
      {remainingCount > 0 && (
        <span className={cn(
          'inline-flex items-center rounded-full bg-muted text-muted-foreground font-medium',
          sizeClasses[size]
        )}>
          +{remainingCount}
        </span>
      )}
    </div>
  )
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
}