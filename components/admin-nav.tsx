"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LogOut, Calendar, UtensilsCrossed, LayoutDashboard, Settings, Menu } from "lucide-react"
import { ThemeToggle } from '@/components/theme-toggle'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import logoLight from '@/public/icons/logo-white.png'
import logoDark from '@/public/icons/logo-black.png'
// import CustomButton from "./kokonutui/CustomButton/CustomButton"

interface AdminNavProps {
  user: {
    email?: string
  }
}

export function AdminNav({ user }: AdminNavProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/reservations", label: "Reservations", icon: Calendar },
    { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          <div className="flex items-center gap-8">

            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center lg:gap-2 text-sm font-medium px-2 py-2 rounded-none transition-colors ${
                    pathname === item.href
                      ? "bg-accent text-[#fff]"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4 max-lg:hidden" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <div className="flex items-center max-md:hidden">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* ## */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="size-6 text-foreground" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Link href="/" className="mt-2 inline-flex items-center gap-2">
                      {theme === "dark" ? (
                        <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-14 mx-auto" />
                      ) : 
                      theme === "light" ? (
                        <img src={logoDark.src} alt="H100 Lounge Logo" className="h-auto w-14 mx-auto" />
                      ) : (
                        <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-14 mx-auto" />
                      )}
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-5 px-3">
                  {navItems.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-foreground py-2 textDisplay",
                        pathname === link.href ? "text-accent" : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t pt-8 mt-4">
                    <Button variant="default" size="sm" onClick={handleLogout} className="w-full bg-accent text-[#fff] py-6 rounded-none">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  )
}
