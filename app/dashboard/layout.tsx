import type React from "react"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex min-h-screen flex-col p-4 md:ml-[var(--sidebar-width)] md:p-8">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </SidebarProvider>
      <Toaster />
    </div>
  )
}
