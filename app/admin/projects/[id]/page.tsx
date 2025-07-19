"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  Target,
  Eye,
  Settings,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for project details
const projectData = {
  id: 1,
  name: "Frontend Developer Role",
  customer: {
    name: "TechCorp Inc.",
    contact: "hr@techcorp.com",
    company: "TechCorp Inc.",
  },
  status: "In Progress",
  createdDate: "2024-01-15",
  timeline: "4 weeks",
  priority: "High",
  jobDescription: `We are looking for a skilled Frontend Developer to join our dynamic team. The ideal candidate will have strong experience in React, TypeScript, and modern web development practices.

Key Requirements:
• 3+ years of experience with React and JavaScript
• Strong knowledge of TypeScript
• Experience with modern CSS frameworks (Tailwind, Styled Components)
• Familiarity with state management (Redux, Zustand)
• Understanding of responsive design principles
• Experience with testing frameworks (Jest, React Testing Library)
• Knowledge of build tools (Webpack, Vite)
• Git version control proficiency`,
  selectedResumes: [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      status: "Interview Scheduled",
      progress: 85,
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "TypeScript", "CSS"],
      matchScore: 92,
    },
    {
      id: 2,
      candidateName: "Mike Chen",
      email: "mike.chen@email.com",
      status: "Resume Optimized",
      progress: 65,
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["JavaScript", "React", "Node.js"],
      matchScore: 78,
    },
    {
      id: 3,
      candidateName: "Emily Davis",
      email: "emily.davis@email.com",
      status: "Under Review",
      progress: 45,
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Vue.js", "JavaScript", "CSS"],
      matchScore: 65,
    },
  ],
  analytics: {
    successRate: 75,
    interviewCompletion: 80,
    averageScore: 78,
    skillGaps: [
      { skill: "TypeScript", gap: 25 },
      { skill: "Testing", gap: 40 },
      { skill: "State Management", gap: 30 },
    ],
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Interview Scheduled":
      return "bg-blue-100 text-blue-800"
    case "Resume Optimized":
      return "bg-green-100 text-green-800"
    case "Under Review":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Interview Scheduled":
      return <Calendar className="h-4 w-4" />
    case "Resume Optimized":
      return <CheckCircle className="h-4 w-4" />
    case "Under Review":
      return <Clock className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

export default function ProjectDetails() {
  const router = useRouter()

  return (
    <MainLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{projectData.name}</h1>
              <p className="text-gray-600 mt-1">Project details and candidate pipeline</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Add Candidates
            </Button>
          </div>
        </div>

        {/* Project Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer</label>
                  <p className="font-semibold">{projectData.customer.name}</p>
                  <p className="text-sm text-gray-600">{projectData.customer.contact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-blue-100 text-blue-800">{projectData.status}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created Date</label>
                  <p className="font-semibold">{projectData.createdDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Timeline</label>
                  <p className="font-semibold">{projectData.timeline}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Job Description</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{projectData.jobDescription}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-sm">{projectData.analytics.successRate}%</span>
                </div>
                <Progress value={projectData.analytics.successRate} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Interview Completion</span>
                  <span className="text-sm">{projectData.analytics.interviewCompletion}%</span>
                </div>
                <Progress value={projectData.analytics.interviewCompletion} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Average Score</span>
                  <span className="text-sm">{projectData.analytics.averageScore}%</span>
                </div>
                <Progress value={projectData.analytics.averageScore} className="h-2" />
              </div>

              <div className="pt-3 border-t">
                <h4 className="font-medium mb-2">Skill Gaps</h4>
                <div className="space-y-2">
                  {projectData.analytics.skillGaps.map((gap, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{gap.skill}</span>
                      <span className="text-red-600">{gap.gap}% gap</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Resume Pipeline
            </CardTitle>
            <CardDescription>Track candidate progress through the interview process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectData.selectedResumes.map((resume) => (
                <Card key={resume.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={resume.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {resume.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{resume.candidateName}</h3>
                        <p className="text-xs text-gray-600">{resume.email}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(resume.status)} variant="secondary">
                          {getStatusIcon(resume.status)}
                          <span className="ml-1">{resume.status}</span>
                        </Badge>
                        <span className="text-sm font-medium">{resume.matchScore}% match</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">Progress</span>
                          <span className="text-xs">{resume.progress}%</span>
                        </div>
                        <Progress value={resume.progress} className="h-1" />
                      </div>

                      <div>
                        <p className="text-xs font-medium mb-1">Key Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {resume.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Play className="h-3 w-3 mr-1" />
                          Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
