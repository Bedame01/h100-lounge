"use client"

import { useState } from "react"
import ImageIcon from "@/components/icons/imageIcon"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  size_options: { size: string; price: number }[] | null
  badges: string[] | null
}

interface MenuItemCardProps {
  item: MenuItem
  index: number
}

function getBadgeClasses(badge: string) {
  const normalized = badge.toUpperCase().replace(/-/g, " ").trim()

  if (normalized === "H100 RECOMMENDED") {
    return "bg-gradient-to-r from-[#f5d76a] via-[#d8b85a] to-[#f7edc5] text-[#251d0d] border border-[#f5d76a]/80 shadow-[0_0_18px_rgba(245,215,106,0.35)]"
  }

  switch (normalized) {
    case "CHEF RECOMMENDED":
      return "bg-yellow-400 text-black"
    case "NEW":
      return "bg-lime-600 text-white"
    case "ORDER":
      return "bg-neutral-800 text-white"
    case "BESTSELLER":
      return "bg-rose-500 text-white"
    case "POPULAR":
      return "bg-cyan-600 text-white"
    case "HOUSE SPECIAL":
      return "bg-violet-600 text-white"
    default:
      return "bg-primary/10 text-primary"
  }
}

export function MenuItemCard({ item, index }: MenuItemCardProps) {
  const [imageSrc, setImageSrc] = useState(item.image_url || "/placeholder.svg")
  const hasSizeOptions = item.size_options && item.size_options.length > 0

  return (
    <div className="flex gap-3 sm:gap-6 items-start">
      {/* Image */}
      <div className="flex-shrink-0 size-25 overflow-hidden rounded-sm bg-foreground/5 border border-border/50">
        {item.image_url ? (
          <Image
            src={imageSrc}
            alt={item.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            onError={() => setImageSrc("/placeholder.svg")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="size-12 fill-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        {/* Badges */}
        {item.badges && item.badges.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {item.badges.map((badge, i) => (
              <span
                key={i}
                className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getBadgeClasses(badge)}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Title and Price */}
        <div className="flex items-start justify-between gap-4 mb-2 border-b border-border pb-2">
          <h3 className="font-sans text-base font-medium sm:font-semibold uppercase text-balance">{item.name}</h3>
          <div className="text-right flex-shrink-0">
            {hasSizeOptions ? (
              <div className="flex gap-3 items-center text-sm">
                {item.size_options!.map((option, i) => (
                  <span key={i} className="whitespace-nowrap">
                    <span className="font-medium text-muted-foreground uppercase text-xs">{option.size}</span>{" "}
                    <span className="font-bold! text-accent text-base md:text-lg mr-2 bg-accent/5 p-1 px-2 rounded-sm">₦{option.price.toLocaleString(undefined, { minimumFractionDigits: 2})}</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-bold! text-accent text-base md:text-lg mr-2 bg-accent/5 p-1 px-2 rounded-sm">₦{item.price.toLocaleString(undefined, { minimumFractionDigits: 2})}</span>
            )}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.description}</p>
        )}
      </div>
    </div>
  )
}