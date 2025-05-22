import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import type { Profile } from "@/lib/types"

interface AboutSectionProps {
  profile: Profile
}

export function AboutSection({ profile }: AboutSectionProps) {
  // Default values if profile data is missing
  const name = profile?.name || "Subash Gautam"
  const about =
    profile?.about ||
    "I specialize in creating beautiful, usable, and professional websites using the latest technologies and frameworks. With a strong focus on user experience and performance, I deliver solutions that not only look great but also function flawlessly."
  const aboutExtended =
    profile?.aboutExtended ||
    "My journey in web development started over 5 years ago, and since then, I've worked with a diverse range of clients from startups to established businesses. I'm constantly learning and adapting to new technologies to ensure I provide the best solutions possible."
  const email = profile?.email || "qsurajgautam@gmail.com"
  const phone = profile?.phone || "+977 9745964023"
  const location = profile?.location || "Kathmandu, Nepal"
  const cvFile = profile?.cvFile
  const stats = profile?.stats || {
    projects: "50+",
    experience: "5+",
    clients: "30+",
    awards: "10+",
  }

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">I'm {name}, a passionate developer based in Nepal</h3>
            <p className="text-muted-foreground">{about}</p>
            <p className="text-muted-foreground">{aboutExtended}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-semibold">Name:</h4>
                <p className="text-muted-foreground">{name}</p>
              </div>
              <div>
                <h4 className="font-semibold">Email:</h4>
                <p className="text-muted-foreground">{email}</p>
              </div>
              <div>
                <h4 className="font-semibold">Phone:</h4>
                <p className="text-muted-foreground">{phone}</p>
              </div>
              <div>
                <h4 className="font-semibold">Location:</h4>
                <p className="text-muted-foreground">{location}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button className="bg-primary hover:bg-primary/90">
                <a href="#contact">Contact Me</a>
              </Button>
              {cvFile && (
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <a href={cvFile} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stats.projects}</h3>
                <p className="text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stats.experience}</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stats.clients}</h3>
                <p className="text-muted-foreground">Happy Clients</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stats.awards}</h3>
                <p className="text-muted-foreground">Awards Received</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
