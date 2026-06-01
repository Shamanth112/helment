// Convex Client Configuration
// This file is used by the convex client to connect to your Convex deployment.

// In production, update this with your Convex deployment URL
export const convexOrigin = process.env.NEXT_PUBLIC_CONVEX_URL ?? "http://localhost:3000"

// For now, we'll use a mock client
// The actual Convex client will be generated when you run `npx convex dev`

export const convexClient = {
  // Placeholder methods
  query: () => ({}),
  mutation: () => ({}),
}

export default convexClient