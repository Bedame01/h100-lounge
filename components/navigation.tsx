"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import SwitchButton from "./kokonutui/switch-button"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'
import { ThemeToggle } from '@/components/theme-toggle'
// import MorphicNavbar from "./kokonutui/morphic-navbar"

import logoLight from '@/public/icons/logo-white.png'
import logoDark from '@/public/icons/logo-black.png'

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Drinks&Menu" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const SCROLL_THRESHOLD = 70; // Adjust the scroll height at which header toggles to black

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed py-1 top-0 left-0 right-0 z-50 ${scrolled ? 'bg-background dark:bg-background dark:backdrop-blur-md' : 'bg-transparent'} transition-colors duration-300`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-15!">
        <div className="flex items-center justify-between h-16">

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "md:text-[12.5px] lg:text-[13.6px] font-medium transition-colors hover:text-foreground uppercase",
                  pathname === link.href 
                    ? "text-accent"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* <MorphicNavbar /> */}
          </div>

          <Link href="/" className="">
            {theme === "dark" ? (
              <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-16" />
            ) : (
              <img src={logoDark.src} alt="H100 Lounge Logo" className="h-auto w-16" />
            )}
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            {/* <SwitchButton /> */}
            <ThemeToggle />
            <CustomButton 
              text="Make a Reservation" 
              // hoverText="Book a Table" 
              href="/reservations" 
              variant="ghost" 
              className="min-w-40! py-4 px-1 text-sm text-center textDisplay"
            />
          </div>

          <div className="md:hidden flex items-center gap-2">
            {/* <SwitchButton /> */}
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
                    <Link href="/" className="mt-2 inline-flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                      {theme === "dark" ? (
                        <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-15" />
                      ) : (
                        <img src={logoDark.src} alt="H100 Lounge Logo" className="h-auto w-15" />
                      )}
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6 px-3">
                  {navLinks.map((link) => (
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
                  <div className="border-t pt-8 mt-5">
                    <CustomButton 
                      text="Make a Reservation" 
                      // hoverText="Book a Table" 
                      href="/reservations" 
                      variant="primary" 
                      className="min-w-full! py-6 px-1 text-sm text-center uppercase text-[#fff]!"
                      onClick={() => setIsMenuOpen(false)}
                    />
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
