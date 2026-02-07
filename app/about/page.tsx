import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Award, Clock, Heart, Users } from "lucide-react"

import aboutBg from "@/public/images/hero1.webp"

export const metadata = {
  title: "About Us - H100 Lounge",
  description: "Learn about H100 Lounge's story, our commitment to excellence, and what makes us unique.",
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background z-10" />
          {/* <Image
            src="/luxury-dark-bar-interior-with-ambient-lighting.jpg"
            alt="H100 Lounge Interior"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="relative z-20 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance textDisplay">Our Story</h1>
            <h1 className="text-sm md:text-base font-bold mb-4 text-balance text-accent uppercase">From the Beginning</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Where elegance meets exceptional experiences
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 md:px-10! lg:px-15! grid md:grid-cols-2 gap-12 md:gap-13 py-12 md:py-20 lg:py-28">
          <div className="aboutimg md:order-last bg-background max-w-3xl mx-auto h-80 sm:h-120 overflow-hidden rounded-xl">
            <Image
              src={aboutBg}
              alt="H100 Lounge Interior"
              className="object-cover size-fit"
            />
          </div>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-left textDisplay">About H100 Lounge.</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-sm sm:text-base leading-snug">
              <p className="text-muted-foreground mb-6">
                H100 Lounge was founded with a singular vision: to create an intimate sanctuary where discerning guests
                can escape the ordinary and immerse themselves in refined luxury. Since our inception, we have been
                committed to delivering extraordinary experiences through impeccable service, artisanal cocktails, and
                culinary excellence.
              </p>
              <p className="text-muted-foreground mb-6">
                Our expert mixologists craft each cocktail with precision and creativity, using premium spirits and
                fresh ingredients to create drinks that are as beautiful as they are delicious. Our culinary team brings
                the same dedication to our menu of exquisite small chops, combining traditional flavors with modern
                techniques.
              </p>
              <p className="text-muted-foreground">
                Every detail at H100 Lounge, from our sophisticated ambiance to our carefully curated music selection,
                is designed to create an atmosphere of refined elegance where memorable moments are made.
              </p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2">
          <div className="overflow-hidden bg-background w-full mx-auto h-80 sm:h-120">
            <Image
              src={aboutBg}
              alt="H100 Lounge Interior"
              className="object-cover size-fit"
            />
          </div>

          <div className="overflow-hidden bg-black flex flex-col items-center justify-center w-full mx-auto h-80 sm:h-120">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance textDisplay">Our Story</h1>
            <h1 className="text-sm md:text-base font-bold mb-4 text-balance text-accent uppercase">From the Beginning</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Where elegance meets exceptional experiences
            </p>
          </div>

          <div className="overflow-hidden bg-background md:order-last w-full mx-auto h-80 sm:h-120">
            <Image
              src={aboutBg}
              alt="H100 Lounge Interior"
              className="object-cover size-fit"
            />
          </div>

          <div className="overflow-hidden bg-black flex flex-col items-center justify-center w-full mx-auto h-80 sm:h-120">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance textDisplay">Our Story</h1>
            <h1 className="text-sm md:text-base font-bold mb-4 text-balance text-accent uppercase">From the Beginning</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Where elegance meets exceptional experiences
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, from service to our craft cocktails.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Passion</h3>
                <p className="text-muted-foreground">
                  Our team is passionate about creating memorable experiences for every guest.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a welcoming environment where everyone feels valued and appreciated.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Timeless</h3>
                <p className="text-muted-foreground">
                  Classic sophistication with a contemporary edge that never goes out of style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Team</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              Behind every exceptional experience at H100 Lounge is a dedicated team of professionals. Our expert
              mixologists, talented chefs, and attentive service staff work in harmony to ensure your visit is nothing
              short of extraordinary. Each team member brings years of experience and a genuine passion for hospitality,
              creating the warm yet sophisticated atmosphere that defines H100 Lounge.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience H100 Lounge</h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Join us for an unforgettable evening of exceptional cocktails, delicious cuisine, and refined elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/reservations"
                className="inline-flex items-center justify-center h-10 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Book a Table
              </a>
              <a
                href="/menu"
                className="inline-flex items-center justify-center h-10 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
              >
                View Menu
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
