"use client"

import { useState, useEffect, useRef } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VoiceVisualization } from "@/components/interview/voice-visualization"
import { useLivekitInterview } from "@/hooks/use-livekit-interview"
import {
  Volume2,
  Pause,
  Play,
  SkipForward,
  RotateCcw,
  Clock,
  Wifi,
  WifiOff,
  CheckCircle,
  User,
  Bot,
  Settings,
  HelpCircle,
  X,
  VolumeX,
} from "lucide-react"

type InterviewPhase = "setup" | "active" | "paused" | "completed"
type AIStatus = "listening" | "thinking" | "speaking" | "waiting"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: Date
}

const aiPersonas = [
  {
    id: "professional",
    name: "Sarah - Professional",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "Formal, structured interview style",
  },
  {
    id: "friendly",
    name: "Mike - Friendly",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "Casual, conversational approach",
  },
  {
    id: "challenging",
    name: "Dr. Chen - Challenging",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "Rigorous, detail-oriented questioning",
  },
]

export default function LiveMockInterview() {
  const [phase, setPhase] = useState<InterviewPhase>("setup")
  const [aiStatus, setAiStatus] = useState<AIStatus>("waiting")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [interviewType, setInterviewType] = useState("")
  const [duration, setDuration] = useState("")
  const [selectedPersona, setSelectedPersona] = useState("")
  const [skipCount, setSkipCount] = useState(0)
  const [maxSkips] = useState(3)
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [micTested, setMicTested] = useState(false)
  const [environmentReady, setEnvironmentReady] = useState(false)
  const [resumeReviewed, setResumeReviewed] = useState(false)
  const [token, setToken] = useState<string>("")
  const [isMuted, setIsMuted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  // LiveKit integration
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://localhost:7880"
  const { room, state, connect, disconnect, startRecording, stopRecording, sendMessage } = useLivekitInterview(
    token,
    wsUrl,
  )

  // Update AI status based on LiveKit state
  useEffect(() => {
    if (state.aiSpeaking) {
      setAiStatus("speaking")
    } else if (state.isRecording) {
      setAiStatus("listening")
    } else if (state.isConnected && phase === "active") {
      setAiStatus("listening")
    } else {
      setAiStatus("waiting")
    }
  }, [state.aiSpeaking, state.isRecording, state.isConnected, phase])

  useEffect(() => {
    if (phase === "active") {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [phase])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const generateToken = async () => {
    try {
      const response = await fetch("/api/livekit-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: `interview-${Date.now()}`,
          participantName: "candidate",
        }),
      })

      const data = await response.json()
      if (data.token) {
        setToken(data.token)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to generate token:", error)
      return false
    }
  }

  const startInterview = async () => {
    if (!interviewType || !duration || !selectedPersona) return

    const tokenGenerated = await generateToken()
    if (!tokenGenerated) {
      console.error("Failed to generate LiveKit token")
      return
    }

    setPhase("active")
    setTimeElapsed(0)

    // Connect to LiveKit room
    await connect()

    // Simulate AI starting the interview
    setTimeout(() => {
      const firstQuestion =
        "Hello! I'm excited to speak with you today. Let's start with you telling me about yourself and your background in software development."
      setCurrentQuestion(firstQuestion)

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: firstQuestion,
        timestamp: new Date(),
      }
      setMessages([aiMessage])
    }, 1000)
  }

  const handleMicToggle = async () => {
    if (aiStatus === "listening") {
      if (state.isRecording) {
        await stopRecording()
      } else {
        await startRecording()
      }
    }
  }

  const handleDoneResponse = async () => {
    if (state.isRecording) {
      await stopRecording()
      setAiStatus("thinking")

      // Send message to AI agent
      sendMessage("User finished speaking")

      // Simulate user response in transcript
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content:
          "Thank you for the question. I have experience with React and JavaScript, and I'm passionate about creating user-friendly interfaces...",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
    }
  }

  const handleSkipQuestion = () => {
    if (skipCount < maxSkips) {
      setSkipCount((prev) => prev + 1)
      sendMessage("Skip question")
    }
  }

  const handleRepeatQuestion = () => {
    sendMessage("Repeat question")
  }

  const handleEndInterview = () => {
    setShowEndDialog(true)
  }

  const confirmEndInterview = () => {
    disconnect()
    setPhase("completed")
    setShowEndDialog(false)
  }

  const getAIStatusText = () => {
    switch (aiStatus) {
      case "listening":
        return "Listening..."
      case "thinking":
        return "Thinking..."
      case "speaking":
        return "Speaking..."
      default:
        return "Ready"
    }
  }

  const getAIStatusColor = () => {
    switch (aiStatus) {
      case "listening":
        return "text-green-600"
      case "thinking":
        return "text-yellow-600"
      case "speaking":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  if (phase === "setup") {
    return (
      <MainLayout userType="employee">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview Setup</h1>
            <p className="text-gray-600">Configure your AI-powered interview session</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Configuration</CardTitle>
                <CardDescription>Choose your interview preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Interview Type</label>
                  <Select value={interviewType} onValueChange={setInterviewType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">AI Interviewer</label>
                  <div className="space-y-2">
                    {aiPersonas.map((persona) => (
                      <div
                        key={persona.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedPersona === persona.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                        onClick={() => setSelectedPersona(persona.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={persona.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{persona.name.split(" ")[0][0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{persona.name}</p>
                            <p className="text-sm text-gray-600">{persona.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Setup</CardTitle>
                <CardDescription>Ensure your equipment is ready</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Microphone Test</span>
                    <Button size="sm" variant={micTested ? "default" : "outline"} onClick={() => setMicTested(true)}>
                      {micTested ? <CheckCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      {micTested ? "Tested" : "Test Mic"}
                    </Button>
                  </div>

                  {micTested && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800">Microphone working properly</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Preparation Checklist</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="environment"
                        checked={environmentReady}
                        onCheckedChange={(checked) => setEnvironmentReady(checked as boolean)}
                      />
                      <label htmlFor="environment" className="text-sm">
                        Quiet environment prepared
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="resume"
                        checked={resumeReviewed}
                        onCheckedChange={(checked) => setResumeReviewed(checked as boolean)}
                      />
                      <label htmlFor="resume" className="text-sm">
                        Resume uploaded and reviewed
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={startInterview}
                  disabled={
                    !interviewType ||
                    !duration ||
                    !selectedPersona ||
                    !micTested ||
                    !environmentReady ||
                    !resumeReviewed
                  }
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Interview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (phase === "active" || phase === "paused") {
    return (
      <MainLayout userType="employee">
        <div className="h-[calc(100vh-8rem)] flex">
          {/* Main Voice Interface */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
                </div>
                <Badge variant="secondary">{aiPersonas.find((p) => p.id === selectedPersona)?.name}</Badge>
                <Badge variant={state.isConnected ? "default" : "destructive"}>
                  {state.isConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {state.connectionQuality === "excellent" ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : state.connectionQuality === "good" ? (
                    <Wifi className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-xs text-gray-500 capitalize">{state.connectionQuality}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleEndInterview}>
                  <X className="h-4 w-4" />
                  End
                </Button>
              </div>
            </div>

            {/* Main Voice Visualization Area */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8 min-h-0">
              <div className="text-center mb-8 max-w-2xl">
                <h2 className={`text-xl font-medium mb-3 transition-colors duration-300 ${getAIStatusColor()}`}>
                  {getAIStatusText()}
                </h2>
                {currentQuestion && aiStatus === "speaking" && (
                  <p className="text-gray-700 text-base leading-relaxed">{currentQuestion}</p>
                )}
                {aiStatus === "listening" && (
                  <p className="text-gray-500 text-sm">
                    {state.isRecording ? "Listening to your response..." : "Click the circle to start speaking"}
                  </p>
                )}
                {aiStatus === "thinking" && <p className="text-gray-500 text-sm">Processing your response...</p>}
              </div>

              {/* Voice Visualization Circle */}
              <div className="flex-shrink-0">
                <VoiceVisualization
                  aiStatus={aiStatus}
                  isRecording={state.isRecording}
                  selectedPersona={aiPersonas.find((p) => p.id === selectedPersona)}
                  onMicToggle={handleMicToggle}
                  disabled={!state.isConnected}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-3 mt-8">
                <Button variant="outline" size="sm" onClick={handleRepeatQuestion} disabled={aiStatus !== "listening"}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Repeat
                </Button>

                {state.isRecording && (
                  <Button onClick={handleDoneResponse} className="bg-blue-600 hover:bg-blue-700 px-6">
                    Done Speaking
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={handleSkipQuestion} disabled={skipCount >= maxSkips}>
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip ({maxSkips - skipCount})
                </Button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-center space-x-3 mt-4">
                <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>

                <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                  {isMuted ? "Unmute" : "Mute"}
                </Button>

                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </div>

              {/* Error Display */}
              {state.error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{state.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Transcript */}
          <div className="w-96 border-l bg-white flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Interview Transcript</h3>
              <p className="text-sm text-gray-600">Real-time conversation history</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Conversation will appear here</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {message.type === "ai" ? (
                        <Bot className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                      <span className="text-xs font-medium text-gray-600">
                        {message.type === "ai" ? "AI Interviewer" : "You"}
                      </span>
                      <span className="text-xs text-gray-400">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.type === "ai"
                          ? "bg-blue-50 border border-blue-100"
                          : "bg-green-50 border border-green-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Transcript Controls */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* End Interview Dialog */}
        <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>End Interview?</DialogTitle>
              <DialogDescription>
                Are you sure you want to end the interview? Your progress will be saved and you'll receive feedback on
                your performance.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEndDialog(false)}>
                Continue Interview
              </Button>
              <Button onClick={confirmEndInterview}>End & Get Results</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MainLayout>
    )
  }

  if (phase === "completed") {
    return (
      <MainLayout userType="employee">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h1>
            <p className="text-gray-600">Here's your performance summary</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">85%</div>
                  <p className="text-lg text-gray-600">Overall Score</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <p className="text-sm text-gray-600">Technical Skills</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">78%</div>
                    <p className="text-sm text-gray-600">Communication</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <p className="text-sm text-gray-600">Problem Solving</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Detailed Feedback</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-medium text-green-800">Strengths</h4>
                      <ul className="text-sm text-green-700 mt-1 space-y-1">
                        <li>• Strong technical knowledge in React and JavaScript</li>
                        <li>• Clear and articulate communication</li>
                        <li>• Good problem-solving approach</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <h4 className="font-medium text-yellow-800">Areas for Improvement</h4>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• Provide more specific examples from past experience</li>
                        <li>• Elaborate on testing strategies and methodologies</li>
                        <li>• Discuss scalability considerations in more detail</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Schedule Follow-up Interview</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  View Full Transcript
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Download Report
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Practice Similar Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    )
  }

  return null
}
