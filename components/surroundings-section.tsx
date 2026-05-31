"use client"

import Image, { type StaticImageData } from "next/image"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import heroLounge from "@/public/images/hero1.webp"
import crystalCelebration from "@/public/images/Elegant Crystal Glass Celebration.png"
import drinkPour from "@/public/images/drink pouring from glass.avif"
import wineGlass from "@/public/images/Elegant Wine Glass.png"
import loungeEnergy from "@/public/images/image1.png"
import heroAmbiance from "@/public/images/hero3.png"

type Space = {
  title: string
  subtitle: string
  image: StaticImageData
  gridClass: string
}

const spaces: Space[] = [
  {
    title: "The Main Lounge",
    subtitle: "Refined seating, ambient lighting, and an atmosphere built for unwinding",
    image: heroLounge,
    gridClass: "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[520px]",
  },
  {
    title: "Signature Bar",
    subtitle: "Craft cocktails poured with precision",
    image: drinkPour,
    gridClass: "md:col-span-5 min-h-[240px]",
  },
  {
    title: "Celebration Moments",
    subtitle: "Crystal, sparkle, and nights worth remembering",
    image: crystalCelebration,
    gridClass: "md:col-span-5 min-h-[240px]",
  },
  {
    title: "Wine & Spirits",
    subtitle: "Curated pours for the discerning palate",
    image: wineGlass,
    gridClass: "md:col-span-4 min-h-[260px]",
  },
  {
    title: "Live Energy",
    subtitle: "Music, conversation, and the H100 vibe",
    image: loungeEnergy,
    gridClass: "md:col-span-8 min-h-[260px]",
  },
  {
    title: "Evening Ambiance",
    subtitle: "Where every night feels like an occasion",
    image: heroAmbiance,
    gridClass: "md:col-span-12 min-h-[220px] md:min-h-[280px]",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

function SpaceCard({ space, index }: { space: Space; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm ${space.gridClass}`}
    >
      <Image
        src={space.image}
        alt={space.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        priority={index < 2}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5 transition-opacity duration-500 group-hover:from-black/85" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
        <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
          0{index + 1}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-white tracking-tight">
          {space.title}
        </h3>
        <p className="mt-1.5 max-w-md text-sm text-white/75 line-clamp-2 opacity-90 transition-all duration-500 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-20">
          {space.subtitle}
        </p>
      </div>
    </motion.article>
  )
}

export function SurroundingsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section
      ref={sectionRef}
      id="surroundings"
      className="relative py-20 md:py-28 bg-background overflow-hidden"
      aria-labelledby="surroundings-heading"
    >
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16"
        >
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold tracking-wide text-accent mb-3">
              • Our Surroundings •
            </span>
            <h2
              id="surroundings-heading"
              className="text-4xl md:text-5xl font-medium text-foreground tracking-tighter"
            >
              Step Inside
              <span className="font-serif font-medium"> H100</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md lg:text-right leading-tight">
            Every corner of our lounge is designed for comfort, conversation, and celebration—from
            the lounge to the VIP atmosphere.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
        >
          {spaces.map((space, i) => (
            <SpaceCard key={space.title} space={space} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-300"
          >
            Discover our story
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
