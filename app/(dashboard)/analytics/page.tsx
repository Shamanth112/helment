"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield, TrendingUp, TrendingDown, AlertTriangle,
  Activity, Calendar, ArrowUpRight, BarChart2,
} from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts"

const weeklyData = [
  { day: "Mon", score: 92, rides: 2, km: 18, incidents: 0 },
  { day: "Tue", score: 88, rides: 1, km: 10, incidents: 1 },
  { day: "Wed", score: 95, rides: 3, km: 32, incidents: 0 },
  { day: "Thu", score: 91, rides: 2, km: 22, incidents: 0 },
  { day: "Fri", score: 85, rides: 1, km: 8,  incidents: 1 },
  { day: "Sat", score: 78, rides: 2, km: 14, incidents: 2 },
  { day: "Sun", score: 94, rides: 4, km: 45, incidents: 0 },
]

const monthlyData = [
  { week: "Wk 1", score: 88, rides: 12, km: 120, incidents: 2 },
  { week: "Wk 2", score: 92, rides: 15, km: 158, incidents: 1 },
  { week: "Wk 3", score: 85, rides: 10, km: 96,  incidents: 3 },
  { week: "Wk 4", score: 90, rides: 18, km: 175, incidents: 1 },
]

const incidentTypes = [
  { type: "Near Miss",        count: 5, variant: "warning"     as const },
  { type: "False Alarm",      count: 3, variant: "info"        as const },
  { type: "Speeding Warning", count: 8, variant: "destructive" as const },
  { type: "Collision Alert",  count: 0, variant: "success"     as const },
]

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  color: "var(--foreground)",
  fontSize: "12px",
  boxShadow: "var(--shadow-lg)",
}

const gridStyle = { stroke: "var(--border)", strokeDasharray: "4 4" }
const axisStyle = { fill: "var(--muted-foreground)", fontSize: 11 }

export default function AnalyticsPage() {
  const avgScore  = Math.round(weeklyData.reduce((s, d) => s + d.score, 0) / weeklyData.length)
  const totalRides     = weeklyData.reduce((s, d) => s + d.rides, 0)
  const totalKm        = weeklyData.reduce((s, d) => s + d.km,    0)
  const totalIncidents = weeklyData.reduce((s, d) => s + d.incidents, 0)

  const summaryCards = [
    {
      label: "Avg Safety Score",
      value: avgScore,
      unit: "/100",
      icon: Shield,
      color: "text-[var(--success)]",
      bg:    "bg-[var(--success-muted)]",
      trend: "+5%",
      trendUp: true,
    },
    {
      label: "Total Rides",
      value: totalRides,
      unit: " rides",
      icon: Activity,
      color: "text-[var(--primary)]",
      bg:    "bg-[var(--primary-glow)]",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Distance",
      value: totalKm,
      unit: " km",
      icon: TrendingUp,
      color: "text-[var(--accent)]",
      bg:    "bg-[var(--accent-glow)]",
      trend: "+8%",
      trendUp: true,
    },
    {
      label: "Incidents",
      value: totalIncidents,
      unit: " events",
      icon: AlertTriangle,
      color: "text-[var(--warning)]",
      bg:    "bg-[var(--warning-muted)]",
      trend: "+2",
      trendUp: false,
    },
    {
      label: "Safe Streak",
      value: 5,
      unit: " days",
      icon: Calendar,
      color: "text-violet-500",
      bg:    "bg-violet-500/10",
      trend: "Personal best",
      trendUp: true,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Reports</p>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your riding performance and safety trends.</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {summaryCards.map((c) => (
          <Card key={c.label} className="card-hover relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-50" />
            <CardContent className="p-4">
              <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-2`}>
                <c.icon className={`h-4 w-4 ${c.color}`} />
              </div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-xl font-bold font-mono mt-0.5">
                {c.value}
                <span className="text-xs text-muted-foreground font-sans font-normal">{c.unit}</span>
              </p>
              <div className={`flex items-center gap-0.5 text-xs mt-1 font-medium ${c.trendUp ? "text-[var(--success)]" : "text-[var(--destructive)]"}`}>
                {c.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {c.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="weekly" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-[var(--secondary)] p-1 rounded-[var(--radius)]">
              <TabsTrigger value="weekly"  className="rounded-md data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm text-sm">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-md data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm text-sm">Monthly</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-1.5">
              <BarChart2 className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>

          {/* ── Weekly ─────────────────────────────────── */}
          <TabsContent value="weekly" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Safety Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}    />
                          </linearGradient>
                        </defs>
                        <CartesianGrid {...gridStyle} />
                        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis domain={[60, 100]} tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} fill="url(#scoreGrad)" dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Rides & Distance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--accent)"  />
                          </linearGradient>
                        </defs>
                        <CartesianGrid {...gridStyle} />
                        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="rides" fill="url(#barGrad)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                        <Bar dataKey="km"    fill="var(--accent)" fillOpacity={0.35} radius={[4, 4, 0, 0]} maxBarSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="h-2 w-4 rounded-sm bg-[var(--primary)]" /> Rides
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="h-2 w-4 rounded-sm bg-[var(--accent)] opacity-60" /> Distance (km)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Monthly ────────────────────────────────── */}
          <TabsContent value="monthly" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Monthly Safety Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid {...gridStyle} />
                        <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis domain={[60, 100]} tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Line type="monotone" dataKey="score" stroke="var(--success)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--success)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Monthly Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="monthBarGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--accent)"  />
                          </linearGradient>
                        </defs>
                        <CartesianGrid {...gridStyle} />
                        <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="rides" fill="url(#monthBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Incident Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--warning-muted)]">
                  <AlertTriangle className="h-4 w-4 text-[var(--warning)]" />
                </div>
                Incident Breakdown
              </CardTitle>
              <Badge variant="success" className="gap-1">
                <Shield className="h-3 w-3" /> Safe this week
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {incidentTypes.map((inc) => (
                <div
                  key={inc.type}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--secondary)] hover:bg-[var(--muted)] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${
                      inc.variant === "warning"     ? "bg-[var(--warning-muted)]"     :
                      inc.variant === "destructive" ? "bg-[var(--destructive-muted)]" :
                      inc.variant === "success"     ? "bg-[var(--success-muted)]"     :
                      "bg-[var(--primary-glow)]"
                    }`}>
                      <AlertTriangle className={`h-3.5 w-3.5 ${
                        inc.variant === "warning"     ? "text-[var(--warning)]"     :
                        inc.variant === "destructive" ? "text-[var(--destructive)]" :
                        inc.variant === "success"     ? "text-[var(--success)]"     :
                        "text-[var(--primary)]"
                      }`} />
                    </div>
                    <span className="text-sm font-medium">{inc.type}</span>
                  </div>
                  <Badge variant={inc.variant}>{inc.count}</Badge>
                </div>
              ))}
            </div>

            {/* Weekly incident bar */}
            <div className="mt-5 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Incidents per day this week</p>
              <div className="flex items-end gap-2 h-16">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${d.incidents === 0 ? "bg-[var(--success-muted)]" : "bg-[var(--warning-muted)] border border-[var(--warning)]/30"}`}
                      style={{ height: `${Math.max(8, d.incidents * 24)}px` }}
                    />
                    <span className="text-[9px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}