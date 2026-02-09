// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'
// import DynamicText from "./kokonutui/dynamic-text"
// import TypewriterTitle from "@/components/kokonutui/type-writer"
// import HeroCarousel from '@/components/HeroCarousel'
import HeroSwiper from '@/components/Swiper/Swiper'
// import Slider from '@/components/slider/slider'
// import heroBg from '@/public/images/bar drink pour.webp'

export function HeroSection() {
  return (
    <section className="hero relative min-h-screen flex justify-center overflow-hidden">
      <div className="relative z-20 w-full flex items-center justify-center">
        <HeroSwiper />
        {/* <HeroCarousel /> */}
      </div>
    </section>
  )
}
