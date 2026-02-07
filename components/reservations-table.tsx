"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { updateReservationStatus, deleteReservation } from "@/app/actions/admin"
import { Trash2 } from "lucide-react"

interface Reservation {
  id: string
  guest_name: string
  guest_email: string
  guest_phone: string
  party_size: number
  reservation_date: string
  reservation_time: string
  seating_area: string | null
  special_requests: string | null
  status: "pending" | "confirmed" | "cancelled"
  created_at: string
}

interface ReservationsTableProps {
  reservations: Reservation[]
}

export function ReservationsTable({ reservations: initialReservations }: ReservationsTableProps) {
  const [reservations, setReservations] = useState(initialReservations)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleStatusChange = async (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    setLoadingId(id)
    const result = await updateReservationStatus(id, newStatus)

    if (result.success) {
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
    }

    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return

    setLoadingId(id)
    const result = await deleteReservation(id)

    if (result.success) {
      setReservations((prev) => prev.filter((r) => r.id !== id))
    }

    setLoadingId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    }
  }

  if (reservations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No reservations found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{reservation.guest_name}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  <p>{reservation.guest_email}</p>
                  <p>{reservation.guest_phone}</p>
                </div>
              </div>
              <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(reservation.reservation_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{reservation.reservation_time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Party Size</p>
                <p className="font-medium">{reservation.party_size} guests</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seating</p>
                <p className="font-medium">
                  {reservation.seating_area === "bar_counter" ? "Bar Counter" : "Main Lounge"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="font-medium">{new Date(reservation.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {reservation.special_requests && (
              <div className="mb-4 p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Special Requests</p>
                <p className="text-sm">{reservation.special_requests}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={reservation.status === "pending" ? "default" : "outline"}
                onClick={() => handleStatusChange(reservation.id, "pending")}
                disabled={loadingId === reservation.id || reservation.status === "pending"}
              >
                Pending
              </Button>
              <Button
                size="sm"
                variant={reservation.status === "confirmed" ? "default" : "outline"}
                onClick={() => handleStatusChange(reservation.id, "confirmed")}
                disabled={loadingId === reservation.id || reservation.status === "confirmed"}
              >
                Confirm
              </Button>
              <Button
                size="sm"
                variant={reservation.status === "cancelled" ? "default" : "outline"}
                onClick={() => handleStatusChange(reservation.id, "cancelled")}
                disabled={loadingId === reservation.id || reservation.status === "cancelled"}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(reservation.id)}
                disabled={loadingId === reservation.id}
                className="ml-auto"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
