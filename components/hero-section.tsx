"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram, FileText, ArrowDown } from "lucide-react"
import type { Profile } from "@/lib/types"

interface HeroSectionProps {
  profile: Profile
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Default values if profile data is missing
  const name = profile?.name || "Subash Gautam"
  const title = profile?.title || "Creative Developer"
  const summary = profile?.summary || "A passionate developer crafting digital experiences"
  const image = profile?.image || "/images/profile-sunset.jpg"
  const socialLinks = profile?.socialLinks || {}
  const cvFile = profile?.cvFile

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5 z-0"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/50 bg-primary/5 text-primary">
              {title}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              I'm <span className="gradient-heading">{name}</span>,
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">
                {summary?.split(" ").slice(0, 6).join(" ") || "A passionate developer crafting digital experiences"}
              </span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl text-pretty">
              {summary ||
                "I specialize in creating beautiful, usable, and professional websites using the latest technologies and frameworks."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {socialLinks?.twitter && (
                <motion.a
                  href={socialLinks.twitter}
                  className="bg-muted/80 hover:bg-primary/10 p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </motion.a>
              )}

              {socialLinks?.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  className="bg-muted/80 hover:bg-primary/10 p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </motion.a>
              )}

              {socialLinks?.github && (
                <motion.a
                  href={socialLinks.github}
                  className="bg-muted/80 hover:bg-primary/10 p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </motion.a>
              )}

              {socialLinks?.instagram && (
                <motion.a
                  href={socialLinks.instagram}
                  className="bg-muted/80 hover:bg-primary/10 p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </motion.a>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <a href="#projects">View My Work</a>
              </Button>

              {cvFile && (
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <a href={cvFile} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={name}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-white">
                <span className="font-bold">5+</span>
              </div>

              <div className="absolute -bottom-6 -right-6 w-auto h-12 bg-accent rounded-lg shadow-lg flex items-center justify-center text-white px-4">
                <span className="font-bold">Full Stack Developer</span>
              </div>
            </div>

            {/* Background shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <ArrowDown className="text-primary h-6 w-6" />
          </motion.div>
          <span className="text-sm text-muted-foreground mt-2">Scroll Down</span>
        </div>
      </div>
    </section>
  )
}
