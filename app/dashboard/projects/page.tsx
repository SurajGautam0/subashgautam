import type { Metadata } from "next"
import { getProfile } from "@/lib/profile"
import { ProjectsForm } from "@/components/projects-form"
import { DashboardHeader } from "@/components/dashboard-header"

export const metadata: Metadata = {
  title: "Projects | Dashboard",
  description: "Manage your portfolio projects",
}

export default async function ProjectsPage() {
  // Fetch profile data
  const profile = await getProfile()

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader title="Projects" description="Manage your portfolio projects and their PDF documents" />

      <ProjectsForm projects={profile.projects || []} />
    </div>
  )
}
