import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden group h-full flex flex-col ${className}`}>
      <div className="relative aspect-video overflow-hidden">
        {project.image ? (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <CardContent className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.link && (
            <Button asChild variant="outline" size="sm">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit
              </a>
            </Button>
          )}

          {project.pdfFile && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/project/${project.id}/pdf`}>
                <FileText className="mr-2 h-4 w-4" />
                View PDF
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
