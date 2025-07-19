"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Brain,
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  BookOpen,
  Target,
  LogOut,
} from "lucide-react"

interface AppSidebarProps {
  userType: "admin" | "employee"
}

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: FolderOpen,
  },
  {
    title: "Resumes",
    url: "/admin/resumes",
    icon: FileText,
  },
  {
    title: "Question Bank",
    url: "/admin/questions",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

const employeeMenuItems = [
  {
    title: "Dashboard",
    url: "/employee/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    url: "/employee/projects",
    icon: FolderOpen,
  },
  {
    title: "Mock Interviews",
    url: "/employee/interviews",
    icon: Target,
  },
  {
    title: "Study Plan",
    url: "/employee/study",
    icon: BookOpen,
  },
  {
    title: "Profile",
    url: "/employee/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/employee/settings",
    icon: Settings,
  },
]

export function AppSidebar({ userType }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const menuItems = userType === "admin" ? adminMenuItems : employeeMenuItems

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="font-semibold text-lg">AI Interview Co-Pilot</h2>
            <p className="text-sm text-muted-foreground capitalize">{userType} Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
