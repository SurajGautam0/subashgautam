import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import type { Profile } from "@/lib/types"

interface ProjectsSectionProps {
  profile: Profile
  title?: string
  description?: string
  showViewAll?: boolean
  limit?: number
}

export function ProjectsSection({
  profile,
  title = "My Projects",
  description = "Check out some of my recent work",
  showViewAll = false,
  limit,
}: ProjectsSectionProps) {
  const projects = profile.projects || []
  const displayProjects = limit ? projects.slice(0, limit) : projects

  return (
    <section id="projects" className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {showViewAll && projects.length > limit && (
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
