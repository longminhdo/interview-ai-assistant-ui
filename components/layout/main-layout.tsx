"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Header } from "@/components/layout/header"

interface MainLayoutProps {
  children: React.ReactNode
  userType: "admin" | "employee"
}

export function MainLayout({ children, userType }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar userType={userType} />
      <SidebarInset>
        <Header userType={userType} />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
