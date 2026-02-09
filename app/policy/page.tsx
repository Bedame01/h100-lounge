import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Site Policy - H100 Lounge",
  description: "Terms of service, privacy policy, and other legal information for H100 Lounge.",
}

export default function PolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Policy</h1>
              <p className="text-lg text-muted-foreground">Last updated: January 2026</p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Terms of Service */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Terms of Service</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using the H100 Lounge website and services, you agree to be bound by these Terms of
                  Service. Please read them carefully.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground mb-4">
                  By making a reservation or using our services, you acknowledge that you have read, understood, and
                  agree to be bound by these terms and conditions, as well as any additional terms and conditions that
                  may apply to specific services.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">2. Reservations</h3>
                <p className="text-muted-foreground mb-4">
                  Reservations are subject to availability and confirmation. We reserve the right to cancel or modify
                  reservations at our discretion. Cancellations must be made at least 24 hours in advance for standard
                  reservations, and 48 hours for parties of 8 or more.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">3. Age Requirement</h3>
                <p className="text-muted-foreground mb-4">
                  H100 Lounge is an establishment serving alcoholic beverages. All guests must be 21 years of age or
                  older. Valid government-issued identification is required for entry and will be verified upon arrival.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">4. Conduct and Dress Code</h3>
                <p className="text-muted-foreground mb-4">
                  We maintain a sophisticated atmosphere and require all guests to adhere to our dress code and conduct
                  policies. We reserve the right to refuse service or ask guests to leave if behavior or attire is
                  deemed inappropriate.
                </p>
              </section>

              <Separator className="my-12" />

              {/* Privacy Policy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
                <p className="text-muted-foreground mb-4">
                  At H100 Lounge, we respect your privacy and are committed to protecting your personal information.
                  This policy explains how we collect, use, and safeguard your data.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Information We Collect</h3>
                <p className="text-muted-foreground mb-4">
                  When you make a reservation or interact with our website, we may collect:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Reservation preferences and special requests</li>
                  <li>Dietary restrictions and allergies</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Website usage data and analytics</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">How We Use Your Information</h3>
                <p className="text-muted-foreground mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Process and confirm reservations</li>
                  <li>Communicate important updates about your booking</li>
                  <li>Accommodate your dietary and seating preferences</li>
                  <li>Send promotional offers (with your consent)</li>
                  <li>Improve our services and user experience</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Data Protection</h3>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate security measures to protect your personal information. Your payment
                  information is encrypted and processed through secure third-party payment processors. We do not store
                  credit card information on our servers.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Third-Party Sharing</h3>
                <p className="text-muted-foreground mb-4">
                  We do not sell or rent your personal information to third parties. We may share information with
                  trusted service providers who assist in operating our website and conducting business, under strict
                  confidentiality agreements.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Your Rights</h3>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Access your personal information</li>
                  <li>Request corrections to your data</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <Separator className="my-12" />

              {/* Cookie Policy */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Cookie Policy</h2>
                <p className="text-muted-foreground mb-4">
                  Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on
                  your device that help us understand how you use our site.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website to function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings and preferences
                  </li>
                </ul>

                <p className="text-muted-foreground mb-4">
                  You can manage cookie preferences through your browser settings. However, disabling certain cookies
                  may affect website functionality.
                </p>
              </section>

              <Separator className="my-12" />

              {/* Contact Information */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about these policies or wish to exercise your privacy rights, please contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    <strong>Email:</strong> privacy@H100lounge.com
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Phone:</strong> +234 XXX XXX XXXX
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Address:</strong> H100 Lounge, Lagos, Nigeria
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
