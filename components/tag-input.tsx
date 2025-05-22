"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagInput({ tags, onTagsChange, placeholder = "Add tags...", className }: TagInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag))
  }

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && tags.length > 0) {
            onTagsChange(tags.slice(0, -1))
          }
        }
        if (e.key === "Enter" && input.value !== "") {
          e.preventDefault()
          if (!tags.includes(input.value)) {
            onTagsChange([...tags, input.value])
          }
          setInputValue("")
        }
      }
    },
    [tags, onTagsChange]
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(tag)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(tag)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && inputValue.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              <CommandItem
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onSelect={() => {
                  if (!tags.includes(inputValue)) {
                    onTagsChange([...tags, inputValue])
                  }
                  setInputValue("")
                }}
                className={"cursor-pointer"}
              >
                Add "{inputValue}"
              </CommandItem>
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  )
} 