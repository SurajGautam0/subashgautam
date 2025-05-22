import { Mail, Phone, MapPin } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import type { Profile } from "@/lib/types"

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  // Default values if profile data is missing
  const email = profile?.email || "qsurajgautam@gmail.com"
  const phone = profile?.phone || "+977 9745964023"
  const location = profile?.location || "Kathmandu, Nepal"

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Let's discuss your project</h3>
            <p className="text-muted-foreground">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-muted-foreground">{phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-muted-foreground">{location}</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
