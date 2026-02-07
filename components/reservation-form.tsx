"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createReservation } from "@/app/actions/reservations"
// import CustomButton from "@/components/kokonutui/CustomButton/CustomButton"

export function ReservationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await createReservation(formData)

      if (result.error) {
        setError(result.error)
      } else {
        router.push("/reservations/success")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="font-serif text-2xl font-extrabold">Reservation Details</CardTitle>
        <CardDescription>Fill out the form below to reserve your table</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="guest_name">Full Name</Label>
            <Input id="guest_name" name="guest_name" type="text" required placeholder="John Doe" className="py-5.5 shadow-none text-sm font-medium" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="guest_email">Email</Label>
            <Input id="guest_email" name="guest_email" type="email" required placeholder="john@example.com" className="py-5.5 shadow-none text-sm font-medium" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="guest_phone">Phone Number</Label>
            <Input
              id="guest_phone"
              name="guest_phone"
              type="tel"
              required
              placeholder="+234 800 000 0000"
              pattern="[+]?[0-9\s-]+"
              className="py-5.5 shadow-none text-sm font-medium"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="reservation_date">Date</Label>
              <Input
                id="reservation_date"
                name="reservation_date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="py-5.5 shadow-none text-sm font-medium"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reservation_time">Time</Label>
              <Input id="reservation_time" name="reservation_time" type="time" required min="18:00" max="23:00" className="py-5.5 shadow-none text-sm font-medium" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="party_size">Party Size</Label>
            <Input id="party_size" name="party_size" type="number" required min="1" max="12" placeholder="2" className="py-5.5 shadow-none text-sm font-medium" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="special_requests">Special Requests (Optional)</Label>
            <Textarea
              id="special_requests"
              name="special_requests"
              placeholder="Any dietary restrictions, special occasions, or seating preferences..."
              rows={4}
              className="shadow-none text-sm font-medium"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit" size="lg" disabled={isLoading} className="w-full py-6 textDisplay cursor-pointer">
            {isLoading ? "Submitting..." : "Reserve Table"}
          </Button>

          {/* <CustomButton 
            text="Reserve Table" 
            href="" 
            variant="primary" 
            className="min-w-full textDisplay text-white"
          /> */}

          <p className="text-xs text-muted-foreground text-center text-pretty">
            Reservations are subject to availability. We'll contact you to confirm your booking.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
