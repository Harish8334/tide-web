# 🚀 PHYSICS COACHING APP — MASTER WEBSITE PROMPT
### Complete Step-by-Step Gemini Prompt Package
> **Source App**: `D:\learning-app\real-app\PhysicsCoachingApp`
> **Source Backend**: `D:\my--backend`
> **Target**: `D:\test-prod\tide-web` (Next.js Web App)

---

## ⚡ BEFORE YOU START — INSTALL THESE SKILLS FIRST

Before Gemini begins any code, run these skill installs to unlock maximum quality:

```
@skill:modern-web-guidance
@skill:taste
@skill:ui-ux-pro-max
@skill:play-wright
@skill:a11y-debugging
```

> These skills enforce: premium UI/UX standards, glassmorphism aesthetics, WCAG accessibility, Playwright E2E testing, and modern web API patterns.

---

## 🗺️ OVERVIEW — WHAT YOU ARE BUILDING

You are building a **Next.js 14 (App Router) website** for a Physics Coaching Institute. This is NOT a simple landing page — it is a **full web portal** that mirrors a React Native mobile app. It has:

1. **Public Marketing Pages** → Home, About, Courses Catalogue, Contact, Privacy Policy, Terms
2. **Student Portal** → Login, Register, Dashboard, My Courses, Live Classes, Exams, Results, Study Material, Leaderboard, Profile
3. **Admin/Instructor Panel** → Dashboard with analytics, Manage Students, Manage Courses, Manage Batches, Manage Live Classes, Manage Exams, OMR Scanner results, Doubts & DPP management
4. **Shared Infrastructure** → Auth context (JWT), API layer (same backend), Real-time socket integration for Live Classes

**Tech Stack:**
- Framework: Next.js 14 (App Router)
- Styling: Vanilla CSS + CSS Variables (NO Tailwind unless explicitly asked)
- Auth: JWT via `localStorage` + `AuthContext`
- Real-time: `socket.io-client`
- Fonts: Poppins (Google Fonts)
- Icons: Lucide React
- Charts: Recharts
- API Base: `http://52.64.117.32:8000/api`

**Design Palette (from app's `constants.js`):**
```
PRIMARY:         #0056D2   (deep Coursera blue)
PRIMARY_LIGHT:   #1A6EE8
SECONDARY:       #1E3A5F
BACKGROUND:      #0F172A   (deep navy dark)
SURFACE:         #1E2D40
SURFACE_2:       #243447
ACCENT:          #FFD700   (gold)
SUCCESS:         #22C55E
ERROR:           #DC2626
WARNING:         #F59E0B
TEXT:            #F1F5F9
TEXT_SECONDARY:  #94A3B8
BORDER:          #2D3F55
```

---

## PROMPTS INDEX:
1. `prompts/prompt_1_setup_and_infrastructure.md`
2. `prompts/prompt_2_public_marketing_pages.md`
3. `prompts/prompt_3_student_portal.md`
4. `prompts/prompt_4_student_features.md`
5. `prompts/prompt_5_admin_panel.md`
