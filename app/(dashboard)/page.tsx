"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Camera,
  MapPin,
  AlertTriangle,
  Users,
  Activity,
  Clock,
  Zap,
  Navigation,
  Phone,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Safety Score",
    value: "94",
    icon: Shield,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    trend: "+5%",
  },
  {
    title: "Camera Status",
    value: "Active",
    icon: Camera,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "GPS Signal",
    value: "Strong",
    icon: MapPin,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Current Speed",
    value: "0 km/h",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

const quickActions = [
  {
    title: "Start Ride",
    description: "Begin a new ride session",
    href: "/camera",
    icon: Navigation,
    gradient: "from-primary to-success",
  },
  {
    title: "Emergency SOS",
    description: "Send immediate alert",
    href: "/contacts",
    icon: Phone,
    gradient: "from-red-500 to-amber-500",
  },
  {
    title: "View Analytics",
    description: "Check your stats",
    href: "/analytics",
    icon: TrendingUp,
    gradient: "from-violet-500 to-primary",
  },
]

const recentActivity = [
  {
    type: "ride",
    title: "Morning Ride Completed",
    time: "2 hours ago",
    details: "12.5 km • 35 min • Safety: 92",
  },
  {
    type: "alert",
    title: "Speed Warning",
    time: "Yesterday",
    details: "Speed exceeded 80 km/h",
  },
  {
    type: "incident",
    title: "False Alarm",
    time: "2 days ago",
    details: "Cancelled by user",
  },
  {
    type: "ride",
    title: "Evening Ride Completed",
    time: "3 days ago",
    details: "8.2 km • 22 min • Safety: 88",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-heading">Welcome back, Rider</h1>
        <p className="text-muted-foreground mt-1">
          Your safety system is ready. Let's ride smart.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold font-mono mt-1">
                      {stat.value}
                    </p>
                    {stat.trend && (
                      <Badge variant="success" className="mt-2">
                        {stat.trend}
                      </Badge>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-xl ${stat.bgColor}`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {quickActions.map((action) => (
          <motion.div key={action.title} variants={item}>
            <Link href={action.href}>
              <Card className="card-hover cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${action.gradient}`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SOS Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                SOS Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span>System Active</span>
                  </div>
                  <Badge variant="success">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Emergency Contacts</span>
                  </div>
                  <Badge variant="secondary">3 Added</Badge>
                </div>
                <Link href="/contacts">
                  <Button variant="outline" className="w-full">
                    Manage Contacts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div
                      className={`mt-1 p-1 rounded ${
                        activity.type === "ride"
                          ? "bg-primary/10"
                          : activity.type === "alert"
                          ? "bg-amber-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {activity.type === "ride" ? (
                        <Navigation className="h-4 w-4 text-primary" />
                      ) : activity.type === "alert" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.details}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Map Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-lg bg-secondary flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Google Maps integration</p>
                <p className="text-xs text-muted-foreground">
                  Add your Google Maps API key to enable
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}