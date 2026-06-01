"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Navigation,
  Clock,
  Zap,
  Shield,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react"
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
  {
    id: "1",
    date: Date.now() - 2 * 60 * 60 * 1000,
    duration: 35 * 60 * 1000,
    distance: 12500,
    avgSpeed: 45,
    maxSpeed: 78,
    safetyScore: 92,
    status: "completed",
  },
  {
    id: "2",
    date: Date.now() - 24 * 60 * 60 * 1000,
    duration: 22 * 60 * 1000,
    distance: 8200,
    avgSpeed: 38,
    maxSpeed: 65,
    safetyScore: 88,
    status: "completed",
  },
  {
    id: "3",
    date: Date.now() - 3 * 24 * 60 * 60 * 1000,
    duration: 45 * 60 * 1000,
    distance: 15800,
    avgSpeed: 52,
    maxSpeed: 95,
    safetyScore: 75,
    status: "completed",
  },
  {
    id: "4",
    date: Date.now() - 5 * 24 * 60 * 60 * 1000,
    duration: 18 * 60 * 1000,
    distance: 6100,
    avgSpeed: 32,
    maxSpeed: 55,
    safetyScore: 95,
    status: "completed",
  },
  {
    id: "5",
    date: Date.now() - 7 * 24 * 60 * 60 * 1000,
    duration: 28 * 60 * 1000,
    distance: 10200,
    avgSpeed: 41,
    maxSpeed: 72,
    safetyScore: 85,
    status: "completed",
  },
]

export default function RidesPage() {
  const [filter, setFilter] = useState("all")

  const filteredRides = mockRides.filter((ride) => {
    if (filter === "all") return true
    return ride.status === filter
  })

  const totalDistance = mockRides.reduce((sum, r) => sum + r.distance, 0)
  const totalDuration = mockRides.reduce((sum, r) => sum + r.duration, 0)
  const avgSafetyScore =
    mockRides.reduce((sum, r) => sum + r.safetyScore, 0) / mockRides.length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading">Ride History</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your past rides
            </p>
          </div>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Navigation className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{mockRides.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <MapPin className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Distance</p>
                <p className="text-2xl font-bold">
                  {(totalDistance / 1000).toFixed(1)} km
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">
                  {formatDuration(totalDuration)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-violet-500/10">
                <Shield className="h-6 w-6 text-violet-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Safety</p>
                <p className="text-2xl font-bold">
                  {Math.round(avgSafetyScore)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rides Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Rides</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rides</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="abandoned">Abandoned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Avg Speed</TableHead>
                  <TableHead>Max Speed</TableHead>
                  <TableHead>Safety Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRides.map((ride) => (
                  <TableRow key={ride.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(ride.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {formatDuration(ride.duration)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {formatDistance(ride.distance)}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatSpeed(ride.avgSpeed)}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatSpeed(ride.maxSpeed)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ride.safetyScore >= 90
                            ? "success"
                            : ride.safetyScore >= 70
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {ride.safetyScore}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ride.status === "completed"
                            ? "secondary"
                            : ride.status === "active"
                            ? "default"
                            : "outline"
                        }
                      >
                        {ride.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}