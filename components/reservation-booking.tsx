"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Calendar,
  Clock,
  Users,
  Sofa,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Info,
  Phone,
} from "lucide-react"
import { createReservation } from "@/app/actions/reservations"

const TIME_SLOTS = [
  "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30",
]

const SEATING_AREAS = [
  {
    id: "main_lounge",
    name: "Main Lounge",
    description: "Low tables, relaxed atmosphere",
    icon: Sofa,
  },
  {
    id: "bar_counter",
    name: "Bar Counter",
    description: "High stools, interactive",
    icon: Users,
  },
]

function generateDateRange(startDate: Date, count: number) {
  const dates = []
  for (let i = 0; i < count; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    dates.push(d)
  }
  return dates
}

function formatDay(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ReservationBooking() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Date state
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  // Time state
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Guests state
  const [guestCount, setGuestCount] = useState(4)

  // Seating state
  const [seatingArea, setSeatingArea] = useState("main_lounge")

  // Details state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [hasSpecialRequest, setHasSpecialRequest] = useState(false)
  const [specialRequests, setSpecialRequests] = useState("")

  const visibleDates = useMemo(() => {
    const start = new Date(today)
    start.setDate(today.getDate() + weekOffset * 6)
    return generateDateRange(start, 6)
  }, [today, weekOffset])

  const canGoPrev = weekOffset > 0
  const canGoNext = weekOffset < 8

  const selectedSeating = SEATING_AREAS.find((s) => s.id === seatingArea)

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !firstName || !lastName || !email) {
      setError("Please fill in all required fields.")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.set("guest_name", `${firstName} ${lastName}`)
    formData.set("guest_email", email)
    formData.set("guest_phone", phone || "N/A")
    formData.set(
      "reservation_date",
      `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    )
    formData.set("reservation_time", selectedTime)
    formData.set("party_size", String(guestCount))
    formData.set("seating_area", seatingArea)
    if (hasSpecialRequest && specialRequests) {
      formData.set("special_requests", specialRequests)
    }

    try {
      const result = await createReservation(formData)
      if (result.error) {
        setError(result.error)
      } else {
        router.push("/reservations/success")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-12 lg:py-20 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
          {/* Left Column - Form */}
          <div className="space-y-12">
            {/* Header */}
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-3">Book a Table</h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl text-pretty">
                Experience an evening of refined cocktails and ambient sounds.
                Select your preferences below to secure your spot.
              </p>
            </div>

            {/* Date Selection */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Select Date</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
                    disabled={!canGoPrev}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center
                      text-muted-foreground hover:text-foreground hover:border-foreground/50
                      transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous dates"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeekOffset((w) => Math.min(8, w + 1))}
                    disabled={!canGoNext}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center
                      text-muted-foreground hover:text-foreground hover:border-foreground/50
                      transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next dates"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {visibleDates.map((date) => {
                  const isSelected =
                    selectedDate.toDateString() === date.toDateString()
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 w-[100px] py-4 rounded-xl border text-center transition-all duration-200
                        ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/50"
                            : "border-border bg-card hover:border-foreground/30 text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <div className="text-[11px] font-medium tracking-widest uppercase opacity-70">
                        {formatMonth(date)}
                      </div>
                      <div className="text-2xl font-bold my-1">{date.getDate()}</div>
                      <div className="text-xs opacity-60">{formatDay(date)}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Select Time</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200
                        ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card hover:border-foreground/30 text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Guests + Seating Row */}
            <div className="grid sm:grid-cols-2 gap-10">
              {/* Guest Count */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold">Guests</h2>
                  </div>
                  <span className="text-3xl font-bold tabular-nums">{guestCount}</span>
                </div>
                <Slider
                  value={[guestCount]}
                  onValueChange={(v) => setGuestCount(v[0])}
                  min={1}
                  max={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>12</span>
                </div>
              </div>

              {/* Seating Area */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Sofa className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Seating Area</h2>
                </div>
                <div className="space-y-3">
                  {SEATING_AREAS.map((area) => {
                    const isSelected = seatingArea === area.id
                    const Icon = area.icon
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSeatingArea(area.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                          ${
                            isSelected
                              ? "border-accent bg-accent/5 ring-1 ring-accent/50"
                              : "border-border bg-card hover:border-foreground/30"
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center
                          ${isSelected ? "bg-accent/20 text-primary" : "bg-muted text-muted-foreground"}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{area.name}</div>
                          <div className="text-xs text-muted-foreground">{area.description}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all
                          ${isSelected ? "border-accent bg-accent" : "border-muted-foreground/40"}`}
                        >
                          {isSelected && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Details</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    First Name
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="h-12 bg-card border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Last Name
                  </label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="h-12 bg-card border-border"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="h-12 bg-card border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="h-12 bg-card border-border"
                />
              </div>

              {/* Special Request Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <Checkbox
                  id="special-request"
                  checked={hasSpecialRequest}
                  onCheckedChange={(checked) => setHasSpecialRequest(checked === true)}
                />
                <label htmlFor="special-request" className="text-sm text-muted-foreground cursor-pointer">
                  I have a special request for this reservation.
                </label>
              </div>
              {hasSpecialRequest && (
                <Textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Dietary restrictions, celebrations, accessibility needs..."
                  className="bg-card border-border min-h-[100px]"
                />
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Mobile Submit */}
            <div className="lg:hidden">
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !selectedTime}
                size="lg"
                className="w-full h-14 text-base font-semibold group bg-accent"
              >
                {isLoading ? "Confirming..." : "Confirm Reservation"}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column - Sticky Summary */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-0">
                <h3 className="font-serif text-xl font-bold mb-6">Summary</h3>

                <div className="divide-y divide-border">
                  <div className="flex justify-between items-center py-4">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold">{formatFullDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-semibold text-primary">{selectedTime || "--:--"}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-semibold">
                      {guestCount} {guestCount === 1 ? "Person" : "People"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-muted-foreground">Seating</span>
                    <span className="font-semibold">{selectedSeating?.name}</span>
                  </div>
                </div>

                {/* Notice */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50 flex gap-3">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Please inform our staff of any food allergies or dietary restrictions when placing your order.
                  </p>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !selectedTime}
                  size="lg"
                  className="w-full h-14 mt-6 text-base font-semibold group bg-accent"
                >
                  {isLoading ? "Confirming..." : "Confirm Reservation"}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Help */}
              <p className="text-center text-sm text-muted-foreground">
                Need help?{" "}
                <a href="tel:+234800H100" className="text-primary hover:underline inline-flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Call the concierge
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
