"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Upload, Download, Calendar, Mail } from "lucide-react"

const resumes = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    uploadDate: "2024-01-18",
    status: "Optimized",
    assignedProjects: ["Frontend Developer Role", "React Developer Position"],
    score: 8.5,
  },
  {
    id: 2,
    candidateName: "Mike Chen",
    email: "mike.chen@email.com",
    uploadDate: "2024-01-16",
    status: "Under Review",
    assignedProjects: ["Backend Engineer Position"],
    score: 7.2,
  },
  {
    id: 3,
    candidateName: "Emily Davis",
    email: "emily.davis@email.com",
    uploadDate: "2024-01-15",
    status: "Optimized",
    assignedProjects: ["Data Scientist Role", "Full Stack Engineer"],
    score: 9.1,
  },
  {
    id: 4,
    candidateName: "John Smith",
    email: "john.smith@email.com",
    uploadDate: "2024-01-14",
    status: "Pending",
    assignedProjects: [],
    score: 6.8,
  },
  {
    id: 5,
    candidateName: "Lisa Wang",
    email: "lisa.wang@email.com",
    uploadDate: "2024-01-12",
    status: "Optimized",
    assignedProjects: ["DevOps Engineer"],
    score: 8.3,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Optimized":
      return "bg-green-100 text-green-800"
    case "Under Review":
      return "bg-yellow-100 text-yellow-800"
    case "Pending":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AdminResumes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResumes, setSelectedResumes] = useState<number[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const filteredResumes = resumes.filter(
    (resume) =>
      resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectResume = (resumeId: number) => {
    setSelectedResumes((prev) => (prev.includes(resumeId) ? prev.filter((id) => id !== resumeId) : [...prev, resumeId]))
  }

  const handleSelectAll = () => {
    if (selectedResumes.length === filteredResumes.length) {
      setSelectedResumes([])
    } else {
      setSelectedResumes(filteredResumes.map((resume) => resume.id))
    }
  }

  const handleBulkDelete = () => {
    // Handle bulk delete logic
    setSelectedResumes([])
  }

  return (
    <MainLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Management</h1>
            <p className="text-gray-600 mt-1">Manage candidate resumes and optimization</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload New Resume</DialogTitle>
                  <DialogDescription>Upload a candidate's resume for analysis and optimization.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Candidate Name</label>
                    <Input placeholder="Enter candidate name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="candidate@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resume File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsUploadDialogOpen(false)}>Upload Resume</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {selectedResumes.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedResumes.length})
              </Button>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Resumes</CardTitle>
                <CardDescription>{filteredResumes.length} resumes found</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search resumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedResumes.length === filteredResumes.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Projects</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResumes.map((resume) => (
                  <TableRow key={resume.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedResumes.includes(resume.id)}
                        onCheckedChange={() => handleSelectResume(resume.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{resume.candidateName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {resume.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {resume.uploadDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(resume.status)}>{resume.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {resume.assignedProjects.length > 0 ? (
                          resume.assignedProjects.map((project, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">No projects</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium">{resume.score}/10</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
