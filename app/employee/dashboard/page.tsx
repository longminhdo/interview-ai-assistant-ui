"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FolderOpen, Target, BookOpen, Trophy, Star, Calendar, Play } from "lucide-react"
import { useRouter } from "next/navigation"

const myProjects = [
  {
    id: 1,
    name: "Frontend Developer Role",
    company: "TechCorp Inc.",
    status: "In Progress",
    progress: 75,
    nextStep: "Complete mock interview",
    dueDate: "2024-01-25",
  },
  {
    id: 2,
    name: "React Developer Position",
    company: "StartupXYZ",
    status: "Study Phase",
    progress: 45,
    nextStep: "Review JavaScript concepts",
    dueDate: "2024-01-30",
  },
  {
    id: 3,
    name: "Full Stack Engineer",
    company: "WebTech Solutions",
    status: "Completed",
    progress: 100,
    nextStep: "Awaiting results",
    dueDate: "2024-01-20",
  },
]

const recentActivity = [
  {
    type: "study",
    title: "Completed React Hooks module",
    time: "2 hours ago",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    type: "interview",
    title: "Mock interview session completed",
    score: "85%",
    time: "1 day ago",
    icon: Target,
    color: "text-green-600",
  },
  {
    type: "achievement",
    title: "Earned 'JavaScript Expert' badge",
    time: "2 days ago",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    type: "study",
    title: "Started Node.js fundamentals",
    time: "3 days ago",
    icon: BookOpen,
    color: "text-purple-600",
  },
]

const achievements = [
  { name: "JavaScript Expert", icon: "🏆", earned: true },
  { name: "React Master", icon: "⚛️", earned: true },
  { name: "Interview Pro", icon: "🎯", earned: false },
  { name: "Study Streak", icon: "🔥", earned: true },
]

export default function EmployeeDashboard() {
  const router = useRouter();

  const handleStartMockInterview = () => {
    // Navigate to the mock interview page
    router.push("/employee/interviews/live");
  }

  return (
    <MainLayout userType="employee">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600 mt-1">Continue your interview preparation journey</p>
          </div>
          <Button onClick={handleStartMockInterview}>
            <Play className="h-4 w-4 mr-2" />
            Start Mock Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FolderOpen className="h-5 w-5 mr-2" />
                  My Projects
                </CardTitle>
                <CardDescription>Track your interview preparation progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.company}</p>
                      </div>
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Next: {project.nextStep}</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>My Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-600">Frontend Developer</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Resume Score</span>
                    <span className="text-sm">8.5/10</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Interview Readiness</span>
                    <span className="text-sm">7.2/10</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Study Progress</span>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>

              <div className="pt-3 border-t">
                <h4 className="font-medium mb-2">Achievements</h4>
                <div className="grid grid-cols-2 gap-2">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 p-2 rounded ${
                        achievement.earned ? "bg-yellow-50" : "bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{achievement.icon}</span>
                      <span className={`text-xs ${achievement.earned ? "text-yellow-800" : "text-gray-500"}`}>
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning and interview activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    {activity.score && <p className="text-sm text-gray-500">Score: {activity.score}</p>}
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                  {activity.type === "achievement" && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
