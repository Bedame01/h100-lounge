"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MenuVipToggle } from "@/components/menu-vip-toggle"
import { MenuTypeToggle, type MenuListType } from "@/components/menu-type-toggle"
import CustomButton from "@/components/kokonutui/CustomButton/CustomButton"
import { MenuItemCard } from "@/components/menu-item-card"
import type { FoodCategoryMeta, MenuCategoryMeta, MenuItem } from "@/lib/menu-service"

interface MenuListWithToggleProps {
  categories: MenuCategoryMeta[]
  regularItems: MenuItem[]
  vipItems: MenuItem[]
  foodCategories: FoodCategoryMeta[]
  foodItems: MenuItem[]
  cocktailsCategories?: MenuCategoryMeta[]
  cocktailsItems?: MenuItem[]
  mocktailsCategories?: MenuCategoryMeta[]
  mocktailsItems?: MenuItem[]
}

export function MenuListWithToggle({
  categories,
  regularItems,
  vipItems,
  foodCategories,
  foodItems,
  cocktailsCategories = [],
  cocktailsItems = [],
  mocktailsCategories = [],
  mocktailsItems = [],
}: MenuListWithToggleProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [menuType, setMenuType] = useState<MenuListType>(() => {
    const type = searchParams.get("type")
    return type === "food" ? "food" : "drinks"
  })
  const [isVip, setIsVip] = useState(true)
  const [showSpecial, setShowSpecial] = useState<'none' | 'cocktails' | 'mocktails'>(() => {
    const value = searchParams.get("special")
    return value === "cocktails" || value === "mocktails" ? value : "none"
  })

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("type", menuType)

    if (menuType === "food" || showSpecial === "none") {
      params.delete("special")
    } else {
      params.set("special", showSpecial)
    }

    const query = params.toString()
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname
    router.replace(nextUrl, { scroll: false })
  }, [menuType, showSpecial, router, searchParams])

  const isDrinks = menuType === "drinks"
  const drinkItems = isVip ? vipItems : regularItems
  const activeCategories = isDrinks ? categories : foodCategories
  const menuItems = isDrinks ? drinkItems : foodItems
  const hasSpecialMenus = cocktailsCategories.length > 0 || mocktailsCategories.length > 0

  // Only apply the special cocktails/mocktails list while the drinks tab is active.
  const isSpecialView = isDrinks && showSpecial !== 'none'
  const displayedCategories = isSpecialView
    ? showSpecial === 'cocktails'
      ? cocktailsCategories
      : mocktailsCategories
    : activeCategories
  const displayedItems = isSpecialView
    ? showSpecial === 'cocktails'
      ? cocktailsItems
      : mocktailsItems
    : menuItems

  const handleTypeToggle = (type: MenuListType) => {
    setMenuType(type)
    if (type === "food") {
      setShowSpecial('none')
    }
  }

  const handleVipToggle = (vip: boolean) => {
    setIsVip(vip)
    // when switching VIP/Regular ensure any special views are cleared
    if (showSpecial !== 'none') setShowSpecial('none')
  }

  return (
    <>
      <div className="w-full px-2 py-4 flex flex-wrap items-center justify-center gap-1 bg-background">
        <MenuTypeToggle onToggle={handleTypeToggle} />
        {/* {isDrinks && <MenuVipToggle onToggle={handleVipToggle} isSpecialActive={showSpecial !== 'none'} />} */}
        {hasSpecialMenus && (
          <div className="flex items-center gap-2">
            <CustomButton
              text="Cocktails"
              variant={showSpecial === 'cocktails' ? 'default' : 'ghost'}
              onClick={() => {
                setMenuType('drinks')
                setShowSpecial(showSpecial === 'cocktails' ? 'none' : 'cocktails')
              }}
              className="py-2 px-3 text-sm! min-w-20! sm:min-w-30!"
            />
            <CustomButton
              text="Mocktails"
              variant={showSpecial === 'mocktails' ? 'default' : 'ghost'}
              onClick={() => {
                setMenuType('drinks')
                setShowSpecial(showSpecial === 'mocktails' ? 'none' : 'mocktails')
              }}
              className="py-2 px-3 text-sm! min-w-20! sm:min-w-30!"
            />
          </div>
        )}
      </div>

      {displayedCategories.map((category) => {
        const categoryItems = displayedItems.filter((item) => item.category_id === category.id)

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
