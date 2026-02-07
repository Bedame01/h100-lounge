import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ - H100 Lounge and Bar",
  description: "Frequently asked questions about H100 Lounge and Bar, reservations, menu, and more.",
}

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about H100 Lounge and Bar. Can't find what you're looking for? Contact us directly.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">What are your operating hours?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  H100 Lounge and Bar is open Tuesday through Sunday from 6:00 PM to 2:00 AM. We are closed on Mondays. Our
                  kitchen serves food until 12:00 AM, and last call for drinks is at 1:30 AM.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Do I need a reservation?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While walk-ins are welcome based on availability, we highly recommend making a reservation to
                  guarantee your table, especially on weekends and special occasions. You can easily book a table
                  through our website or by calling us directly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What is your dress code?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We maintain a smart casual to business casual dress code. We encourage guests to dress stylishly.
                  Shorts, athletic wear, flip-flops, and overly casual attire are not permitted. When in doubt, dress up
                  rather than down to match our sophisticated atmosphere.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Do you accommodate dietary restrictions?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We're happy to accommodate various dietary restrictions and preferences including vegetarian, vegan,
                  gluten-free, and allergy concerns. Please inform your server or mention your requirements when making
                  a reservation, and our culinary team will ensure you have excellent options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">Can I host a private event at H100 Lounge and Bar?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! H100 Lounge and Bar is an ideal venue for private events, corporate gatherings, and celebrations. We
                  offer customizable packages for groups of 20 or more. Please contact our events team to discuss your
                  specific needs, preferred dates, and custom menu options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">What forms of payment do you accept?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and mobile payment
                  options. Cash is also welcomed. For your convenience, gratuity can be added to your payment method of
                  choice.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">Is there parking available?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we offer complimentary valet parking service for all our guests. Additionally, there is street
                  parking available nearby, and a public parking garage located two blocks away with reasonable evening
                  rates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">Do you have a Happy Hour?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Our Happy Hour runs Tuesday through Friday from 6:00 PM to 8:00 PM. Enjoy special pricing on
                  select cocktails, wine, and small chops. It's the perfect way to unwind after a long day.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left">What is your cancellation policy?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We request at least 24 hours' notice for reservation cancellations. This allows us to accommodate
                  other guests. For large party reservations (8 or more), we require 48 hours' notice. You can cancel or
                  modify your reservation by contacting us directly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left">Do you host live music or entertainment?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! We feature live jazz performances every Friday and Saturday evening from 8:00 PM. Our carefully
                  curated music program enhances the sophisticated ambiance without overwhelming conversation. Check our
                  website or social media for our monthly entertainment calendar.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">We're here to help. Feel free to reach out to us directly.</p>
              <a
                href="/reservations"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
