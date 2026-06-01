"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  AlertTriangle,
  Activity,
  Shield,
  TrendingUp,
  MapPin,
} from "lucide-react"
import { formatDate, formatTime } from "@/lib/utils"

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", rides: 15, status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", rides: 23, status: "active" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", rides: 8, status: "inactive" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", rides: 31, status: "active" },
]

const incidents = [
  {
    id: "1",
    user: "John Doe",
    type: "accident",
    confidence: 95,
    location: "40.7128, -74.0060",
    time: Date.now() - 2 * 60 * 60 * 1000,
    status: "resolved",
  },
  {
    id: "2",
    user: "Jane Smith",
    type: "near_miss",
    confidence: 78,
    location: "40.7580, -73.9855",
    time: Date.now() - 24 * 60 * 60 * 1000,
    status: "resolved",
  },
  {
    id: "3",
    user: "Bob Wilson",
    type: "false_alarm",
    confidence: 92,
    location: "40.7484, -73.9857",
    time: Date.now() - 3 * 24 * 60 * 60 * 1000,
    status: "cancelled",
  },
]

const stats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalRides: 15680,
  totalIncidents: 234,
  sosTriggered: 45,
  avgSafetyScore: 87,
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-heading">Admin Panel</h1>
        </div>
        <p className="text-muted-foreground mt-1">
          System overview and management
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              Total Users
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              Active
            </div>
            <p className="text-2xl font-bold mt-1">{stats.activeUsers.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Total Rides
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalRides.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              Incidents
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalIncidents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              SOS Alerts
            </div>
            <p className="text-2xl font-bold mt-1">{stats.sosTriggered}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Avg Safety
            </div>
            <p className="text-2xl font-bold mt-1">{stats.avgSafetyScore}%</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rides</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.rides}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === "active" ? "success" : "secondary"}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.user}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              incident.type === "accident"
                                ? "destructive"
                                : incident.type === "near_miss"
                                ? "warning"
                                : "secondary"
                            }
                          >
                            {incident.type.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">
                          {incident.confidence}%
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {incident.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{formatDate(incident.time)}</div>
                            <div className="text-muted-foreground">
                              {formatTime(incident.time)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              incident.status === "resolved"
                                ? "success"
                                : incident.status === "cancelled"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {incident.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}