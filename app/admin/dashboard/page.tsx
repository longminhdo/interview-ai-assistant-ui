"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FolderOpen,
  FileText,
  TrendingUp,
  Clock,
  Plus,
  Upload,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const metrics = [
  {
    title: "Total Active Projects",
    value: "24",
    change: "+12%",
    icon: FolderOpen,
    color: "text-blue-600",
  },
  {
    title: "Total Resumes",
    value: "156",
    change: "+8%",
    icon: FileText,
    color: "text-green-600",
  },
  {
    title: "Interview Success Rate",
    value: "87%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Pending Mock Interviews",
    value: "12",
    change: "-3%",
    icon: Clock,
    color: "text-orange-600",
  },
]

const recentActivity = [
  {
    type: "project",
    title: "New project created: Frontend Developer Role",
    customer: "TechCorp Inc.",
    time: "2 hours ago",
    status: "new",
  },
  {
    type: "resume",
    title: "Resume optimized for Sarah Johnson",
    project: "Backend Engineer Position",
    time: "4 hours ago",
    status: "completed",
  },
  {
    type: "interview",
    title: "Mock interview completed by Mike Chen",
    score: "85%",
    time: "6 hours ago",
    status: "completed",
  },
  {
    type: "project",
    title: "Project status updated: Data Scientist Role",
    customer: "DataFlow Solutions",
    time: "1 day ago",
    status: "updated",
  },
]

export default function AdminDashboard() {
  return (
    <MainLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interview Co-Pilot Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage interview projects and track performance</p>
          </div>
          <div className="flex gap-3">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resume
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                    {metric.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {activity.status === "new" && <Plus className="h-5 w-5 text-blue-500" />}
                      {activity.status === "updated" && <AlertCircle className="h-5 w-5 text-orange-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.customer && <p className="text-sm text-gray-500">Customer: {activity.customer}</p>}
                      {activity.project && <p className="text-sm text-gray-500">Project: {activity.project}</p>}
                      {activity.score && <p className="text-sm text-gray-500">Score: {activity.score}</p>}
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Current month statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Project Completion Rate</span>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Resume Optimization Success</span>
                  <span className="text-sm text-gray-600">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Interview Pass Rate</span>
                  <span className="text-sm text-gray-600">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Active Candidates</span>
                  </div>
                  <Badge variant="secondary">43</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
