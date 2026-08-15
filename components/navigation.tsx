"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight, Ruler, CheckCircle, Instagram, Mail, Crown } from "lucide-react"
// import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react"
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'
import { ThemeToggle } from '@/components/theme-toggle'
import logoLight from '@/public/icons/logo-white.png'
import logoDark from '@/public/icons/logo-black.png'

const work = ["H100 LOUNGE AND BAR ✦ 100% RELAX, REFRESH AND REPEAT", "H100 LOUNGE AND BAR ✦ 100% RELAX, REFRESH AND REPEAT", "H100 LOUNGE AND BAR ✦ 100% RELAX, REFRESH AND REPEAT"];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Menu" },
  { href: "/menuvip", label: "Vip Menu" },
  { href: "/faq", label: "FAQ" },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const SCROLL_THRESHOLD = 70; // Adjust the scroll height at which header toggles to black
  const socialLinks = [
  // { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  // { icon: Tiktok, href: "https://tiktok.com/Fizcaps", label: "Tiktok" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Mail, href: "mailto:h100lounge.bar@gmail.com", label: "Email;" },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed py-2 top-0 left-0 right-0 z-50 ${scrolled ? 'backdrop-blur supports-[backdrop-filter]:bg-background/65 border-b border-border/60' : 'bg-transparent'} transition-colors duration-300`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-15!">
        <div className="flex items-center justify-between h-16">

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "md:text-[12.5px] lg:text-sm font-medium transition-colors hover:text-foreground uppercase",
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
            {theme === "light" ? (
              <img src={logoDark.src} alt="H100 Lounge Logo" className="h-auto w-16" />
            ) : (
              <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-16" />
            )}
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            {/* <SwitchButton /> */}
            <ThemeToggle />
            <CustomButton 
              text="Make Reservation" 
              // hoverText="Book a Table" 
              href="tel:08080090090" 
              variant="ghost" 
              className="min-w-40! py-4 px-1 text-sm text-center textDisplay"
            />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 w-8"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 bg-foreground transition-transform ${
                  menuOpen ? "-rotate-20 translate-y-1" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-foreground transition-transform ${
                  menuOpen ? "rotate-20 -translate-y-1" : ""
                }`}
              />
            </button>
          </div>
        </div>
        
      </div>
      <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden min-h-screen bg-background border-t border-border overflow-hidden flex items-start justify-center"
              >
                <nav className="flex flex-col justify-center items-center px-6 py-8 gap-4.5 mt-20">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-5xl! hover:text-foreground/60 text-display textDisplay uppercase font-medium tracking-tight ${
                        pathname === item.href ? "text-foreground/60!" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <CustomButton 
                    text="Make Reservation" 
                    // hoverText="Book a Table" 
                    onClick={() => setMenuOpen(false)}
                    href="tel:08080090090" 
                    variant="primary" 
                    className="min-w-55! text-lg text-[#fff] mt-8 py-6 px-2 text-center"
                  />
                  <div className="flex justify-center items-center gap-6 mt-6 ml-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                    <a
                      href="https://www.tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-[19px] stroke-muted-foreground hover:stroke-foreground transition-all">
                        <path stroke="inherit" stroke-linejoin="round" d="M16 1.5h-3.5V16c0 1.5 -1.5 3 -3 3s-3 -0.5 -3 -3c0 -2 1.899 -3.339 3.5 -3V9.5c-6.12 0 -7 5 -7 6.5s0.977 6.5 6.5 6.5c4.522 0 6.5 -3.5 6.5 -6v-8c1.146 1.018 2.922 1.357 5 1.5V6.5c-3.017 0 -5 -2.654 -5 -5Z" stroke-width="1.8"></path>
                      </svg>
                    </a>
                  </div>
                  <div className="py-8 overflow-hidden marquee ">
                    <div className="flex animate-marquee whitespace-nowrap">
                      {[...work, ...work].map((name, i) => (
                        <span
                          key={`${name}-${i}`}
                          className="text-lg! font-medium mx-3 md:mx-6 text-foreground"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
    </nav>
  )
}
