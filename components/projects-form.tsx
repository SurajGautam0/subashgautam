"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { ProjectFormItem } from "@/components/project-form-item"
import { updateProjects } from "@/lib/actions"
import type { Project } from "@/lib/types"
import { Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string()).optional(),
  pdfFile: z.string().optional(),
})

const formSchema = z.object({
  projects: z.array(projectSchema),
})

export function ProjectsForm({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projects: projects.length
        ? projects
        : [
            {
              title: "",
              description: "",
              image: "",
              link: "",
              technologies: [],
              pdfFile: "",
            },
          ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await updateProjects(values.projects)
      toast({
        title: "Projects updated",
        description: "Your projects have been updated successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your projects could not be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          Add and manage your portfolio projects. These will be displayed on your portfolio website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {fields.map((field, index) => (
                <ProjectFormItem
                  key={field.id}
                  form={form}
                  index={index}
                  onRemove={() => remove(index)}
                  isLoading={isLoading}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                    image: "",
                    link: "",
                    technologies: [],
                    pdfFile: "",
                  })
                }
                disabled={isLoading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? "Saving..." : "Save Projects"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
