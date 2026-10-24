# 📄 PROMPT FILE 2 — PUBLIC MARKETING PAGES (Home, About, Courses Catalogue, Contact, Privacy, Terms)

Continue building the Physics Coaching website. 
Apply: @skill:modern-web-guidance @skill:taste @skill:ui-ux-pro-max

## PAGE 1: HOME PAGE (src/app/page.tsx)

Build a stunning, scroll-driven marketing homepage. Each section is separated by subtle gradient dividers.

### Section 1 — Hero (Full viewport height)
- Deep navy background (#0F172A) with animated particle dots (CSS only, no canvas libs)
- Large headline: "Master Physics. Ace Your Exams." — gradient text from --primary to --accent
- Subheadline: "India's most advanced Physics coaching for M.Sc, CSIR-NET, GATE & B.Ed aspirants"
- CTA buttons: "Explore Courses" (primary filled) + "Watch Demo" (outlined with play icon)
- Floating stats badges (animated count-up on scroll into view):
  - 🎓 2,000+ Students
  - 📚 50+ Courses  
  - 🏆 95% Success Rate
  - 🔴 Live Classes Daily
- Hero image/illustration: abstract physics equations + atom SVG illustration (generate with generate_image tool)
- Scroll indicator arrow at bottom

### Section 2 — Features Grid
Title: "Everything You Need to Excel"
6 feature cards in 3×2 grid with glassmorphism effect:
- 🎥 Live Interactive Classes (with real-time whiteboard)
- 📖 Recorded Lectures (watch anytime)
- 📝 Smart Exam System (auto-graded MCQs + OMR support)
- 🧪 Physics Lab Simulations
- 📊 Performance Analytics (leaderboards + mistake notebook)
- 💬 Ask a Doubt (get answers from instructors)

Each card: icon (Lucide), bold title, 2-line description, hover glow border

### Section 3 — Course Categories Showcase
Title: "Courses Designed for Every Aspirant"
Horizontal scrollable chips: M.Sc Physics | CSIR-NET/GATE | B.Ed & Pedagogy | Research & Lab | All Courses
Below: 3 featured CourseCard components (fetch from GET /courses, show first 3, or use placeholder data if API unavailable)
"View All Courses →" link at bottom

### Section 4 — How It Works (Steps)
Title: "Your Path to Success"
Numbered steps in a timeline/rail layout:
1. Register & Get Verified → Admin approves your account
2. Enroll in Your Course → Choose from curated Physics programs  
3. Join Live Classes → Interactive sessions with whiteboard + chat
4. Practice with Exams → Auto-graded tests with instant results
5. Track Your Progress → Leaderboard, analytics, mistake notebook

### Section 5 — Testimonials
Title: "What Our Students Say"
3 testimonial cards (placeholder data) with:
- Student avatar (letter circle), name, program
- Star rating (5 stars)
- Quote text
- Course badge

### Section 6 — CTA Banner
Full-width dark surface banner:
"Ready to Transform Your Physics Journey?"
"Join 2,000+ students learning with India's best physics faculty"
Big "Get Started Free" button → /register

### Section 7 — Footer (shared component)

## PAGE 2: ABOUT PAGE (src/app/about/page.tsx)

### Section 1 — Mission Hero
Split layout: Left text, Right image
- Headline: "Built by Physicists, For Physicists"  
- Body: Who we are, our mission, founding story placeholder
- Key numbers: 5+ Years, 2000+ Alumni, 50+ Expert Faculty

### Section 2 — Values Grid
4 values with large icons:
- 🎯 Excellence in Teaching
- 🔬 Research-Oriented Approach
- 🤝 Student-First Philosophy
- 🏅 Proven Track Record

### Section 3 — Faculty Section
Title: "Meet Our Expert Faculty"
3 faculty placeholder cards: Name, Specialization, Qualification, Avatar
Each card with LinkedIn icon (placeholder)

### Section 4 — Achievements Timeline
Key milestones (placeholder years/events) in a vertical timeline

## PAGE 3: COURSES CATALOGUE (src/app/courses/page.tsx)

This is the public version of the courses browser:

### Functionality:
- On mount: fetch GET /courses (public endpoint, no auth needed)
- Loading: show 6 CourseCard skeletons
- Error: show EmptyState with retry button

### Filters Bar (sticky on desktop):
- Search input: debounced 300ms, filters course title + description
- Category chips: All | M.Sc Physics | CSIR-NET/GATE | B.Ed & Pedagogy | Research & Lab
- Level filter: All | Beginner | Intermediate | Advanced
- Filter state managed in URL params (useSearchParams) for shareability

### Course Grid:
- Responsive: 3 cols desktop, 2 cols tablet, 1 col mobile
- CourseCard with enroll button → if not logged in → redirect to /login?redirect=/courses
- Enrolled state shown if user is logged in

### Empty State:
- If no courses match filters: illustration + "No courses found" + "Clear Filters" button

## PAGE 4: CONTACT PAGE (src/app/contact/page.tsx)

### Left Column — Contact Info:
- Address (placeholder)
- Email: contact@physicscoachpro.com (placeholder)
- Phone: +91 XXXXX XXXXX (placeholder)
- Operating Hours
- Google Maps embed (placeholder iframe)

### Right Column — Contact Form:
- Fields: Name*, Email*, Subject (dropdown: General Enquiry, Course Info, Technical Support, Partnership), Message*
- Validation: all required, email format check
- Submit: POST to backend if available, else show success toast
- Success state: ✓ animation + "We'll get back to you within 24 hours"

## PAGE 5: PRIVACY POLICY (src/app/privacy/page.tsx)
- Structured legal document layout
- Sections: Data Collection, How We Use Data, Data Security, Cookies, Third-Party Services, Your Rights, Contact Us
- Table of contents sidebar (sticky on desktop) with anchor links
- Last updated date
- Professional typography, good line-height, max-width 800px centered

## PAGE 6: TERMS OF SERVICE (src/app/terms/page.tsx)
- Same structure as Privacy Policy
- Sections: Acceptance, User Accounts, Course Enrollment, Payments & Refunds, Intellectual Property, Prohibited Conduct, Termination, Governing Law

## LOGIN PAGE (src/app/login/page.tsx)
Mirror the mobile LoginScreen.js:
- Split layout: Left = gradient hero with tagline + physics illustration, Right = login form
- Entrance animation: fadeIn + slideUp on mount (CSS animation)
- Role selector tabs: "Student" | "Instructor" (pill tabs, not dropdown)
- Email + Password fields with show/hide toggle
- Remember Me checkbox
- Forgot Password link (placeholder)
- Error display inline under relevant field
- "Don't have an account? Register →" link
- On success: redirect based on role (student→/student/dashboard, admin/instructor→/admin/dashboard)
- Google Sign-In button (placeholder, not functional)

## REGISTER PAGE (src/app/register/page.tsx)
Mirror RegisterScreen.js multi-step form:
Step 1: Role Selection (Student / Instructor cards with icons)
Step 2: Personal Info (firstName, lastName, email, password, confirmPassword, phone)
Step 3: Academic Info (program, institution, district)
Step 4: Review + Submit
- Progress bar at top (25% → 50% → 75% → 100%)
- API: POST /auth/register
- On success: show "Pending Approval" screen if student, redirect to login for instructor
