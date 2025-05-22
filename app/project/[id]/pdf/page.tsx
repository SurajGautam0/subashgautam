import { use } from "react"
import { notFound } from "next/navigation"
import { PDFViewer } from "@/components/pdf-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getProjectById } from "@/lib/projects"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProjectPDFPage({ params }: PageProps) {
  const { id } = use(params)
  const project = use(getProjectById(id))

  if (!project) {
    notFound()
  }

  if (!project.pdfFile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">No PDF Available</h1>
        <p className="text-gray-600 mb-6">This project does not have a PDF document attached.</p>
        <Button asChild>
          <Link href={`/project/${id}`}>Go Back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/project/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-gray-500 mt-2">Project Documentation</p>
      </div>

      <PDFViewer pdfUrl={project.pdfFile} title={`${project.title} - Documentation`} />
    </div>
  )
}
