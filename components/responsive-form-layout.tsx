import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveFormLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveFormLayout({ children, className }: ResponsiveFormLayoutProps) {
  return <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>
}

interface FormSectionProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function FormSection({ children, className, fullWidth = false }: FormSectionProps) {
  return <div className={cn("space-y-4", fullWidth && "md:col-span-2 lg:col-span-3", className)}>{children}</div>
}
