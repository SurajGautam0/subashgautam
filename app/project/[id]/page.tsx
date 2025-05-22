import { notFound } from "next/navigation"
import { getProject } from "@/lib/projects"
import { PDFViewer } from "@/components/pdf-viewer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="container mx-auto py-8">
        <Button variant="outline" asChild>
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Project Image */}
          <div className="rounded-lg overflow-hidden shadow-md">
            {project.image ? (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No project image</span>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>

            <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech, i) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.link && (
                <Button asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Project
                  </a>
                </Button>
              )}

              {project.pdfFile && (
                <Button variant="outline" asChild>
                  <a href={project.pdfFile} download target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* PDF Viewer Section */}
        {project.pdfFile && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Project Documentation</h2>
            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <PDFViewer url={project.pdfFile} fileName={`${project.title}.pdf`} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
