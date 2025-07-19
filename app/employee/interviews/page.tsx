"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Target, Play, Clock, TrendingUp, Calendar, CheckCircle, Plus } from "lucide-react"

const interviewHistory = [
  {
    id: 1,
    type: "Technical",
    date: "2024-01-18",
    duration: "45 min",
    score: 85,
    status: "Completed",
    feedback: "Strong technical knowledge, good problem-solving approach",
  },
  {
    id: 2,
    type: "Behavioral",
    date: "2024-01-15",
    duration: "30 min",
    score: 78,
    status: "Completed",
    feedback: "Good communication skills, could improve on specific examples",
  },
  {
    id: 3,
    type: "Mixed",
    date: "2024-01-12",
    duration: "60 min",
    score: 82,
    status: "Completed",
    feedback: "Well-rounded performance, excellent coding skills",
  },
]

const upcomingInterviews = [
  {
    id: 1,
    type: "Technical",
    scheduledDate: "2024-01-22",
    scheduledTime: "2:00 PM",
    project: "Frontend Developer Role",
  },
]

export default function MockInterviews() {
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")

  const averageScore = Math.round(
    interviewHistory.reduce((sum, interview) => sum + interview.score, 0) / interviewHistory.length,
  )

  return (
    <MainLayout userType="employee">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mock Interviews</h1>
            <p className="text-gray-600 mt-1">Practice and improve your interview skills</p>
          </div>
          <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Start New Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Start Mock Interview</DialogTitle>
                <DialogDescription>Configure your interview session settings</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interview-type" className="text-right">
                    Type
                  </Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4 space-y-3">
                  <Label>Preparation Checklist</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="audio-test" />
                      <label htmlFor="audio-test" className="text-sm">
                        Audio test completed
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="video-test" />
                      <label htmlFor="video-test" className="text-sm">
                        Video test completed
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="environment" />
                      <label htmlFor="environment" className="text-sm">
                        Quiet environment prepared
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsStartDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsStartDialogOpen(false)} disabled={!selectedType || !selectedDuration}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Interview
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewHistory.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {upcomingInterviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Your scheduled mock interview sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <Target className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{interview.type} Interview</h3>
                        <p className="text-sm text-gray-600">{interview.project}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {interview.scheduledDate} at {interview.scheduledTime}
                        </div>
                      </div>
                    </div>
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Interview History</CardTitle>
            <CardDescription>Your past mock interview performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviewHistory.map((interview) => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{interview.type}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {interview.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {interview.duration}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold">{interview.score}%</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Performance</span>
                      <span className="text-sm">{interview.score}%</span>
                    </div>
                    <Progress value={interview.score} className="h-2" />
                  </div>

                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-medium text-sm mb-1">Feedback</h4>
                    <p className="text-sm text-gray-700">{interview.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
