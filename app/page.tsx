import { getProfile } from "@/lib/profile"
import { MainNavigation } from "@/components/main-navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { RedisDummyWarning } from "@/components/redis-dummy-warning"

export default async function Home() {
  // Fetch profile data
  const profile = await getProfile()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation profile={profile} />
      <main className="flex-1">
        <RedisDummyWarning />
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <ProjectsSection profile={profile} />
        <TestimonialsSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}
