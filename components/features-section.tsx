// import { GlassWater, UtensilsCrossed } from "lucide-react"
// import CardFlip from "./kokonutui/card-flip"
// import Drinks from "@/components/icons/drink"
// import Dish from "@/components/icons/dish"
// import Sparkles from "@/components/icons/sparkles"
import { Card, CardContent } from "./ui/card"
import CustomButton from "./kokonutui/CustomButton/CustomButton"

export function FeaturesSection() {
  return (
    <section className="py-18 md:py-22 bg-[#fff] dark:bg-[#080101]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">Experience <span className="">Excellence</span></h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated menu featuring the finest ingredients and innovative culinary techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-border hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6">
                {/* <ChefHat className="h-12 w-12 text-accent dark:text-amber-400 mx-auto mb-4" /> */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="Chef-Hat-Heart--Streamline-Solar" className="h-13 w-13 fill-accent mx-auto mb-4">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 10c0 -2.76142 2.23858 -5 5 -5 0.25052 0 0.49673 0.01842 0.73736 0.05399C8.33961 3.27806 10.0206 2 12 2s3.6604 1.27806 4.2626 3.05399C16.5033 5.01842 16.7495 5 17 5c2.7614 0 5 2.23858 5 5 0 2.0503 -1.2341 3.8124 -3 4.584l0 2.666H5v-2.666C3.2341 13.8124 2 12.0503 2 10Zm9.0429 3.6693C10.1649 13.0251 9 11.9849 9 11.0004c0 -1.67319 1.65 -2.2979 3 -1.00534 1.35 -1.29256 3 -0.66785 3 1.00534 0 0.9845 -1.1648 2.0247 -2.0429 2.6689 -0.4197 0.308 -0.6296 0.462 -0.9571 0.462 -0.3275 0 -0.5374 -0.154 -0.9571 -0.462Z" fill="inherit" stroke-width="1"></path>
                  <path d="M5.58579 21.4142c-0.50236 -0.5023 -0.57391 -1.2673 -0.5841 -2.6642H18.9983c-0.0102 1.3969 -0.0817 2.1619 -0.5841 2.6642C17.8284 22 16.8856 22 15 22H9c-1.88562 0 -2.82843 0 -3.41421 -0.5858Z" fill="inherit" stroke-width="1"></path>
                </svg>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Expert Culinary Artists</h3>
                <p className="text-muted-foreground">
                  Our talented team brings years of experience and passion to every culinary delight.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Cocktail--Streamline-Core-Remix" className="h-11 w-11 fill-accent mx-auto mb-4">
                  <path id="Union" fill="inherit" fill-rule="evenodd" d="M2.24302 0C1.48748 0 0.875 0.612483 0.875 1.36802c0 0.30652 0.102944 0.60417 0.29232 0.84519L6.375 8.84117V12.75H4c-0.34518 0 -0.625 0.2798 -0.625 0.625S3.65482 14 4 14h6c0.3452 0 0.625 -0.2798 0.625 -0.625s-0.2798 -0.625 -0.625 -0.625H7.625V8.84116l5.2077 -6.62795c0.1894 -0.24103 0.2923 -0.53867 0.2923 -0.84519C13.125 0.612482 12.5125 0 11.757 0H2.24302ZM2.125 1.36802c0 -0.06518 0.05284 -0.11802 0.11802 -0.11802H11.757c0.0652 0 0.118 0.05284 0.118 0.11802 0 0.02644 -0.0089 0.05212 -0.0252 0.07291L10.1337 3.625H3.86627L2.15022 1.44093c-0.01634 -0.02079 -0.02522 -0.04647 -0.02522 -0.07291Z" clip-rule="evenodd" stroke-width="1"></path>
                </svg>
                {/* <Fish className="h-12 w-12 text-accent dark:text-amber-400 mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Signature Cocktails</h3>
                <p className="text-muted-foreground">
                  Expertly crafted drinks using premium spirits and fresh ingredients
                </p>
                <CustomButton 
                  text="View Price List" 
                  // hoverText="Book a Table" 
                  href="/menu" 
                  variant="ghost" 
                  className="min-w-50! py-4 px-1 mt-4 text-sm text-center textDisplay"
                />
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6">
                {/* <Utensils className="h-12 w-12 text-accent dark:text-amber-400 mx-auto mb-4" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Brunch-Dining-Fill--Streamline-Outlined-Fill-Material" className="h-13 w-13 fill-accent mx-auto mb-4">
                  <path fill="inherit" d="M2.75 22c-0.25 0 -0.4375 -0.0625 -0.5625 -0.1875S2 21.5 2 21.25V20h14.25v1.25c0 0.25 -0.0625 0.4375 -0.1875 0.5625S15.75 22 15.5 22H2.75ZM2 18.4v-1.25c0 -0.25 0.0625 -0.4375 0.1875 -0.5625S2.5 16.4 2.75 16.4h4.55v-1.825h3.65v1.825H15.5c0.25 0 0.4375 0.0625 0.5625 0.1875s0.1875 0.3125 0.1875 0.5625v1.25H2ZM18.6 22V15.4c-0.51665 -0.43335 -0.9625 -1.00835 -1.3375 -1.725 -0.375 -0.71665 -0.5625 -1.525 -0.5625 -2.425V2H22v9.25c0 0.9 -0.1875 1.70835 -0.5625 2.425 -0.375 0.71665 -0.82085 1.29165 -1.3375 1.725V20.5H22v1.5h-3.4Zm-0.4 -14.025H20.5V3.5h-2.3v4.475Z" stroke-width="0.5"></path>
                </svg>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Fine Dining</h3>
                <p className="text-muted-foreground">
                  Sophisticated atmosphere perfect for special occasions and memorable evenings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}
