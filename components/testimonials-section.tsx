import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Profile } from "@/lib/types"

interface TestimonialsSectionProps {
  profile: Profile
}

export function TestimonialsSection({ profile }: TestimonialsSectionProps) {
  // Default values if profile data is missing
  const testimonials = profile?.testimonials || [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      content:
        "Working with Subash was an absolute pleasure. He delivered our project on time and exceeded our expectations with the quality of his work.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Michael Chen",
      position: "Product Manager, InnovateCorp",
      content:
        "Subash's attention to detail and problem-solving skills are exceptional. He quickly understood our requirements and delivered a solution that perfectly matched our vision.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director, GrowthLabs",
      content:
        "I was impressed by Subash's professionalism and technical expertise. He was responsive to feedback and made the development process smooth and stress-free.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-primary/5 to-accent/5 border-none shadow-md">
              <CardContent className="p-6 relative">
                <div className="text-6xl text-primary/20 absolute top-4 left-4">"</div>
                <div className="relative z-10">
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
