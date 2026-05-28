"use client"

import { useState } from "react"
import CustomButton from "@/components/kokonutui/CustomButton/CustomButton"

export type MenuListType = "drinks" | "food"

interface MenuTypeToggleProps {
  onToggle: (type: MenuListType) => void
  initialType?: MenuListType
}

export function MenuTypeToggle({ onToggle, initialType = "drinks" }: MenuTypeToggleProps) {
  const [menuType, setMenuType] = useState<MenuListType>(initialType)

  const selectType = (type: MenuListType) => {
    setMenuType(type)
    onToggle(type)
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <CustomButton
        text="Drinks"
        // hoverText="View Prices"
        href=""
        onClick={() => selectType("drinks")}
        variant={menuType === "drinks" ? "primary" : "ghost"}
        className={`min-w-20! py-0 px-1 text-xs text-center rounded-sm text-nowrap font-bold! ${menuType === "drinks" ? "text-[#fff]" : ""}`}
      />

      <CustomButton
        text="Food Menu"
        // hoverText="View Prices"
        href=""
        onClick={() => selectType("food")}
        variant={menuType === "food" ? "primary" : "ghost"}
        className={`min-w-20! py-0 px-1 text-xs text-center text-nowrap rounded-sm font-bold! ${menuType === "food" ? "text-[#fff]" : "text-foreground"}`}
      />
    </div>
  )
}
