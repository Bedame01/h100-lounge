import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, UtensilsCrossed } from "lucide-react"

interface DashboardStatsProps {
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  menuItems: number
}

export function DashboardStats({
  totalReservations,
  pendingReservations,
  confirmedReservations,
  menuItems,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Reservations",
      value: totalReservations,
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Pending",
      value: pendingReservations,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Confirmed",
      value: confirmedReservations,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Menu Items",
      value: menuItems,
      icon: UtensilsCrossed,
      color: "text-primary",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
