import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import CustomButton from "@/components/kokonutui/CustomButton/CustomButton"

export const metadata = {
  title: "FAQ - H100 Lounge",
  description: "Everything you need to know about visiting H100 Lounge.",
}

const faqs = [
  {
    q: "What are your hours?",
    a: "Tue-Sun, 6 PM–2 AM. Kitchen closes at midnight. Mondays: Closed.",
  },
  {
    q: "Do I need a reservation?",
    a: "Walk-ins welcome, but we recommend reserving—especially weekends. Book online or call us.",
  },
  {
    q: "What's the dress code?",
    a: "Smart casual. Dress stylishly. No shorts, athletic wear, or flip-flops.",
  },
  {
    q: "Dietary restrictions?",
    a: "Yes. We accommodate vegetarian, vegan, gluten-free, and allergies. Let us know when booking.",
  },
  {
    q: "Private events?",
    a: "Yes. Groups of 20+. We offer custom packages. Contact our events team.",
  },
  {
    q: "Payment methods?",
    a: "All major credit cards, debit, mobile payment, and cash accepted.",
  },
  {
    q: "Is parking available?",
    a: "Complimentary valet parking. Street parking and garage available nearby.",
  },
  {
    q: "Happy Hour?",
    a: "Tue–Fri, 6–8 PM. Special pricing on select cocktails, wine, and small chops.",
  },
  {
    q: "Cancellation policy?",
    a: "24 hours notice for standard reservations. 48 hours for groups of 8+.",
  },
  {
    q: "Live entertainment?",
    a: "Jazz every Fri & Sat, 8 PM. Check our socials for the monthly calendar.",
  },
]

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-16">
        {/* Header */}
        <section className="py-13 md:py-18 px-4 text-center border-b border-border">
          <div className="container mx-auto max-w-3xl">
            <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-4">Questions</p>
            <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6">Frequently Asked</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Everything you need to know about H100 Lounge, right here.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border/50 py-4">
                  <AccordionTrigger className="text-left hover:text-accent transition-colors py-0">
                    <span className="font-medium text-lg">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-4 pb-0">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-2xl text-center">
            <MessageCircle className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Still curious?</h2>
            <p className="text-muted-foreground mb-8">Reach out directly. We're here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton 
                text="Get in Touch" 
                // hoverText="Book a Table" 
                href="/reservations" 
                variant="primary" 
                className="min-w-full py-5.5 px-1 text-sm text-center textDisplay text-[#fff]"
              />
              <CustomButton 
                text="Go to Homepage" 
                // hoverText="Book a Table" 
                href="/" 
                variant="ghost" 
                className="min-w-full py-5.5 px-1 text-sm text-center textDisplay"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
