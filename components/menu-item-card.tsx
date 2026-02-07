import { ImageIcon } from "lucide-react"
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

export function MenuItemCard({ item, index }: MenuItemCardProps) {
  const hasSizeOptions = item.size_options && item.size_options.length > 0

  return (
    <div className="flex gap-6 items-start">
      {/* Image */}
      <div className="flex-shrink-0 size-25 rounded-sm overflow-hidden bg-muted/50 border border-border/50">
        {item.image_url ? (
          <Image
            src={item.image_url || "/placeholder.svg"}
            alt={item.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
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
                className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  badge === "CHEF RECOMMENDED"
                    ? "bg-amber-600 text-white"
                    : badge === "NEW"
                      ? "bg-green-500 text-white"
                      : badge === "ORDER"
                        ? "bg-neutral-800 text-white"
                        : "bg-primary/10 text-primary"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Title and Price */}
        <div className="flex items-start justify-between gap-4 mb-2 border-b border-border pb-2">
          <h3 className="font-sans text-base font-bold uppercase text-balance">{item.name}</h3>
          <div className="text-right flex-shrink-0">
            {hasSizeOptions ? (
              <div className="flex gap-3 items-center text-sm">
                {item.size_options!.map((option, i) => (
                  <span key={i} className="whitespace-nowrap">
                    <span className="font-medium text-muted-foreground uppercase text-xs">{option.size}</span>{" "}
                    <span className="font-semibold">₦{option.price.toFixed(2)}</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-semibold text-accent text-base">₦{item.price.toFixed(2)}</span>
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