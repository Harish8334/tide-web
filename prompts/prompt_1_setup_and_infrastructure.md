# 📄 PROMPT FILE 1 — PROJECT SETUP, DESIGN SYSTEM & SHARED INFRASTRUCTURE

You are building a premium Next.js 14 website for a Physics Coaching Institute called "PhysicsCoach Pro". 
Install and use: @skill:modern-web-guidance @skill:taste @skill:ui-ux-pro-max

## STEP 1: PROJECT INITIALIZATION

Initialize the project in D:\test-prod\tide-web using:
  npx create-next-app@latest ./ --typescript --app --no-tailwind --src-dir --import-alias "@/*"

Then install dependencies:
  npm install socket.io-client recharts lucide-react

## STEP 2: DESIGN SYSTEM (src/styles/globals.css)

Create a comprehensive CSS design system with these exact tokens:

:root {
  --primary: #0056D2;
  --primary-light: #1A6EE8;
  --primary-dark: #003B99;
  --secondary: #1E3A5F;
  --bg: #0F172A;
  --surface: #1E2D40;
  --surface-2: #243447;
  --surface-3: #2D3F55;
  --accent: #FFD700;
  --success: #22C55E;
  --error: #DC2626;
  --warning: #F59E0B;
  --text: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --border: #2D3F55;
  --border-light: #3D5068;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
  --shadow-glow: 0 0 24px rgba(0,86,210,0.3);
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --font: 'Poppins', sans-serif;
}

Add Google Font import for Poppins (weights: 300, 400, 500, 600, 700, 800).
Set body { background: var(--bg); color: var(--text); font-family: var(--font); }

## STEP 3: SHARED COMPONENTS (src/components/)

### 3A. Navbar (src/components/Navbar.tsx)
Create a premium glassmorphism sticky navbar:
- Logo: "⚛️ PhysicsCoach Pro" in bold with gradient text (--primary to --accent)
- Left links: Home, Courses, About, Contact
- Right: If NOT logged in → "Login" outline button + "Get Started" filled button
- If logged IN → Avatar circle (first letter of name) + dropdown with: Dashboard, Profile, Logout
- Mobile: Hamburger menu → full-screen overlay nav with slide-in animation
- On scroll > 50px: navbar background becomes `backdrop-filter: blur(20px)` with border-bottom
- Active link has left-border accent or underline highlight

### 3B. Footer (src/components/Footer.tsx)
Three-column footer on dark surface:
- Col 1: Logo + tagline "India's Premier Physics Coaching Platform" + social icons (placeholder links)
- Col 2: Quick Links: Home, Courses, About, Contact, Privacy Policy, Terms of Service
- Col 3: Contact info: Email, Phone, Address placeholder
- Bottom bar: Copyright 2024 PhysicsCoach Pro | Built with ❤️ for Physics lovers
- Subtle top border gradient line

### 3C. AuthContext (src/context/AuthContext.tsx)
Mirror the mobile app's auth logic:
- State: { user, token, isLoading, isSignedIn }
- On mount: read token + user from localStorage, verify with GET /auth/profile
- login(email, password, role): POST /auth/login → save token + user to localStorage
- logout(): clear localStorage, reset state
- Roles: 'student', 'admin', 'instructor'
- Export useAuth() hook

### 3D. API Layer (src/lib/api.ts)
Create axios-like fetch wrapper:
- Base URL: http://52.64.117.32:8000/api
- apiClient({ method, endpoint, data, requiresAuth }): auto-attach Bearer token from localStorage
- Export typed API functions matching ALL endpoints from the app's constants:
  - auth: login, register, getProfile, updateProfile, getStats
  - courses: getAll, getById, getEnrolled, enroll
  - liveClasses: getAll, getByBatch, join, leave
  - exams: getByCourse, getById, submit, getStudentResults
  - files: getLectures, getMaterials
  - batches: getAll, getByBatch, getByCourse
  - admin: getAllUsers, updateUserStatus, updateUserRole, deleteUser
  - analytics: getDashboardStats

### 3E. Route Protection (src/middleware.ts)
- /student/* → redirect to /login if no token
- /admin/* → redirect to /login if no token OR role !== admin/instructor
- /login, /register → redirect to /student/dashboard if already logged in

## STEP 4: REUSABLE UI COMPONENTS

### CourseCard (src/components/CourseCard.tsx)
Props: { title, description, instructor, category, level, thumbnailUrl, price, isEnrolled, isPending, onEnroll, onClick }
Design:
- Dark surface card with border, hover: translateY(-4px) + shadow-glow
- Category badge (colored chip based on category)
- Level badge: Beginner=green, Intermediate=amber, Advanced=red
- Instructor avatar circle + name
- Bottom row: Enroll button OR "Enrolled ✓" badge OR "Pending ⏳"
- Smooth 0.3s hover transitions

### StatCard (src/components/StatCard.tsx)
Props: { icon, label, value, sublabel, color, onClick }
Design: 
- Glass card with colored top-border accent
- Large number value, small label below
- Icon in colored circle on top-left, arrow on top-right
- Hover scale 1.02

### LiveClassCard (src/components/LiveClassCard.tsx)
Props: { title, instructor, startTime, status, batchName, onJoin }
States: live (pulsing red badge), upcoming (blue), completed (gray)
- "LIVE NOW" badge with pulse animation (CSS keyframes)
- Join button only shows for live classes

### ExamCard (src/components/ExamCard.tsx)
Props: { title, course, duration, totalMarks, startDate, isAttempted, score, onAttempt }
- Countdown timer if not started
- Score badge if attempted (green/amber/red based on percentage)

### Loader (src/components/Loader.tsx)
- Centered spinner with --primary color
- Skeleton variant: animated shimmer cards for course/stat loading states

## STEP 5: LAYOUT FILES

### Public Layout (src/app/(public)/layout.tsx)
Wraps all public pages with Navbar + Footer

### Portal Layout (src/app/(student)/layout.tsx)
- Left sidebar navigation (desktop) / Bottom tab bar (mobile)
- Sidebar items: Dashboard, Courses, Live Classes, Exams, Study Material, Leaderboard, Profile
- Each with Lucide icon + label
- Active item: --primary background highlight
- Header bar with page title + user avatar dropdown

### Admin Layout (src/app/(admin)/layout.tsx)
- Same sidebar pattern but admin items: Dashboard, Students, Courses, Batches, Live Classes, Exams, Doubts, Analytics, Settings
- Admin badge: red "ADMIN" pill on sidebar top
