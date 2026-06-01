"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield, Camera, MapPin, AlertTriangle, Users,
  Activity, Clock, Zap, Navigation, Phone,
  TrendingUp, ArrowUpRight, Bike, MoreHorizontal,
  CheckCircle2, ChevronRight,
} from "lucide-react"
import Link from "next/link"

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const stats = [
  {
    title: "Safety Score",
    value: "94",
    unit: "/100",
    icon: Shield,
    color: "text-[var(--success)]",
    bg: "bg-[var(--success-muted)]",
    trend: "+5%",
    trendUp: true,
    description: "vs last week",
  },
  {
    title: "Camera",
    value: "Active",
    icon: Camera,
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary-glow)]",
    pulse: true,
    description: "AI detection on",
  },
  {
    title: "GPS Signal",
    value: "Strong",
    icon: MapPin,
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent-glow)]",
    description: "4G connected",
  },
  {
    title: "Speed",
    value: "0",
    unit: " km/h",
    icon: Zap,
    color: "text-[var(--warning)]",
    bg: "bg-[var(--warning-muted)]",
    description: "Parked",
  },
]

const quickActions = [
  {
    title: "Start Ride",
    description: "Begin AI monitoring session",
    href: "/camera",
    icon: Navigation,
    from: "from-[var(--primary)]",
    to: "to-[var(--accent)]",
    shadow: "shadow-[var(--shadow-primary)]",
  },
  {
    title: "Emergency SOS",
    description: "Send instant emergency alert",
    href: "/contacts",
    icon: Phone,
    from: "from-red-500",
    to: "to-orange-500",
    shadow: "shadow-red-500/30",
  },
  {
    title: "Analytics",
    description: "View your riding stats",
    href: "/analytics",
    icon: TrendingUp,
    from: "from-violet-500",
    to: "to-[var(--primary)]",
    shadow: "shadow-violet-500/30",
  },
]

const recentActivity = [
  { type: "ride",     title: "Morning Ride",      time: "2h ago",      details: "12.5 km · 35 min · Score 92", },
  { type: "alert",   title: "Speed Warning",      time: "Yesterday",   details: "Exceeded 80 km/h limit",      },
  { type: "incident",title: "False Alarm",         time: "2 days ago",  details: "Cancelled by user",           },
  { type: "ride",    title: "Evening Commute",     time: "3 days ago",  details: "8.2 km · 22 min · Score 88",  },
]

const activityIcon = (type: string) => {
  if (type === "ride")     return { Icon: Navigation, color: "text-[var(--primary)]",     bg: "bg-[var(--primary-glow)]"     }
  if (type === "alert")    return { Icon: AlertTriangle, color: "text-[var(--warning)]", bg: "bg-[var(--warning-muted)]"   }
  return                          { Icon: AlertTriangle, color: "text-[var(--destructive)]", bg: "bg-[var(--destructive-muted)]" }
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item      = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header Row */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Welcome back, Rider 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Your safety system is armed and ready.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--success-muted)] border border-[var(--success)]/20 text-[var(--success)] text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
            System Online
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Live
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="card-hover relative overflow-hidden">
              {/* Subtle top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-60" />
              <CardContent className="p-4 md:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  {stat.pulse && (
                    <span className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse-dot mt-0.5" />
                  )}
                  {stat.trend && (
                    <div className="flex items-center gap-0.5 text-[10px] font-semibold text-[var(--success)]">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.trend}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">{stat.title}</p>
                <p className="text-xl md:text-2xl font-bold font-mono leading-none">
                  {stat.value}
                  {stat.unit && <span className="text-sm text-muted-foreground font-sans font-normal">{stat.unit}</span>}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
      >
        {quickActions.map((action) => (
          <motion.div key={action.title} variants={item}>
            <Link href={action.href}>
              <Card className="card-hover cursor-pointer group overflow-hidden">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.from} ${action.to} shadow-lg ${action.shadow} flex-shrink-0`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm group-hover:text-[var(--primary)] transition-colors">{action.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--primary)] transition-all group-hover:translate-x-0.5 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* SOS Status */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--primary-glow)]">
                    <Shield className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  SOS Status
                </CardTitle>
                <Badge variant="success">All Clear</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "AI Detection System", status: "Running", icon: Activity, color: "success" as const },
                { label: "GPS Tracking",          status: "Active",   icon: MapPin,   color: "info"    as const },
                { label: "Emergency Contacts",    status: "3 Added",  icon: Users,    color: "info"    as const },
                { label: "Speed Monitor",         status: "Enabled",  icon: Zap,      color: "success" as const },
              ].map(({ label, status, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-[var(--secondary)] hover:bg-[var(--muted)] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-[var(--card)]">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <Badge variant={color}>{status}</Badge>
                </div>
              ))}
              <Link href="/contacts">
                <Button variant="outline" className="w-full mt-1 gap-2">
                  <Users className="h-4 w-4" />
                  Manage Contacts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--accent-glow)]">
                    <Activity className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  Recent Activity
                </CardTitle>
                <button className="icon-btn">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 p-3">
              {recentActivity.map((act, i) => {
                const { Icon, color, bg } = activityIcon(act.type)
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--secondary)] transition-colors cursor-pointer group"
                  >
                    <div className={`p-1.5 rounded-md ${bg} flex-shrink-0`}>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors">{act.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{act.details}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="h-3 w-3" />
                      {act.time}
                    </div>
                  </div>
                )
              })}
              <Link href="/rides">
                <Button variant="ghost" size="sm" className="w-full mt-1 text-muted-foreground hover:text-foreground gap-1">
                  View all rides
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Safety Score Bar + Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Safety Score */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--success-muted)]">
                  <TrendingUp className="h-4 w-4 text-[var(--success)]" />
                </div>
                Safety Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold font-mono text-[var(--success)]">94</span>
                <span className="text-muted-foreground mb-1">/100</span>
                <Badge variant="success" className="mb-1 ml-auto">Excellent</Badge>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: "94%" }} />
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Speed Compliance",  pct: 98 },
                  { label: "Smooth Braking",    pct: 91 },
                  { label: "Safe Following",    pct: 87 },
                  { label: "Night Riding",      pct: 95 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-semibold">{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--accent-glow)]">
                    <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  Live Location
                </CardTitle>
                <Badge variant="info" className="gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse-dot" />
                  GPS Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-52 rounded-xl overflow-hidden bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center">
                {/* Fake map grid */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-glow)] to-[var(--accent-glow)] opacity-30" />
                <div className="relative text-center">
                  <div className="relative inline-flex">
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-[var(--shadow-primary)] animate-pulse-ring">
                      <Bike className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[var(--success)] border-2 border-[var(--card)]" />
                  </div>
                  <p className="text-sm font-semibold mt-2">Current Location</p>
                  <p className="text-xs text-muted-foreground">Add Google Maps API key to enable live map</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[
                  { label: "Lat",  value: "12.9716°" },
                  { label: "Lng",  value: "77.5946°" },
                  { label: "Alt",  value: "920 m"    },
                ].map(({ label, value }) => (
                  <div key={label} className="p-2.5 rounded-lg bg-[var(--secondary)] text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold font-mono mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
