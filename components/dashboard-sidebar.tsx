"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  MessageSquare,
  FileText,
  Settings,
  ImageIcon,
  Home,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { RedisConnectionStatus } from "./redis-connection-status"
import { ThemeToggle } from "./theme-toggle"
import { UserButton } from "./user-button"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "Experience",
    href: "/dashboard/experience",
    icon: Briefcase,
  },
  {
    title: "Education",
    href: "/dashboard/education",
    icon: GraduationCap,
  },
  {
    title: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquare,
  },
  {
    title: "CV Upload",
    href: "/dashboard/cv-upload",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Update Image",
    href: "/dashboard/update-image",
    icon: ImageIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating" className="border-none">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">SG</span>
          </div>
          <span className="text-xl font-bold">Portfolio</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="View Website">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span>View Website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RedisConnectionStatus />
            </div>
            <ThemeToggle />
          </div>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
