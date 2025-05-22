"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BlobImageUpload } from "@/components/blob-image-upload"
import { Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialItemProps {
  form: UseFormReturn<any>
  index: number
  onRemove: () => void
  isLoading: boolean
}

export function TestimonialItem({ form, index, onRemove, isLoading }: TestimonialItemProps) {
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
            <span className="sr-only">Remove testimonial</span>
          </Button>

          <div className="grid gap-4 pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`testimonials.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`testimonials.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="CEO, Company Name" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`testimonials.${index}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What they said about you"
                      {...field}
                      disabled={isLoading}
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`testimonials.${index}.avatar`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <BlobImageUpload value={field.value} onChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
