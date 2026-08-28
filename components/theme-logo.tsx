import { cn } from "@/lib/utils"
import logoLight from "@/public/icons/logo-white.png"
import logoDark from "@/public/icons/logo-black.png"

interface ThemeLogoProps {
  className?: string
}

export function ThemeLogo({ className }: ThemeLogoProps) {
  return (
    <>
      <img src={logoDark.src} alt="H100 Lounge Logo" className={cn("h-auto dark:hidden", className)} />
      <img src={logoLight.src} alt="" aria-hidden="true" className={cn("hidden h-auto dark:block", className)} />
    </>
  )
}