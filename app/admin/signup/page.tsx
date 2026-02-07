"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signupAdmin } from "@/app/actions/auth"

export default function AdminSignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    try {
      const result = await signupAdmin({ email, password, adminKey })

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      if (result.success) {
        setSuccess(result.message || "Admin account created successfully! You can now log in.")

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/admin/login")
        }, 2000)
      }
    } catch (err) {
      console.error("[v0] Unexpected error during signup:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link href="/" className="font-semibold text-2xl text-foreground">
            Noir Lounge
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Admin Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Signup</CardTitle>
            <CardDescription>Create a new admin account with the special access key</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admin-key">Admin Access Key</Label>
                  <Input
                    id="admin-key"
                    type="password"
                    required
                    placeholder="Enter special admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Contact your system administrator for the access key</p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription className="text-sm">{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Admin Account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm space-y-2">
                <Link
                  href="/admin/login"
                  className="text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Already have an account? Login
                </Link>
                <div>
                  <Link href="/" className="text-muted-foreground hover:text-foreground underline underline-offset-4">
                    Back to website
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
