"use client"

import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  pdfUrl: string
  title?: string
}

export function PDFViewer({ pdfUrl, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return newPageNumber >= 1 && newPageNumber <= numPages ? newPageNumber : prevPageNumber
    })
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.5))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5))
  }

  function toggleFullscreen() {
    const viewerElement = document.getElementById("pdf-viewer-container")

    if (!document.fullscreenElement && viewerElement) {
      viewerElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div
        id="pdf-viewer-container"
        className={`flex flex-col ${isFullscreen ? "bg-white fixed inset-0 z-50 p-4" : ""}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold truncate">{title || "PDF Document"}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={zoomOut} title="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button variant="outline" size="icon" onClick={zoomIn} title="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleFullscreen} title="Toggle fullscreen">
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" asChild title="Download PDF">
              <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <CardContent className="flex flex-col items-center justify-center p-0 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-[500px]">
              <Spinner size="lg" />
            </div>
          )}

          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-[500px]">
                <Spinner size="lg" />
              </div>
            }
            error={<div className="p-8 text-center text-red-500">Failed to load PDF. Please try again later.</div>}
            className="pdf-document"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-page"
            />
          </Document>

          {numPages && numPages > 1 && (
            <div className="flex items-center justify-center p-4 border-t w-full">
              <Button variant="outline" size="icon" onClick={previousPage} disabled={pageNumber <= 1} className="mr-2">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={pageNumber >= numPages}
                className="ml-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
