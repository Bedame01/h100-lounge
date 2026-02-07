"use client";

/**
 * @author: @dorianbaffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Welcome to", language: "English" },
  { text: "ようこそ", language: "Japanese" },
  { text: "bienvenue à", language: "French" },
  { text: "bienvenido a", language: "Spanish" },
  { text: "환영합니다", language: "Korean" },
  { text: "benvenuto a", language: "Italian" },
  { text: "willkommen zu", language: "German" },
  { text: "ようこそ", language: "Japanese" },
];

const DynamicText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <section
      aria-label="Rapid greetings in different languages"
      className="flex min-h-[20px] items-center justify-center gap-1 p-4"
    >
      <div className="relative flex h-16 w-60 items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              animate={textVariants.visible}
              aria-live="off"
              className="absolute flex items-center gap-2 font-medium text-md text-gray-800 dark:text-gray-200"
              exit={textVariants.exit}
              initial={textVariants.hidden}
              key={currentIndex}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div
                aria-hidden="true"
                className="size-1 rounded-full bg-foreground"
              />
              {greetings[currentIndex].text}👋🏽
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center gap-2 font-medium text-md text-gray-800 dark:text-gray-200">
            <div
              aria-hidden="true"
              className="size-1 rounded-full bg-foreground"
            />
            {greetings[0].text}👋🏽
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
