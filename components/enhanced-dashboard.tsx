"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, UtensilsCrossed, Users, TrendingUp, Sparkles } from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMemo } from "react"

interface EnhancedDashboardProps {
  stats: {
    totalReservations: number
    pendingReservations: number
    confirmedReservations: number
    cancelledReservations: number
    menuItems: number
    availableItems: number
    categories: number
  }
  recentReservations: Array<{ created_at: string; status: string }>
  customers: Array<{ guest_name: string; guest_email: string }>
}

export function EnhancedDashboard({ stats, recentReservations, customers }: EnhancedDashboardProps) {
  // Process time series data
  const timeSeriesData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split("T")[0]
    })

    return last7Days.map((date) => {
      const dayReservations = recentReservations.filter((r) => r.created_at.split("T")[0] === date)
      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        reservations: dayReservations.length,
        confirmed: dayReservations.filter((r) => r.status === "confirmed").length,
        pending: dayReservations.filter((r) => r.status === "pending").length,
      }
    })
  }, [recentReservations])

  // Status distribution for pie chart
  const statusData = [
    { name: "Confirmed", value: stats.confirmedReservations, color: "hsl(var(--chart-1))" },
    { name: "Pending", value: stats.pendingReservations, color: "hsl(var(--chart-2))" },
    { name: "Cancelled", value: stats.cancelledReservations, color: "hsl(var(--chart-3))" },
  ]

  const statCards = [
    {
      title: "Total Reservations",
      value: stats.totalReservations,
      icon: Calendar,
      gradient: "from-blue-500 to-cyan-500",
      change: "+12.5%",
    },
    {
      title: "Pending",
      value: stats.pendingReservations,
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      change: "-2.3%",
    },
    {
      title: "Confirmed",
      value: stats.confirmedReservations,
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
      change: "+8.1%",
    },
    {
      title: "Menu Items",
      value: stats.menuItems,
      icon: UtensilsCrossed,
      gradient: "from-violet-500 to-purple-500",
      change: `${stats.availableItems} available`,
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Sparkles,
      gradient: "from-pink-500 to-rose-500",
      change: "Active",
    },
    {
      title: "Total Customers",
      value: new Set(customers.map((c) => c.guest_email)).size,
      icon: Users,
      gradient: "from-indigo-500 to-blue-500",
      change: "+5.2%",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reservations Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Reservations Trend</CardTitle>
            <CardDescription>Last 7 days reservation activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                reservations: {
                  label: "Total",
                  color: "hsl(var(--chart-1))",
                },
                confirmed: {
                  label: "Confirmed",
                  color: "hsl(var(--chart-2))",
                },
                pending: {
                  label: "Pending",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="reservations" stroke="var(--color-reservations)" strokeWidth={2} />
                  <Line type="monotone" dataKey="confirmed" stroke="var(--color-confirmed)" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current reservation status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                confirmed: {
                  label: "Confirmed",
                  color: "hsl(var(--chart-1))",
                },
                pending: {
                  label: "Pending",
                  color: "hsl(var(--chart-2))",
                },
                cancelled: {
                  label: "Cancelled",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
