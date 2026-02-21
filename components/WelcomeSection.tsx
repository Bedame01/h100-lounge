"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import  ScrollReveal from "@/components/ScrollReveal"
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'

const contactLinks = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Victoria Island, Lagos",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+234 800 H100",
    href: "tel:+234800H100",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@H100lounge.com",
    href: "mailto:hello@H100lounge.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Tue-Sun: 6PM - 2AM",
    href: null,
  },
]

export function WelcomeSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">   
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <div className="max-w-3xl m-auto! space-y-6 flex flex-col justify-center items-center">
            <div className="inline-block">
              <span className="font-medium tracking-normal text-lg text-accent">
                • Welcome to H100 •
              </span>
            </div>
            
            {/* <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-balance">
              Where Elegance Meets
              <span className="text-primary"> Exceptional Taste</span>
            </h2> */}

            <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={6}
                blurStrength={9}
                textClassName="text-3xl/12! md:text-4xl/14! italic font-serif font-thin! text-pretty!"
            >
              "H100 Lounge is more than a destination—it's an experience. Nestled in the heart of Abeokuta, 
              we've crafted a sanctuary where sophistication meets warmth, and every evening becomes 
              a celebration of life's finer moments."
            </ScrollReveal>

            <p>- H100 Management</p>
            
            <div className="flex flex-wrap gap-4 pt-2 mt-3">
              <CustomButton 
                text="Get to Know Us More" 
                href="/about" 
                variant="ghost" 
                className="min-w-full! py-6 px-6! text-xs! text-center uppercase text-foreground! rounded-0!"
              />
            </div>
          </div>
          
          {/* Right: Quick Contact Cards */}
          {/* <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold mb-6 text-center lg:text-left">
              Get in Touch
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {contactLinks.map((contact) => {
                const content = (
                  <div
                    className={`flex items-start gap-4 p-5 rounded-xl border border-border bg-card/50 
                      transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg
                      ${contact.href ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <contact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground font-medium mb-1">
                        {contact.label}
                      </p>
                      <p className="text-foreground font-medium truncate">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                )
                
                if (contact.href) {
                  return (
                    <Link
                      key={contact.label}
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {content}
                    </Link>
                  )
                }
                
                return <div key={contact.label}>{content}</div>
              })}
            </div> */}
            
            {/* Social Links */}
            {/* <div className="mt-6 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-center text-sm text-muted-foreground mb-3">
                Follow us for exclusive updates and events
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="https://instagram.com/H100lounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com/H100lounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
                <Link
                  href="https://facebook.com/H100lounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  )
}
