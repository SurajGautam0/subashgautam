import { Badge } from "@/components/ui/badge"
import { SkillBar } from "@/components/skill-bar"
import type { Profile } from "@/lib/types"

interface SkillsSectionProps {
  profile: Profile
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  // Default values if profile data is missing
  const skillsDescription =
    profile?.skillsDescription ||
    "I've honed my skills across various technologies and frameworks, allowing me to build complete, scalable applications from concept to deployment. My expertise spans both frontend and backend development, with a particular focus on creating seamless user experiences."
  const technologies = profile?.technologies || [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "GraphQL",
    "REST API",
    "Git",
    "Docker",
    "AWS",
    "Vercel",
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <SkillBar name="React.js" percentage={90} />
            <SkillBar name="Next.js" percentage={85} />
            <SkillBar name="TypeScript" percentage={80} />
            <SkillBar name="Node.js" percentage={75} />
            <SkillBar name="UI/UX Design" percentage={70} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">My creative skills & experiences</h3>
            <p className="text-muted-foreground">{skillsDescription}</p>

            <div className="flex flex-wrap gap-2 pt-4">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
