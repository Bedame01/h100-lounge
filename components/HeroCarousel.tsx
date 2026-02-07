'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'
import TypewriterTitle from "@/components/kokonutui/type-writer"
// import DynamicText from "./kokonutui/dynamic-text"

export default function HeroCarousel() {
  return (
    <section className="w-full h-screen">
      <Splide
        options={{
          type: 'fade',          // Fade transition
          rewind: true,          // Loop back to start
          autoplay: false,        // Auto slide
          interval: 5000,        // 5 seconds
          speed: 1200,           // Fade speed
          pauseOnHover: false,
          pauseOnFocus: false,
          arrows: false,         // Show arrows (hero style)
          pagination: true,      // Dots navigation
          drag: true,
        }}
        className="h-full w-full"
      >
        {/* Slide 1 */}
        <SplideSlide>
          <div
            className="h-screen bg-cover bg-blend-soft-light bg-background bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/images/hero1.webp')" }}
          >
            <div className="text-center">
              {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Build Stunning Websites
              </h1>
              <p className="text-lg md:text-xl">
                Modern UI • Fast Performance • Scalable
              </p> */}
              <h1 className="textDisplay text-5xl sm:text-6xl lg:text-7xl font-medium mb-6 text-balance uppercase">
                H100 Lounge
                <br />
                Premium Vibe.
              </h1>
      
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl! mx-auto mb-8 text-pretty!">
                Step into a refined atmosphere of great music, signature cocktails, and unforgettable moments—crafted for those who appreciate the finer side of nightlife.
              </p>
      
              <div className="flex flex-col sm:flex-row items-center justify-center pb-10 gap-4">
                <CustomButton 
                  text="View Menu" 
                  // hoverText="Explore Our Offerings" 
                  href="/menu" 
                  variant="primary" 
                  className="min-w-45 text-[#fff]!"
                />
                <CustomButton 
                  text="Reserve Now" 
                  // hoverText="Explore Our Offerings" 
                  href="/menu" 
                  variant="ghost" 
                  className="min-w-43 hover:bg-foreground hover:text-background!"
                />
              </div>
            </div>
          </div>
        </SplideSlide>

        {/* Slide 2 */}
        <SplideSlide>
          <div
            className="hero-slider h-screen bg-cover bg-blend-soft-light bg-background bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/images/hero2.jpg')" }}
          >
            <div className="text-center">
              {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Build Stunning Websites
              </h1>
              <p className="text-lg md:text-xl">
                Modern UI • Fast Performance • Scalable
              </p> */}
              <h1 className="textDisplay text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance uppercase">
                Relax, Refresh
                <br />
                And Repeat.
              </h1>
      
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
                From expertly mixed cocktails to smooth wines and premium spirits, our lounge is the perfect escape to unwind and connect.
              </p>
      
              <div className="flex flex-col sm:flex-row items-center justify-center pb-10 gap-4">
                <CustomButton 
                  text="View Menu" 
                  // hoverText="Explore Our Offerings" 
                  href="/menu" 
                  variant="primary" 
                  className="min-w-45 text-[#fff]!"
                />
                <CustomButton 
                  text="Reserve Now" 
                  // hoverText="Explore Our Offerings" 
                  href="/menu" 
                  variant="ghost" 
                  className="min-w-43 hover:bg-foreground hover:text-background!"
                />
              </div>
            </div>
          </div>
        </SplideSlide>

        {/* Slide 3 */}
        <SplideSlide>
          <div
            className="h-screen bg-cover bg-blend-soft-light bg-background bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/images/hero3.png')" }}
          >
            <div className="text-center">
              {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Build Stunning Websites
              </h1>
              <p className="text-lg md:text-xl">
                Modern UI • Fast Performance • Scalable
              </p> */}
              <h1 className="textDisplay text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance uppercase">
                Good Drinks, Music
                <br />
                & Great Energy
              </h1>
      
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
                Whether it’s a casual hangout or a night to remember, enjoy an atmosphere designed to keep the vibes flowing all night long.
              </p>
      
              <div className="flex flex-col sm:flex-row items-center justify-center pb-10 gap-4">
                <CustomButton 
                  text="View Menu" 
                  // hoverText="Explore Our Offerings" 
                  href="/menu" 
                  variant="primary" 
                  className="min-w-45 text-[#fff]!"
                />
                <CustomButton 
                  text="Reserve Now" 
                  // hoverText="Explore Our Offerings" 
                  href="/menu" 
                  variant="ghost" 
                  className="min-w-43 hover:bg-foreground hover:text-background!"
                />
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </section>
  );
}