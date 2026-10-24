# 📄 PROMPT FILE 3 — STUDENT PORTAL (Dashboard, Courses, Live Classes, Exams)

Continue building the student portal for PhysicsCoach Pro.
Apply: @skill:modern-web-guidance @skill:taste @skill:ui-ux-pro-max

All pages below live under src/app/(student)/ and use the student layout with sidebar.
All API calls require Authorization: Bearer <token> from AuthContext.

## STUDENT DASHBOARD (src/app/(student)/dashboard/page.tsx)

Mirror HomeScreen.js from the mobile app:

### Hero Header Section:
- Time-based greeting: "Good Morning/Afternoon/Evening, {firstName}! 👋"
- User avatar circle (first letter, --primary background)
- Notification bell icon (placeholder)

### Stats Row (4 cards):
Fetch from GET /auth/stats and display:
- 📚 Enrolled Courses (stats.enrolledCourses)
- 🎯 Avg Score (stats.avgScore + "%" with color: <60 red, 60-80 amber, >80 green)
- ⏱️ Study Hours (stats.studyHours)
- 🏆 Rank (stats.rank or "—")
Loading state: shimmer skeleton for all 4 cards simultaneously

### Quick Actions Row:
Icon buttons with label: Live Classes | Exams | Study Material | Leaderboard | Ask Doubt

### Enrolled Courses Section:
- Title: "Continue Learning"
- Fetch from GET /courses/student/enrolled
- Horizontal scroll on mobile, grid on desktop
- Each card: CourseCard with "Continue →" button → navigate to /student/courses/{id}
- Empty state: "You haven't enrolled in any courses yet. Browse Courses →"

### Upcoming Live Classes Widget:
- Fetch GET /live-classes/all (filter to upcoming in next 24h)
- Show 2 upcoming as compact cards with countdown timer
- "LIVE NOW" pulsing badge for active classes
- "Join →" button

### Recent Exam Results Widget:
- Fetch GET /exams/results/student/all
- Show last 3 results as score badges
- Mini bar chart of last 5 scores using Recharts BarChart

## MY COURSES PAGE (src/app/(student)/courses/page.tsx)

### Two Tabs:
Tab 1 — "Enrolled Courses": GET /courses/student/enrolled
Tab 2 — "Browse All": GET /courses with search + filter

### Enrolled tab:
- Full CourseCard grid with "View Course" button
- Progress bar per course (placeholder %)
- "Pending Approval" badge for courses awaiting enrollment confirmation

### Browse tab:
- Same filter chips as public catalogue page (M.Sc Physics, CSIR-NET/GATE, etc.)
- Search: debounced 300ms
- Enroll button → POST /courses/{courseId}/enroll
- Show success toast + update local state to "Pending"

## COURSE DETAIL PAGE (src/app/(student)/courses/[courseId]/page.tsx)

Mirror CourseDetailScreen.js:

### Hero Section:
- Course thumbnail (or gradient placeholder)
- Title, instructor name, category badge, level badge, enrolled count
- Enroll/Enrolled status button

### Tabbed Content (4 tabs):
Tab 1 — Overview: description, syllabus units, topics list
Tab 2 — Lectures: GET /files/lectures/{courseId} → LectureCard list with video player link
Tab 3 — Materials: GET /files/materials/{courseId} → MaterialCard list with PDF viewer link
Tab 4 — Exams: GET /exams/course/{courseId} → ExamCard list

### Tabs UI:
- Underline-style tab indicator
- Smooth content fade-in on tab switch

## LIVE CLASSES PAGE (src/app/(student)/live-classes/page.tsx)

Mirror LiveClassesScreen.js:

### Filter Tabs: All | 🔴 Live Now | Upcoming | Past
- "Live Now" tab has pulsing red dot indicator

### Class Card with real-time status:
On mount and every 30 seconds: fetch GET /live-classes/all
isLive logic:
  - status === 'live' OR status === 'ongoing' AND endTime > now → LIVE
  - status === 'scheduled' AND startTime > now → UPCOMING
  - else → PAST

For LIVE classes: show red "🔴 LIVE NOW" badge with CSS pulse animation
  Join button → POST /live-classes/{classId}/join → redirect to /student/live/{classId}

For UPCOMING: show countdown timer (days:hours:mins:secs) updating every second with setInterval

## LIVE CLASS ROOM (src/app/(student)/live/[classId]/page.tsx)

Mirror JoinLiveClassScreen.js + LiveClassLobbyScreen.js:

### Layout:
- Main video area (left 70%) — WebRTC peer stream or placeholder video
- Right panel (30%) — participant list + chat
- Bottom toolbar: Mic toggle, Camera toggle, Screen share, Raise hand, Leave

### Socket Integration:
Connect to SOCKET_URL with token: io(SOCKET_URL, { auth: { token } })
Events to listen:
- 'class:started' → show video
- 'class:ended' → show "Class has ended" overlay
- 'chat:message' → append to chat list
- 'participant:joined/left' → update participant count
- 'quiz:started' → show LiveQuizModal overlay

Events to emit:
- 'join:class' with classId
- 'chat:send' with { classId, message }
- 'hand:raise' with { classId }

### Chat Panel:
- Message list with sender name + timestamp
- Input box at bottom with send button
- Auto-scroll to bottom on new message

## EXAMS PAGE (src/app/(student)/exams/page.tsx)

Mirror ExamsScreen.js:

### Filter Tabs: All | Ready | Completed
Fetch all enrolled course IDs from context, then for each: GET /exams/course/{courseId}
Merge, deduplicate, and sort by startDate descending

### ExamCard shows:
- Exam title + course name
- Duration + total marks
- Status badge: "Attempt Now" (blue) | "Completed ✓" (green) | "Locked 🔒" (if before startDate)
- For completed: score badge (e.g., "85/100") + "View Result" button
- For not-attempted: "Start Exam →" button
- Countdown timer if exam starts in future

## EXAM ATTEMPT PAGE (src/app/(student)/exams/[examId]/attempt/page.tsx)

Mirror ExamAttemptScreen.js:

### Functionality:
- Fetch exam questions: GET /exams/{examId}
- Timer: countdown from exam.duration minutes, auto-submit when reaches 0
- Question navigation: numbered grid (green=answered, gray=unanswered, current=blue highlight)
- Each question: MCQ with 4 options, single select
- Mark for review: yellow flag icon
- Submit confirmation modal: "Are you sure? X questions unanswered."
- POST /exams/{examId}/submit with { answers: [{questionId, selectedOption}] }
- On success: redirect to /student/exams/{examId}/result

### Anti-cheat: 
- Track tab switches with visibilitychange event (log only, no enforcement)
- Warn on page refresh attempt

## RESULTS PAGE (src/app/(student)/exams/[examId]/result/page.tsx)
Fetch GET /exams/{examId}/result:
- Score display: large circular progress ring (CSS conic-gradient)
- Pass/Fail badge based on threshold
- Question-by-question review: correct=green, wrong=red with correct answer shown
- Share result button (copy link to clipboard)
- "Take Again" or "Back to Exams" buttons
