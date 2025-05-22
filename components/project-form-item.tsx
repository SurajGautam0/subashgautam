"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { BlobImageUpload } from "@/components/blob-image-upload"
import { FileUpload } from "@/components/file-upload"
import { TagInput } from "./tag-input"

interface ProjectFormItemProps {
  form: UseFormReturn<any>
  index: number
  onRemove: () => void
  isLoading: boolean
}

export function ProjectFormItem({ form, index, onRemove, isLoading }: ProjectFormItemProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={`projects.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} disabled={isLoading} />
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
                      placeholder="A brief description of your project"
                      className="resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`projects.${index}.link`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
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
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Add technology and press Enter"
                      tags={field.value || []}
                      setTags={(newTags) => form.setValue(`projects.${index}.technologies`, newTags)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
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

            <FormField
              control={form.control}
              name={`projects.${index}.pdfFile`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project PDF Documentation</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                      acceptedFileTypes={{ "application/pdf": [".pdf"] }}
                      maxSizeMB={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          {!showConfirmDelete ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowConfirmDelete(true)}
              disabled={isLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Project
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Are you sure?</span>
              <Button type="button" variant="destructive" size="sm" onClick={onRemove} disabled={isLoading}>
                Yes, Delete
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowConfirmDelete(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
