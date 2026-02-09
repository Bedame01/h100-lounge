'use client'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomButton from '@/components/kokonutui/CustomButton/CustomButton'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Swiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HeroSwiper() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
            <div
                className="size-full bg-cover bg-blend-soft-light bg-background bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/hero1.webp')" }}
                >
                <div className="text-center">
                    <p className="font-medium mt-7 mb-8 text-xs uppercase">• Exclusive Lounge and Bar •</p>
                    <h1 className="textDisplay text-5xl sm:text-6xl lg:text-7xl font-medium mb-6 text-balance uppercase">
                    H100 Lounge
                    <br />
                    Premium Vibe.
                    </h1>
            
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl! mx-auto text-pretty!">
                    Step into a refined atmosphere of great music, signature cocktails, and unforgettable moments—crafted for those who appreciate the finer side of nightlife.
                    </p>
            
                    <div className="flex flex-col sm:flex-row items-center justify-center mt-12 pb-10 gap-5">
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
                            href="/reservations" 
                            variant="ghost" 
                            className="min-w-43 hover:bg-foreground hover:text-background!"
                        />
                    </div>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div
                className="hero-slider size-full bg-cover bg-blend-soft-light bg-background bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/Elegant Crystal Glass Celebration.png')" }}
                >
                <div className="text-center">
                    <p className="font-medium mt-7 mb-8 text-xs uppercase">• Exclusive Lounge and Bar •</p>
                    <h1 className="textDisplay text-5xl sm:text-6xl lg:text-7xl font-medium mb-6 text-balance uppercase">
                    Relax, Refresh
                    <br />
                    And Repeat.
                    </h1>
            
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                    From expertly mixed cocktails to smooth wines and premium spirits, our lounge is the perfect escape to unwind and connect.
                    </p>
            
                    <div className="flex flex-col sm:flex-row items-center justify-center pb-10 mt-12 gap-5">
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
                        href="/reservations" 
                        variant="ghost" 
                        className="min-w-43 hover:bg-foreground hover:text-background!"
                    />
                    </div>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div
                className="size-full bg-cover bg-blend-soft-light bg-background bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/image1.png')" }}
                >
                <div className="text-center">
                    <p className="font-medium mt-7 mb-8 text-xs uppercase">• Exclusive Lounge and Bar •</p>
                    <h1 className="textDisplay text-5xl sm:text-6xl lg:text-7xl font-medium mb-6 text-balance uppercase">
                    Good Drinks
                    <br />
                    & Great Energy
                    </h1>
            
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                    Whether it’s a casual hangout or a night to remember, enjoy an atmosphere designed to keep the vibes flowing all night long.
                    </p>
            
                    <div className="flex flex-col sm:flex-row items-center justify-center pb-10 mt-12 gap-5">
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
                        href="/reservations" 
                        variant="ghost" 
                        className="min-w-43 hover:bg-foreground hover:text-background!"
                    />
                    </div>
                </div>
            </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
