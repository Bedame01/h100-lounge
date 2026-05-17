"use client"

import { useState } from "react"
import { MenuVipToggle } from "@/components/menu-vip-toggle"
import { MenuItemCard } from "@/components/menu-item-card"
import type { MenuCategoryMeta, MenuItem } from "@/lib/menu-service"

interface MenuListWithToggleProps {
  categories: MenuCategoryMeta[]
  regularItems: MenuItem[]
  vipItems: MenuItem[]
}

export function MenuListWithToggle({ categories, regularItems, vipItems }: MenuListWithToggleProps) {
  const [isVip, setIsVip] = useState(false)
  const menuItems = isVip ? vipItems : regularItems

  return (
    <>
      <MenuVipToggle onToggle={setIsVip} />

      {categories.map((category) => {
        const categoryItems = menuItems.filter((item) => item.category_id === category.id)

        if (categoryItems.length === 0) return null

        return (
          <section key={category.id} className="py-6 px-2 sm:px-10! lg:px-18! last:border-b-0">
            <div className="container backdrop-blur supports-[backdrop-filter]:bg-card/65 rounded-sm border border-border mx-auto px-3.5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-14 boxShadow">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-3 priceCategory">{category.name}</h2>
                {category.description && (
                  <p className="text-muted-foreground text-base max-w-2xl mx-auto text-pretty">{category.description}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {categoryItems.map((item, index) => (
                  <MenuItemCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
