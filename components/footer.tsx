'use client'

import Link from "next/link"
import { useTheme } from "next-themes"
import logoLight from '@/public/icons/logo-white.png'
import logoDark from '@/public/icons/logo-black.png'

export function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="bg-card/30 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="mb-4 inline-block">
              {theme === "dark" ? (
                <img src={logoLight.src} alt="H100 Lounge Logo" className="h-auto w-15" />
              ) : (
                <img src={logoDark.src} alt="H100 Lounge Logo" className="h-auto w-15" />
              )}
            </Link>
            <p className="text-muted-foreground text-sm text-pretty">
              A sanctuary of sophistication where every evening becomes an occasion. Relax, Refresh and Repeat
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4 textDisplay">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Menu
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link
                href="/reservations"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Reservations
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 textDisplay">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link href="/policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy & Terms
              </Link>
              <Link
                href="/admin/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Portal
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 textDisplay">Hours</h4>
            <p className="text-sm text-muted-foreground">
              Tuesday - Sunday
              <br />
              6:00 PM - 2:00 AM
              <br />
              <span className="text-xs mt-2 block">Closed Mondays</span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} H100 Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
