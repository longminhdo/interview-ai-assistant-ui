"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronRight, Code, Users, Brain, Wrench } from "lucide-react"

const questionCategories = [
  {
    id: "programming",
    name: "Programming Languages",
    icon: Code,
    color: "text-blue-600",
    questions: [
      {
        id: 1,
        text: "Explain the difference between let, const, and var in JavaScript.",
        difficulty: "Medium",
        tags: ["JavaScript", "Variables"],
        usageCount: 45,
        sampleAnswer: "let and const are block-scoped, while var is function-scoped...",
      },
      {
        id: 2,
        text: "What are React Hooks and why were they introduced?",
        difficulty: "Medium",
        tags: ["React", "Hooks"],
        usageCount: 38,
        sampleAnswer: "React Hooks allow you to use state and lifecycle features in functional components...",
      },
      {
        id: 3,
        text: "Explain the concept of closures in JavaScript with an example.",
        difficulty: "Hard",
        tags: ["JavaScript", "Closures"],
        usageCount: 32,
        sampleAnswer: "A closure is a function that has access to variables in its outer scope...",
      },
    ],
  },
  {
    id: "soft-skills",
    name: "Soft Skills",
    icon: Users,
    color: "text-green-600",
    questions: [
      {
        id: 4,
        text: "How do you handle conflicts within a team?",
        difficulty: "Medium",
        tags: ["Communication", "Teamwork"],
        usageCount: 28,
        sampleAnswer: "I believe in addressing conflicts directly but respectfully...",
      },
      {
        id: 5,
        text: "Describe a time when you had to learn a new technology quickly.",
        difficulty: "Easy",
        tags: ["Learning", "Adaptability"],
        usageCount: 35,
        sampleAnswer: "In my previous role, I had to learn Vue.js in two weeks...",
      },
    ],
  },
  {
    id: "behavioral",
    name: "Behavioral Questions",
    icon: Brain,
    color: "text-purple-600",
    questions: [
      {
        id: 6,
        text: "Tell me about a challenging project you worked on and how you overcame obstacles.",
        difficulty: "Medium",
        tags: ["Problem Solving", "Experience"],
        usageCount: 42,
        sampleAnswer: "I worked on a project where we had tight deadlines and changing requirements...",
      },
      {
        id: 7,
        text: "Describe your ideal work environment.",
        difficulty: "Easy",
        tags: ["Culture Fit", "Preferences"],
        usageCount: 25,
        sampleAnswer: "I thrive in collaborative environments where there's open communication...",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Concepts",
    icon: Wrench,
    color: "text-orange-600",
    questions: [
      {
        id: 8,
        text: "Explain the difference between SQL and NoSQL databases.",
        difficulty: "Medium",
        tags: ["Database", "Architecture"],
        usageCount: 31,
        sampleAnswer: "SQL databases are relational and use structured query language...",
      },
      {
        id: 9,
        text: "What is the difference between authentication and authorization?",
        difficulty: "Easy",
        tags: ["Security", "Authentication"],
        usageCount: 29,
        sampleAnswer: "Authentication verifies who you are, while authorization determines what you can access...",
      },
    ],
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Hard":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function QuestionBank() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["programming"])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const filteredCategories = questionCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter((question) => {
        const matchesSearch =
          question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = selectedCategory === "all" || category.id === selectedCategory
        const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty
        return matchesSearch && matchesCategory && matchesDifficulty
      }),
    }))
    .filter((category) => category.questions.length > 0 || selectedCategory === "all")

  return (
    <MainLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Question Bank Management</h1>
            <p className="text-gray-600 mt-1">Manage interview questions by category and difficulty</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
                <DialogDescription>Create a new interview question for the question bank.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question-text">Question Text</Label>
                  <Textarea
                    id="question-text"
                    placeholder="Enter the interview question..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming Languages</SelectItem>
                        <SelectItem value="soft-skills">Soft Skills</SelectItem>
                        <SelectItem value="behavioral">Behavioral Questions</SelectItem>
                        <SelectItem value="technical">Technical Concepts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="e.g., JavaScript, React, Frontend" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sample-answer">Sample Answer (Optional)</Label>
                  <Textarea
                    id="sample-answer"
                    placeholder="Provide a sample answer or key points..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Question</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search questions or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming Languages</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="behavioral">Behavioral Questions</SelectItem>
                  <SelectItem value="technical">Technical Concepts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Question Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <Collapsible
                open={expandedCategories.includes(category.id)}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <category.icon className={`h-5 w-5 ${category.color}`} />
                        <CardTitle>{category.name}</CardTitle>
                        <Badge variant="secondary">{category.questions.length} questions</Badge>
                      </div>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {category.questions.map((question) => (
                        <Card key={question.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-2">{question.text}</p>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge className={getDifficultyColor(question.difficulty)}>
                                    {question.difficulty}
                                  </Badge>
                                  <span className="text-sm text-gray-500">Used {question.usageCount} times</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {question.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            {question.sampleAnswer && (
                              <div className="bg-gray-50 rounded p-3">
                                <p className="text-sm font-medium mb-1">Sample Answer:</p>
                                <p className="text-sm text-gray-700">{question.sampleAnswer}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
