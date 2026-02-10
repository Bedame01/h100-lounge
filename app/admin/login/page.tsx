"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useTheme } from "next-themes"
import logoLight from '@/public/icons/logo-white.png'
import logoDark from '@/public/icons/logo-black.png'

export default function AdminLoginPage() {
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check if user is admin
      const isAdmin = data.user?.user_metadata?.is_admin === true

      if (!isAdmin) {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      router.push("/admin")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-[410px]">
        <div className="mb-6 text-center">
          <Link href="/" className="mt-2 inline-flex items-center gap-2">
            {theme === "dark" ? (
              <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-15 mx-auto" />
            ) : 
            theme === "light" ? (
              <img src={logoDark.src} alt="H100 Lounge Logo" className="h-auto w-15 mx-auto" />
            ) : (
              <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-15 mx-auto" />
            )}
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Admin Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-accent">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-5.5 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/admin/forgot-password"
                      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-5.5 text-sm"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full py-5.5" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <Link
                  href="/admin/signup"
                  className="text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Need an admin account? Sign up
                </Link>
              </div>
              <div className="mt-2 text-center text-sm">
                <Link href="/" className="text-muted-foreground hover:text-foreground underline underline-offset-4">
                  Back to website
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}