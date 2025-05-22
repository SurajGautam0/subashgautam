import { Suspense } from "react"
import { getProfile } from "@/lib/profile"
import { DashboardOverview } from "@/components/dashboard-overview"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { ProjectsForm } from "@/components/projects-form"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default async function DashboardPage() {
  // Fetch profile data
  let profile

  try {
    profile = await getProfile()
  } catch (error) {
    console.error("Error loading profile data:", error)
    // Use a minimal default profile if there's an error
    profile = {
      name: "Default Profile",
      title: "Portfolio Owner",
      summary: "This is a default profile used when data cannot be loaded.",
      image: "/placeholder.svg?height=600&width=600",
      projects: [],
      experience: [],
      education: [],
      testimonials: [],
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader title="Dashboard" description="Welcome to your portfolio dashboard" />

      <DashboardOverview profile={profile} />

      <Tabs defaultValue="quickEdit" className="w-full mt-8">
        <TabsList className="w-full mb-8 flex flex-wrap overflow-x-auto">
          <TabsTrigger value="quickEdit" className="flex-1 min-w-[120px]">
            Quick Edit
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex-1 min-w-[120px]">
            Profile
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex-1 min-w-[120px]">
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quickEdit">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Edit</h2>
            <p className="text-muted-foreground mb-4">
              Make quick changes to your portfolio content. For more detailed editing, use the dedicated section tabs.
            </p>
            <Suspense fallback={<Spinner />}>
              <DashboardQuickEdit profile={profile} />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Suspense fallback={<Spinner />}>
            <ProfileForm profile={profile} />
          </Suspense>
        </TabsContent>

        <TabsContent value="projects">
          <Suspense fallback={<Spinner />}>
            <ProjectsForm projects={profile.projects || []} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardQuickEdit({ profile }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="font-medium mb-2">Profile Overview</h3>
        <div className="bg-muted p-4 rounded-lg">
          <p>
            <strong>Name:</strong> {profile.name || "Not set"}
          </p>
          <p>
            <strong>Title:</strong> {profile.title || "Not set"}
          </p>
          <p>
            <strong>Projects:</strong> {profile.projects?.length || 0}
          </p>
          <p>
            <strong>Testimonials:</strong> {profile.testimonials?.length || 0}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Recent Projects</h3>
        <div className="bg-muted p-4 rounded-lg">
          {profile.projects && profile.projects.length > 0 ? (
            <ul className="space-y-2">
              {profile.projects.slice(0, 3).map((project, index) => (
                <li key={index} className="truncate">
                  {project.title || "Untitled Project"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No projects added yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
