import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | number): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(date: Date | number): string {
  const d = new Date(date)
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  }
  return `${seconds}s`
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`
  }
  return `${Math.round(meters)} m`
}

export function formatSpeed(kmh: number): string {
  return `${Math.round(kmh)} km/h`
}

export function calculateSafetyScore(
  incidents: number,
  avgSpeed: number,
  maxSpeed: number
): number {
  let score = 100

  // Deduct for incidents
  score -= incidents * 20

  // Deduct for high speeds
  if (avgSpeed > 80) score -= 10
  if (maxSpeed > 120) score -= 15

  // Bonus for safe riding
  if (avgSpeed < 50 && incidents === 0) score += 5

  return Math.max(0, Math.min(100, score))
}

export function getConfidenceLevel(score: number): {
  label: string
  color: string
} {
  if (score >= 90) return { label: "Critical", color: "text-red-500" }
  if (score >= 70) return { label: "Warning", color: "text-amber-500" }
  return { label: "Normal", color: "text-emerald-500" }
}

export function generateGoogleMapsLink(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`
}

export function generateSOSMessage(
  userName: string,
  lat: number,
  lng: number,
  timestamp: number
): string {
  const mapsLink = generateGoogleMapsLink(lat, lng)
  const time = new Date(timestamp).toLocaleString()

  return `Emergency Alert!\n\nA possible accident involving ${userName} has been detected.\n\nLocation:\n${mapsLink}\n\nTime:\n${time}\n\nPlease contact the rider immediately.`
}