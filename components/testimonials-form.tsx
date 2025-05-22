"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { FirebaseImageUpload } from "@/components/firebase-image-upload"
import { updateProfile } from "@/lib/actions"
import type { Testimonial } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  avatar: z.string().optional(),
})

const formSchema = z.object({
  testimonials: z.array(testimonialSchema),
})

export function TestimonialsForm({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testimonials: testimonials.length
        ? testimonials
        : [
            {
              name: "",
              position: "",
              content: "",
              avatar: "",
            },
          ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testimonials",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await updateProfile({ testimonials: values.testimonials })
      toast({
        title: "Testimonials updated",
        description: "Your testimonials have been updated successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your testimonials could not be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials</CardTitle>
        <CardDescription>
          Add testimonials from clients or colleagues. These will be displayed on your portfolio website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {fields.map((field, index) => (
                <Card key={field.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                        onClick={() => remove(index)}
                        disabled={isLoading || fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove testimonial</span>
                      </Button>

                      <div className="grid md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <FormField
                            control={form.control}
                            name={`testimonials.${index}.avatar`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Avatar Image</FormLabel>
                                <FormControl>
                                  <FirebaseImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
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
                            name={`testimonials.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Client Name" {...field} disabled={isLoading} />
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

                          <FormField
                            control={form.control}
                            name={`testimonials.${index}.content`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Testimonial</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="What the client said about your work"
                                    {...field}
                                    disabled={isLoading}
                                    className="min-h-[120px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ name: "", position: "", content: "", avatar: "" })}
                disabled={isLoading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? "Saving..." : "Save Testimonials"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
