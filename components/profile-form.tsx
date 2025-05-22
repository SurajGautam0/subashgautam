"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { BlobImageUpload } from "@/components/blob-image-upload"
import type { Profile } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateProfile } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  title: z.string().optional(),
  summary: z.string().optional(),
  about: z.string().optional(),
  aboutExtended: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  skillsDescription: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  stats: z
    .object({
      projects: z.string().optional(),
      experience: z.string().optional(),
      clients: z.string().optional(),
      awards: z.string().optional(),
    })
    .optional(),
  socialLinks: z
    .object({
      twitter: z.string().url().optional().or(z.literal("")),
      linkedin: z.string().url().optional().or(z.literal("")),
      github: z.string().url().optional().or(z.literal("")),
      instagram: z.string().url().optional().or(z.literal("")),
    })
    .optional(),
})

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name || "",
      title: profile.title || "",
      summary: profile.summary || "",
      about: profile.about || "",
      aboutExtended: profile.aboutExtended || "",
      image: profile.image || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      skillsDescription: profile.skillsDescription || "",
      technologies: profile.technologies || [],
      stats: {
        projects: profile.stats?.projects || "",
        experience: profile.stats?.experience || "",
        clients: profile.stats?.clients || "",
        awards: profile.stats?.awards || "",
      },
      socialLinks: {
        twitter: profile.socialLinks?.twitter || "",
        linkedin: profile.socialLinks?.linkedin || "",
        github: profile.socialLinks?.github || "",
        instagram: profile.socialLinks?.instagram || "",
      },
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await updateProfile(values)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your profile could not be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and profile details. This information will be displayed on your portfolio
          website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full mb-8 flex flex-wrap overflow-x-auto">
                <TabsTrigger value="basic" className="flex-1 min-w-[120px]">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="about" className="flex-1 min-w-[120px]">
                  About
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex-1 min-w-[120px]">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="social" className="flex-1 min-w-[120px]">
                  Social & Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image</FormLabel>
                          <FormControl>
                            <BlobImageUpload value={field.value} onChange={field.onChange} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Subash Gautam" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Creative Developer" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Career Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A brief summary of your career and expertise"
                              {...field}
                              disabled={isLoading}
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Me (Short)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief introduction about yourself"
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
                  name="aboutExtended"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Me (Extended)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A more detailed description about your background and expertise"
                          {...field}
                          disabled={isLoading}
                          className="min-h-[150px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="stats.projects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projects Completed</FormLabel>
                        <FormControl>
                          <Input placeholder="50+" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stats.experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="5+" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stats.clients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Happy Clients</FormLabel>
                        <FormControl>
                          <Input placeholder="30+" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stats.awards"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Awards Received</FormLabel>
                        <FormControl>
                          <Input placeholder="10+" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <FormField
                  control={form.control}
                  name="skillsDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your skills and expertise"
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
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="JavaScript, React, Node.js, etc."
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
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+977 9800000000" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Kathmandu, Nepal" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Links</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="socialLinks.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/username" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialLinks.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialLinks.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialLinks.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/username" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
