# Smart Helmet AI Safety System - Specification

## 1. Project Overview

**Project Name:** Smart Helmet AI Safety System  
**Type:** Full-stack Web Application (Vercel-deployed)  
**Core Functionality:** AI-powered motorcycle safety system that detects accidents via camera and sensors, automatically triggering SOS alerts with live GPS location to emergency contacts.  
**Target Users:** Motorcycle riders who want enhanced safety and emergency response capabilities.

---

## 2. Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animations:** Framer Motion

### Backend
- **Database:** Convex
- **Auth:** Convex Authentication
- **Functions:** Convex HTTP Actions & Query Functions
- **Real-time:** Convex Real-time Queries

### AI & Computer Vision
- **Pose Detection:** MediaPipe
- **ML Runtime:** TensorFlow.js
- **Camera:** WebRTC (getUserMedia)
- **Sensors:** Device Motion API

### Maps & Location
- **Maps:** Google Maps JavaScript API

### Notifications
- **SMS:** Twilio API
- **Email:** Convex Actions with SendGrid/Resend
- **Push:** Web Push API

### Deployment
- **Platform:** Vercel
- **CI/CD:** Vercel Git Integration

---

## 3. UI/UX Specification

### 3.1 Design System

**Color Palette:**
- Primary: `#0F172A` (Slate 900 - dark background)
- Secondary: `#1E293B` (Slate 800 - card backgrounds)
- Accent: `#22D3EE` (Cyan 400 - primary accent)
- Success: `#10B981` (Emerald 500)
- Warning: `#F59E0B` (Amber 500)
- Danger: `#EF4444` (Red 500)
- Text Primary: `#F8FAFC` (Slate 50)
- Text Secondary: `#94A3B8` (Slate 400)
- Border: `#334155` (Slate 700)

**Typography:**
- Headings: `Space Grotesk` (Google Fonts)
- Body: `Inter` (Google Fonts)
- Monospace: `JetBrains Mono` (for data/stats)

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Border Radius:**
- sm: 6px, md: 8px, lg: 12px, xl: 16px, full: 9999px

### 3.2 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 3.3 Page Layouts

#### Landing Page
- Full-screen hero with animated background
- Navigation bar (transparent, blur on scroll)
- Feature cards with hover effects
- CTA buttons with gradient borders
- Trust indicators (stats, testimonials)

#### Authentication Pages (Login/Register)
- Split layout: form left, visual right
- Floating labels on inputs
- Loading states on buttons
- Error/success toast notifications
- Password strength indicator (register)

#### Dashboard
- Top bar: User avatar, notifications, quick actions
- Main grid: Status cards (2-3 columns)
- Live metrics with real-time updates
- Quick access buttons
- Recent activity feed

#### Camera Monitoring Page
- Full-screen camera feed
- Overlay metrics (speed, location)
- Status indicators
- Emergency button (prominent)

#### Emergency Contacts Page
- List view with avatar placeholders
- Add/Edit modal forms
- Delete confirmation dialog
- Primary contact indicator

#### Ride History Page
- Table with sorting/filtering
- Date range picker
- Export functionality
- Pagination

#### Analytics Page
- Chart cards (weekly/monthly)
- Trend indicators
- Filterable data

### 3.4 Component Library

**Buttons:**
- Primary: Cyan gradient, white text
- Secondary: Transparent with border
- Danger: Red background
- Ghost: No background, hover reveals

**Cards:**
- Dark background with subtle border
- Hover: slight lift + glow
- Status indicators: colored dots

**Forms:**
- Floating labels
- Focus: cyan border glow
- Error: red border + message
- Success: green checkmark

**Modals:**
- Centered, backdrop blur
- Slide-up animation
- Close on backdrop click

**Toasts:**
- Bottom-right positioning
- Auto-dismiss (5s)
- Types: success, error, warning, info

---

## 4. Database Schema (Convex)

### Users Table
```typescript
{
  _id: Id<"users">,
  _creationTime: number,
  name: string,
  email: string,
  image?: string,
  role: "user" | "admin",
  phone?: string,
  createdAt: number,
  updatedAt: number,
}
```

### EmergencyContacts Table
```typescript
{
  _id: Id<"emergencyContacts">,
  _creationTime: number,
  userId: Id<"users">,
  name: string,
  phone: string,
  email: string,
  relationship: string,
  isPrimary: boolean,
}
```

### Incidents Table
```typescript
{
  _id: Id<"incidents">,
  _creationTime: number,
  userId: Id<"users">,
  type: "accident" | "near_miss" | "false_alarm",
  confidenceScore: number,
  location: { lat: number, lng: number, address?: string },
  timestamp: number,
  status: "detected" | "verified" | "cancelled" | "resolved",
  sosTriggered: boolean,
  notes?: string,
}
```

### RideHistory Table
```typescript
{
  _id: Id<"rideHistory">,
  _creationTime: number,
  userId: Id<"users">,
  startTime: number,
  endTime?: number,
  distance: number, // in meters
  avgSpeed: number, // in km/h
  maxSpeed: number,
  safetyScore: number,
  route?: { lat: number, lng: number }[],
  status: "active" | "completed" | "abandoned",
}
```

### Notifications Table
```typescript
{
  _id: Id<"notifications">,
  _creationTime: number,
  userId: Id<"users">,
  type: "sos" | "alert" | "info" | "warning",
  title: string,
  message: string,
  read: boolean,
  timestamp: number,
}
```

---

## 5. Functionality Specification

### 5.1 Authentication
- Sign up with email/password
- Login with credentials
- Password reset via email
- Session management
- Protected routes
- Role-based access (user/admin)

### 5.2 Dashboard Features
- Real-time status display
- Camera connection status
- GPS tracking status
- Current speed (from device)
- Safety score (0-100)
- Emergency contacts count
- Recent incidents list
- Quick action buttons

### 5.3 Emergency Contact Management
- CRUD operations for contacts
- Set primary contact
- Maximum 5 contacts per user
- Validation: phone format, email format

### 5.4 AI Collision Detection

**Camera Analysis:**
- Access: `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })`
- Process frames with MediaPipe Pose
- Analyze body position and movement

**Sensor Monitoring:**
- Accelerometer: detect sudden deceleration
- Gyroscope: detect rotation anomalies
- GPS speed: detect abnormal changes

**Detection Triggers:**
- Fall detection (vertical position change)
- Impact detection (sudden acceleration drop)
- Immobility detection (no movement after ride start)
- Excessive tilt detection

**Confidence Scoring:**
- 0-70%: Ignored (normal riding)
- 70-90%: Warning state
- 90%+: Trigger verification

### 5.5 Accident Verification Flow
1. High confidence collision detected
2. Display emergency modal
3. Start 15-second countdown
4. Options: "I'm Safe" | "Send SOS Now"
5. If no response → auto-trigger SOS
6. Log incident to database

### 5.6 SOS System
- Fetch all emergency contacts
- Send SMS via Twilio
- Send email alerts
- Create incident record
- Mark as SOS triggered

### 5.7 Location Tracking
- Request GPS permissions
- Watch position in real-time
- Store last known location
- Display on Google Maps
- Save route on ride completion

### 5.8 Ride History
- Start/Stop ride recording
- Track duration, distance, speed
- Calculate safety score
- Store route points
- Display in list/calendar view

### 5.9 Analytics
- Weekly safety trends
- Monthly reports
- Incident frequency
- Riding patterns
- Dangerous behavior alerts

### 5.10 Notifications
- In-app notifications
- Browser push notifications
- SMS alerts (emergency)
- Email notifications

### 5.11 Admin Panel
- View all users
- View all SOS events
- View incident reports
- System statistics
- User management

---

## 6. API Routes (Convex Functions)

### Queries
- `getCurrentUser` - Fetch logged-in user
- `getUserContacts` - Get user's emergency contacts
- `getUserIncidents` - Get user's incidents
- `getUserRideHistory` - Get user's rides
- `getDashboardStats` - Get stats for dashboard

### Mutations
- `createUser` - Create new user
- `updateUser` - Update user profile
- `addEmergencyContact` - Add contact
- `updateEmergencyContact` - Update contact
- `deleteEmergencyContact` - Delete contact
- `createIncident` - Log new incident
- `updateIncidentStatus` - Update incident
- `startRide` - Start new ride
- `endRide` - End current ride
- `triggerSOS` - Manually trigger SOS
- `sendSosAlert` - Send SOS to contacts
- `markNotificationRead` - Mark as read

### HTTP Actions
- `sendSMS` - Twilio SMS endpoint
- `sendEmail` - Email notification endpoint

---

## 7. Security Requirements

- Environment variables for all secrets
- Input sanitization on all forms
- Authentication middleware on protected routes
- Rate limiting on SOS triggers (prevent spam)
- XSS protection via React
- CSRF protection via Convex
- Secure cookie settings

---

## 8. Environment Variables

```
# Convex
CONVEX_DEPLOYMENT=
CONVEX_SECRET_KEY=

# Authentication
AUTH_SECRET_KEY=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Email (Resend/SendGrid)
EMAIL_API_KEY=
EMAIL_FROM_ADDRESS=

# App
NEXT_PUBLIC_APP_URL=
```

---

## 9. Deployment Configuration

### Vercel Configuration
- Framework: Next.js
- Build command: `next build`
- Output directory: `.next`
- Install command: `npm install`

### Build Optimization
- Enable swc minification
- Optimize images
- Bundle analyzer (dev only)

---

## 10. File Structure

```
/app
  /layout.tsx
  /page.tsx (landing)
  /(auth)
    /login/page.tsx
    /register/page.tsx
    /forgot-password/page.tsx
  /(dashboard)
    /layout.tsx
    /page.tsx (dashboard)
    /camera/page.tsx
    /contacts/page.tsx
    /rides/page.tsx
    /analytics/page.tsx
    /settings/page.tsx
    /profile/page.tsx
  /(admin)
    /admin/page.tsx
/components
  /ui (shadcn components)
  /dashboard
  /camera
  /contacts
  /forms
  /layout
/lib
  /convex (convex client)
  /utils
  /hooks
/convex
  /schema.ts
  /functions.ts
/public
  /images
/styles
  /globals.css
```

---

## 11. Acceptance Criteria

### Authentication
- [ ] User can register with email/password
- [ ] User can login and receive session
- [ ] Protected routes redirect to login
- [ ] Role-based access works

### Dashboard
- [ ] Displays all status cards
- [ ] Real-time updates work
- [ ] Quick actions functional

### Emergency Contacts
- [ ] Can add/edit/delete contacts
- [ ] Primary contact can be set
- [ ] Validates input

### Collision Detection
- [ ] Camera access works
- [ ] Pose detection runs
- [ ] Sensor data collected
- [ ] Confidence scoring works

### SOS System
- [ ] Modal appears on detection
- [ ] Countdown functions
- [ ] "I'm Safe" cancels alert
- [ ] SOS sends notifications
- [ ] Incident logged

### Location
- [ ] GPS permissions requested
- [ ] Location displayed on map
- [ ] Route saved on ride

### Analytics
- [ ] Charts render correctly
- [ ] Data filters work

### Admin
- [ ] Admin can view all data
- [ ] Statistics displayed

---

## 12. Notes

- AI detection runs client-side for privacy/speed
- All sensitive operations happen server-side (Convex)
- Maps require API key (user must provide)
- SMS requires Twilio credentials (user must provide)
- Email requires API key (user must provide)
- Production deployment needs Vercel account