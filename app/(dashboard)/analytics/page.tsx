"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  Calendar,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const weeklyData = [
  { day: "Mon", score: 92, rides: 2, incidents: 0 },
  { day: "Tue", score: 88, rides: 1, incidents: 1 },
  { day: "Wed", score: 95, rides: 3, incidents: 0 },
  { day: "Thu", score: 91, rides: 2, incidents: 0 },
  { day: "Fri", score: 85, rides: 1, incidents: 1 },
  { day: "Sat", score: 78, rides: 2, incidents: 2 },
  { day: "Sun", score: 94, rides: 4, incidents: 0 },
]

const monthlyData = [
  { week: "Week 1", score: 88, rides: 12, incidents: 2 },
  { week: "Week 2", score: 92, rides: 15, incidents: 1 },
  { week: "Week 3", score: 85, rides: 10, incidents: 3 },
  { week: "Week 4", score: 90, rides: 18, incidents: 1 },
]

const incidentTypes = [
  { type: "Near Miss", count: 5, color: "#F59E0B" },
  { type: "False Alarm", count: 3, color: "#22D3EE" },
  { type: "Speeding Warning", count: 8, color: "#EF4444" },
  { type: "Collision Alert", count: 0, color: "#10B981" },
]

export default function AnalyticsPage() {
  const avgSafetyScore = Math.round(
    weeklyData.reduce((sum, d) => sum + d.score, 0) / weeklyData.length
  )
  const totalRides = weeklyData.reduce((sum, d) => sum + d.rides, 0)
  const totalIncidents = weeklyData.reduce((sum, d) => sum + d.incidents, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-heading">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your riding patterns and safety performance
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg Safety Score
                </p>
                <p className="text-3xl font-bold">{avgSafetyScore}</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Shield className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-success">
              <TrendingUp className="h-4 w-4" />
              +5% from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rides</p>
                <p className="text-3xl font-bold">{totalRides}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-success">
              <TrendingUp className="h-4 w-4" />
              +12% from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incidents</p>
                <p className="text-3xl font-bold">{totalIncidents}</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-destructive">
              <TrendingDown className="h-4 w-4" />
              +2 from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-3xl font-bold">5 days</p>
              </div>
              <div className="p-3 rounded-xl bg-violet-500/10">
                <Calendar className="h-6 w-6 text-violet-500" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-success">
              Safe riding days in a row
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Safety Score Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Safety Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient
                            id="colorScore"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#22D3EE"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#22D3EE"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" domain={[60, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E293B",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#22D3EE"
                          fillOpacity={1}
                          fill="url(#colorScore)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Rides Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Rides per Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E293B",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="rides" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Safety */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Safety Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="week" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" domain={[60, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E293B",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ fill: "#10B981" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Rides */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="week" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E293B",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="rides" fill="#22D3EE" radius={[4, 4, 0, 0]} />
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Incident Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {incidentTypes.map((item) => (
                <div
                  key={item.type}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.type}</span>
                  </div>
                  <Badge
                    variant={
                      item.count === 0
                        ? "success"
                        : item.count <= 2
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}