"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BlobImageUpload } from "@/components/blob-image-upload"
import { Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectItemProps {
  form: UseFormReturn<any>
  index: number
  onRemove: () => void
  isLoading: boolean
}

export function ProjectItem({ form, index, onRemove, isLoading }: ProjectItemProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove project</span>
          </Button>

          <div className="grid gap-4 pt-4">
            <FormField
              control={form.control}
              name={`projects.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce Website" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`projects.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of the project"
                      {...field}
                      disabled={isLoading}
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`projects.${index}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <BlobImageUpload value={field.value} onChange={field.onChange} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={`projects.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.technologies`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, MongoDB"
                          value={field.value?.join(", ")}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(
                              value
                                .split(",")
                                .map((item) => item.trim())
                                .filter(Boolean),
                            )
                          }}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
