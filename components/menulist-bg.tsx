'use client'

import { useTheme } from "next-themes"
import Image from "next/image"
import BG from '@/public/icons/BG-white.png'
import BGBlack from '@/public/icons/BG-black.png'

const MenuBg = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className="menuBg fixed inset-0 -z-1 w-full h-full !pt-205">
            <Image 
            src={`${theme === "light" ? BGBlack.src : BG.src}`}
            alt="Background"
            layout="fill"
            objectFit="contain"
            className="!size-[70%] !m-auto object-cover opacity-5"
            />
        </div>
    )
}

export default MenuBg