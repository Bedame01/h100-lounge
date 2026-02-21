import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter, Playfair_Display, Raleway} from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import '@splidejs/react-splide/css';
import "./globals.css"
import favicon from "@/public/icons/favicon.png"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})
const _playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})
const _raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alt-sans",
})

export const metadata: Metadata = {
  title: "H100 Lounge and Bar - Relax, Refresh and Repeat",
  description:
    "Experience sophistication at H100 Lounge and Bar. Premium Drinks and an atmosphere of refined elegance.",
  // generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/public/icons/favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/public/icons/favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/public/icons/favicon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/public/icons/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href={favicon.src} type="image/png" />
      </head>
      <body className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
