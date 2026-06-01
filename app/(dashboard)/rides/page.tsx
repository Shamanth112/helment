"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation, Clock, Zap, Shield, MapPin, Calendar, Filter, ArrowUpRight, TrendingUp, ChevronRight } from "lucide-react"
import { formatDate, formatDuration, formatDistance, formatSpeed } from "@/lib/utils"

interface Ride {
  id: string
  date: number
  duration: number
  distance: number
  avgSpeed: number
  maxSpeed: number
  safetyScore: number
  status: "completed" | "active" | "abandoned"
}

const mockRides: Ride[] = [
  { id: "1", date: Date.now() - 2  * 60 * 60 * 1000,       duration: 35 * 60000, distance: 12500, avgSpeed: 45, maxSpeed: 78, safetyScore: 92, status: "completed" },
  { id: "2", date: Date.now() - 24 * 60 * 60 * 1000,       duration: 22 * 60000, distance: 8200,  avgSpeed: 38, maxSpeed: 65, safetyScore: 88, status: "completed" },
  { id: "3", date: Date.now() - 3  * 24 * 60 * 60 * 1000,  duration: 45 * 60000, distance: 15800, avgSpeed: 52, maxSpeed: 95, safetyScore: 75, status: "completed" },
  { id: "4", date: Date.now() - 5  * 24 * 60 * 60 * 1000,  duration: 18 * 60000, distance: 6100,  avgSpeed: 32, maxSpeed: 55, safetyScore: 95, status: "completed" },
  { id: "5", date: Date.now() - 7  * 24 * 60 * 60 * 1000,  duration: 28 * 60000, distance: 10200, avgSpeed: 41, maxSpeed: 72, safetyScore: 85, status: "completed" },
]

function scoreColor(s: number) {
  if (s >= 90) return { text: "text-[var(--success)]",     badge: "success"     as const }
  if (s >= 75) return { text: "text-[var(--warning)]",     badge: "warning"     as const }
  return              { text: "text-[var(--destructive)]", badge: "destructive" as const }
}

export default function RidesPage() {
  const [filter, setFilter] = useState("all")

  const filtered = mockRides.filter(r => filter === "all" || r.status === filter)
  const totalDist  = mockRides.reduce((s, r) => s + r.distance, 0)
  const totalDur   = mockRides.reduce((s, r) => s + r.duration, 0)
  const avgScore   = Math.round(mockRides.reduce((s, r) => s + r.safetyScore, 0) / mockRides.length)
  const bestScore  = Math.max(...mockRides.map(r => r.safetyScore))

  const summaryCards = [
    { label: "Total Rides",    value: mockRides.length,                 unit: "rides",  icon: Navigation, color: "text-[var(--primary)]",  bg: "bg-[var(--primary-glow)]"  },
    { label: "Total Distance", value: (totalDist / 1000).toFixed(1),    unit: "km",     icon: MapPin,     color: "text-[var(--accent)]",   bg: "bg-[var(--accent-glow)]"   },
    { label: "Total Time",     value: formatDuration(totalDur),          unit: "",       icon: Clock,      color: "text-[var(--warning)]",  bg: "bg-[var(--warning-muted)]" },
    { label: "Avg Safety",     value: avgScore,                          unit: "/100",   icon: Shield,     color: "text-[var(--success)]",  bg: "bg-[var(--success-muted)]" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">History</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Ride History</h1>
          <p className="text-sm text-muted-foreground mt-1">Every journey you've taken, tracked and scored.</p>
        </div>
        <Button variant="outline" className="gap-2 self-start sm:self-auto">
          <Calendar className="h-4 w-4" /> Date Range
        </Button>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((c) => (
          <Card key={c.label} className="card-hover relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-50" />
            <CardContent className="p-4">
              <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-2`}>
                <c.icon className={`h-4 w-4 ${c.color}`} />
              </div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-xl font-bold font-mono mt-0.5">
                {c.value}<span className="text-xs text-muted-foreground font-sans font-normal ml-0.5">{c.unit}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Best ride callout */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--success)]/30 bg-[var(--success-muted)]">
          <div className="p-2 rounded-lg bg-[var(--success)] flex-shrink-0">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--success)] uppercase tracking-wide">Personal Best</p>
            <p className="text-sm font-medium">Your top safety score is <span className="font-bold">{bestScore}/100</span> — keep it up!</p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-[var(--success)] ml-auto" />
        </div>
      </motion.div>

      {/* Rides list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="p-1.5 rounded-lg bg-[var(--accent-glow)]">
                  <Navigation className="h-4 w-4 text-[var(--accent)]" />
                </div>
                All Rides
              </CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[130px] h-8 text-sm">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--card)] border-[var(--border)]">
                    <SelectItem value="all">All Rides</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="abandoned">Abandoned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                    {["Date & Time", "Duration", "Distance", "Avg Speed", "Max Speed", "Safety Score", "Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ride, i) => {
                    const sc = scoreColor(ride.safetyScore)
                    return (
                      <tr key={ride.id} className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors cursor-pointer group">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-[var(--primary-glow)]">
                              <Navigation className="h-3 w-3 text-[var(--primary)]" />
                            </div>
                            <span className="font-medium">{formatDate(ride.date)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs">{formatDuration(ride.duration)}</td>
                        <td className="px-4 py-3.5 font-mono text-xs">{formatDistance(ride.distance)}</td>
                        <td className="px-4 py-3.5 font-mono text-xs">{formatSpeed(ride.avgSpeed)}</td>
                        <td className="px-4 py-3.5 font-mono text-xs">{formatSpeed(ride.maxSpeed)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-base font-bold font-mono ${sc.text}`}>{ride.safetyScore}</span>
                            <Badge variant={sc.badge} className="text-[10px]">{ride.safetyScore >= 90 ? "Excellent" : ride.safetyScore >= 75 ? "Good" : "Poor"}</Badge>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge variant={ride.status === "completed" ? "success" : ride.status === "active" ? "info" : "secondary"}>
                            {ride.status}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-[var(--border)]">
              {filtered.map((ride) => {
                const sc = scoreColor(ride.safetyScore)
                return (
                  <div key={ride.id} className="flex items-center gap-3 p-4 hover:bg-[var(--secondary)] transition-colors cursor-pointer">
                    <div className={`p-2.5 rounded-xl bg-[var(--primary-glow)] flex-shrink-0`}>
                      <Navigation className="h-4 w-4 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold truncate">{formatDate(ride.date)}</p>
                        <span className={`text-sm font-bold font-mono ${sc.text}`}>{ride.safetyScore}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDuration(ride.duration)}</span>
                        <span>·</span>
                        <span>{formatDistance(ride.distance)}</span>
                        <span>·</span>
                        <span>{formatSpeed(ride.avgSpeed)} avg</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}