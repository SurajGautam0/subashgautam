import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Enhanced function to safely handle image URLs
export function getSafeImageUrl(url: string | undefined | null): string {
  // If no URL is provided, return a placeholder
  if (!url) return "/placeholder.svg?height=600&width=600"

  // If it's already a URL (starts with http or https), return it as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  // For local images, return the URL as is
  return url
}
