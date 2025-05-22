import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter, Lock } from "lucide-react"
import type { Profile } from "@/lib/types"

interface FooterProps {
  profile: Profile
}

export function Footer({ profile }: FooterProps) {
  // Default values if profile data is missing
  const name = profile?.name || "Subash Gautam"
  const socialLinks = profile?.socialLinks || {}

  return (
    <footer className="bg-muted/30 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-primary rounded-md p-2 text-primary-foreground font-bold text-xl">P</div>
            <span className="font-medium text-xl">ortfolio</span>
          </div>

          <div className="flex items-center gap-6 mb-4 md:mb-0">
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {socialLinks?.instagram && (
              <a href={socialLinks.instagram} className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </p>
            <Link href="/signin" className="flex items-center gap-1 text-primary hover:underline">
              <Lock size={14} />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
