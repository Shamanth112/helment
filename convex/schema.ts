import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("email", ["email"])
    .index("createdAt", ["createdAt"]),

  emergencyContacts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    relationship: v.string(),
    isPrimary: v.boolean(),
  })
    .index("userId", ["userId"])
    .index("userIdIsPrimary", ["userId", "isPrimary"]),

  incidents: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("accident"),
      v.literal("near_miss"),
      v.literal("false_alarm")
    ),
    confidenceScore: v.number(),
    location: v.object({
      lat: v.number(),
      lng: v.number(),
      address: v.optional(v.string()),
    }),
    timestamp: v.number(),
    status: v.union(
      v.literal("detected"),
      v.literal("verified"),
      v.literal("cancelled"),
      v.literal("resolved")
    ),
    sosTriggered: v.boolean(),
    notes: v.optional(v.string()),
  })
    .index("userId", ["userId"])
    .index("userIdTimestamp", ["userId", "timestamp"])
    .index("status", ["status"]),

  rideHistory: defineTable({
    userId: v.id("users"),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    distance: v.number(),
    avgSpeed: v.number(),
    maxSpeed: v.number(),
    safetyScore: v.number(),
    route: v.optional(v.array(v.object({ lat: v.number(), lng: v.number() }))),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("abandoned")),
  })
    .index("userId", ["userId"])
    .index("userIdStartTime", ["userId", "startTime"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("sos"), v.literal("alert"), v.literal("info"), v.literal("warning")),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    timestamp: v.number(),
  })
    .index("userId", ["userId"])
    .index("userIdTimestamp", ["userId", "timestamp"])
    .index("userIdRead", ["userId", "read"]),
})

// Type definitions for use in TypeScript
export type UserId = string
export type IncidentId = string
export type RideId = string
export type NotificationId = string
export type ContactId = string