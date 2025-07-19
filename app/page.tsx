"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Users, Target } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [userType, setUserType] = useState<"admin" | "employee">("admin")
  const router = useRouter()

  const handleLogin = () => {
    if (userType === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/employee/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Interview Co-Pilot</h1>
          <p className="text-gray-600 mt-2">Professional interview preparation platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your role to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "admin" | "employee")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="employee" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Employee
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" type="email" placeholder="admin@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input id="admin-password" type="password" />
                </div>
              </TabsContent>

              <TabsContent value="employee" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-email">Email</Label>
                  <Input id="employee-email" type="email" placeholder="employee@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-password">Password</Label>
                  <Input id="employee-password" type="password" />
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handleLogin} className="w-full mt-6">
              Sign In as {userType === "admin" ? "Admin" : "Employee"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
