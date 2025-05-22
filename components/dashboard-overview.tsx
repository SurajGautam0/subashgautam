import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, FileText, MessageSquare, User } from "lucide-react"
import type { Profile } from "@/lib/types"

interface DashboardOverviewProps {
  profile: Profile
}

export function DashboardOverview({ profile }: DashboardOverviewProps) {
  // Dashboard statistics
  const stats = [
    {
      title: "Projects",
      value: profile.projects?.length || 0,
      icon: Briefcase,
      href: "/dashboard/projects",
    },
    {
      title: "Testimonials",
      value: profile.testimonials?.length || 0,
      icon: MessageSquare,
      href: "/dashboard/testimonials",
    },
    {
      title: "Unread Messages",
      value: 0, // This would typically come from a database query
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      title: "PDF Documents",
      value: (profile.projects?.filter((p) => p.pdfFile)?.length || 0) + (profile.cvFile ? 1 : 0),
      icon: FileText,
      href: "/dashboard/projects",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Link href={stat.href} className="text-primary hover:underline">
                Manage {stat.title.toLowerCase()}
              </Link>
            </p>
          </CardContent>
        </Card>
      ))}

      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your portfolio content with these quick actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/dashboard/projects">
                <Briefcase className="mr-2 h-4 w-4" />
                Manage Projects
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard/cv-upload">
                <FileText className="mr-2 h-4 w-4" />
                Update CV
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/" target="_blank">
                View Website
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
