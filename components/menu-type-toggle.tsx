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
        onClick={() => selectType("drinks")}
        onClick={() => selectType("drinks")}
        variant={menuType === "drinks" ? "primary" : "ghost"}
        className={`py-2 px-3 text-sm! min-w-20! sm:min-w-30! text-center text-nowrap font-bold! ${menuType === "drinks" ? "text-[#fff]" : ""}`}
      />

      <CustomButton
        text="Food Menu"
        // hoverText="View Prices"
        onClick={() => selectType("food")}
        variant={menuType === "food" ? "primary" : "ghost"}
        className={`py-2 px-3 min-w-20! sm:min-w-30! text-sm text-center text-nowrap font-bold! ${menuType === "food" ? "text-[#fff]" : "text-foreground"}`}
      />
    </div>
  )
}
