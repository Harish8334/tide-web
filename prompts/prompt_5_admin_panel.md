# 📄 PROMPT FILE 5 — ADMIN/INSTRUCTOR PANEL (Full Dashboard + All Management Screens)

Build the complete Admin and Instructor panel for PhysicsCoach Pro.
Apply: @skill:modern-web-guidance @skill:taste @skill:ui-ux-pro-max @skill:play-wright

All pages under src/app/(admin)/. Only accessible to role === 'admin' OR role === 'instructor'.
Use the admin sidebar layout with red "ADMIN" badge.

## ADMIN DASHBOARD (src/app/(admin)/dashboard/page.tsx)
Mirror AdminDashboardScreen.js (the most feature-rich screen):

### Hero Stats Bar (8 cards):
Fetch from GET /analytics/dashboard-stats or combine multiple endpoints:
1. Total Students (GET /auth/users count where role=student)
2. Active Courses (GET /courses count)
3. Total Batches (GET /batches count)
4. Live Classes Today (GET /live-classes filter by today)
5. Pending Enrollments
6. Pending Approvals (students with status=pending)
7. Total Exams
8. Avg Score (from analytics)

Each StatCard: colored top border, icon, value (animated count-up on load), label, click → navigate to management page

### Charts Section (using Recharts):
Row 1:
- BarChart: Enrollment by Course (x=course name, y=student count) - 60% width
- DonutChart: Student status breakdown (Active/Pending/Rejected) - 40% width

Row 2:
- LineChart: Exam scores over last 6 months - 100% width

Chart containers: dark surface card, chart title, tooltip on hover, responsive

### Quick Actions Grid:
Large action tiles with icon + label + description:
- 📚 Create Course → /admin/courses/new
- 👥 Manage Students → /admin/students
- 🎥 Schedule Live Class → /admin/live-classes/new
- 📝 Create Exam → /admin/exams/new
- 📦 Create Batch → /admin/batches/new
- 📊 View Analytics → /admin/analytics
- 🔔 Send Notification → modal
- 📋 Enrollment Requests → /admin/enrollments

### Recent Activity Feed:
Last 10 actions: student registrations, enrollments, exam submissions
Each item: action type icon, description, timestamp (relative: "2 mins ago")

### Countdown Timer Widget:
Mirror countdownApi from app:
- Show active countdown (e.g., "Exam starts in 2 days 4 hours")
- Inline "Edit Countdown" form if admin

## MANAGE STUDENTS (src/app/(admin)/students/page.tsx)
Mirror ManageStudentsScreen.js:

### Filter Bar:
- Search by name/email
- Status filter: All | Active | Pending | Rejected | Suspended
- Role filter: All | Student | Instructor
- Batch filter dropdown

### Students Table:
Columns: Avatar | Name | Email | Role | Status | Program | Institution | Actions
Actions column: 
- View (modal with full profile)
- ✅ Approve (PUT /auth/users/{id}/status {status:'active'}) — only for pending
- ❌ Reject (with reason modal) — only for pending
- ⏸ Suspend / 🔄 Reactivate
- 🗑️ Delete (with double confirm)
- Role change dropdown

Bulk actions: select multiple → bulk approve/reject

### Student Detail Modal:
Full profile info, enrolled courses, exam scores, attendance %

## MANAGE COURSES (src/app/(admin)/courses/page.tsx)
Mirror ManageCoursesScreen.js + CourseFormScreen.js:

### Course List Table:
Columns: Thumbnail | Title | Category | Instructor | Level | Enrolled Count | Actions
Actions: Edit | View Detail | Delete

### Create/Edit Course Form (/admin/courses/new and /admin/courses/[id]/edit):
Mirror CourseFormScreen.js:
- Title (required)
- Description (rich textarea)
- Category (select: M.Sc Physics | CSIR-NET/GATE | B.Ed & Pedagogy | Research & Lab | Other)
- Level (Beginner | Intermediate | Advanced)
- Instructor (searchable dropdown → GET /auth/users?role=instructor)
- Thumbnail URL input + preview
- Price field
- Tags input (comma-separated → array)
- Units section: dynamic add/remove unit with title + description + topics (add/remove)
  
### Course Detail Admin View (/admin/courses/[id]):
Mirror CourseDetailAdminScreen.js:
- Enrolled students count + pending enrollments count
- Tabs: Info | Students | Materials | Exams
- In Students tab: table of enrolled students with status
- "Upload Material" button → chunked upload modal
- "Add Exam" button → navigate to exam form pre-filled with courseId

## MANAGE BATCHES (src/app/(admin)/batches/page.tsx)
Mirror ManageBatchesScreen.js + BatchFormScreen.js + BatchDetailScreen.js:

### Batch List:
Cards showing: batch name, course name, student count, instructor, schedule
Actions: View | Edit | Delete

### Batch Form:
- Batch name
- Course (dropdown)
- Instructor (dropdown)
- Schedule: days of week checkboxes + time input
- Max students

### Batch Detail (/admin/batches/[id]):
- Enrolled students table with remove button (DELETE /batches/{id}/students/{studentId})
- "Add Students" modal with searchable student list + checkbox multi-select
- Live classes scheduled for this batch

## MANAGE LIVE CLASSES (src/app/(admin)/live-classes/page.tsx)
Mirror ManageLiveClassesScreen.js + LiveClassFormScreen.js:

### Live Classes List:
Status tabs: Upcoming | Live | Completed
Table: Title | Batch | Instructor | Scheduled At | Duration | Status | Actions
Actions: Start ▶️ | End ⏹️ | Edit | Delete

### Create/Edit Live Class Form:
- Title
- Batch (dropdown)
- Instructor (dropdown)
- Scheduled Date + Time (datetime-local input)
- Duration (minutes slider)
- Description

### Live Class Management View (/admin/live-classes/[id]/host):
Mirror the HOST view with:
- HostControlPanel: mute all, end class, kick participants
- Participant count live via socket
- Chat moderation (delete messages)
- Start live quiz button → quiz form modal

## MANAGE EXAMS (src/app/(admin)/exams/page.tsx)
Mirror ManageExamsScreen.js + ExamFormScreen.js + ExamStatsScreen.js:

### Exams List:
Table: Title | Course | Duration | Total Marks | Questions | Start Date | Status | Actions

### Exam Form (/admin/exams/new):
- Exam title
- Course (dropdown)
- Duration (minutes)
- Start Date/Time + End Date/Time
- Questions section (dynamic):
  - Question text
  - Option A/B/C/D inputs
  - Correct answer selector (radio)
  - Marks (default 1)
  - Negative marking toggle
  - Add/Remove question button
  - Drag to reorder (sortable)
- Total marks auto-calculated

### Exam Stats (/admin/exams/[id]/stats):
Mirror ExamStatsScreen.js:
- Overall stats: avg score, highest, lowest, pass rate
- Score distribution histogram (Recharts BarChart, x=score range, y=student count)
- Per-question analysis: question text + % students who got it right → identify weak questions
- Student-wise results table: name, score, time taken, status

## MANAGE DOUBTS (src/app/(admin)/doubts/page.tsx)
Mirror ManageDoubtsScreen.js:

- List of all student doubts ordered by newest first
- Filter: All | Pending | Answered
- Each doubt: student name + avatar, course, question, timestamp
- Click → expand with "Reply" textarea + submit button
- PUT /doubts/{id}/answer → marks as answered

## MANAGE DPP (src/app/(admin)/dpp/page.tsx)
Mirror ManageDPPScreen.js:
- DPP = Daily Practice Problems
- List of DPPs per course/batch
- Create DPP: title, batch/course, questions (same form as exam questions)
- Publish/Draft toggle

## ENROLLMENT REQUESTS (src/app/(admin)/enrollments/page.tsx):
Mirror EnrollmentRequestsScreen.js:
- Table: Student Name | Course | Date Requested | Status | Actions
- Bulk approve/reject buttons
- Individual approve: POST /courses/{courseId}/enroll/approve/{userId}
- Individual reject: with optional reason text

## MANAGE FORMULAS (src/app/(admin)/formulas/page.tsx):
Mirror ManageFormulasScreen.js:
- CRUD for formula handbook entries
- Fields: chapter, formula name, LaTeX string, description, tags
- Preview LaTeX in real time

## STUDENT ANALYTICS PAGE (src/app/(admin)/analytics/page.tsx):
Mirror MistakeAnalyticsScreen.js:
- Select student dropdown
- Show: exam history table, score trend line chart, most-missed topics (bar chart)
- Attendance calendar for selected student
- Downloadable PDF report button (placeholder)

## ATTENDANCE MANAGEMENT (src/app/(admin)/attendance/page.tsx):
Mirror AttendanceManagementScreen.js:
- Select batch → select date → show student list with present/absent toggle
- POST /attendance/mark with { batchId, date, records: [{studentId, status}] }
- View attendance report by student or by date range

## GLOBAL TOAST SYSTEM:
Create src/components/Toast.tsx:
- Stack of toasts in bottom-right corner
- Types: success (green), error (red), warning (amber), info (blue)
- Auto-dismiss after 4 seconds
- Slide-in from right animation
- Context: ToastContext with showToast(message, type) function
- Use throughout all admin forms for success/error feedback

## PLAYWRIGHT E2E TESTS (src/tests/):
@skill:play-wright — Write Playwright tests for:
1. test/auth.spec.ts: login flow (student + admin), invalid credentials, logout
2. test/courses.spec.ts: browse courses, enroll in a course, view course detail
3. test/exams.spec.ts: attempt exam, submit, view result
4. test/admin.spec.ts: approve student, create course, create exam
5. test/navigation.spec.ts: all nav links reachable, 404 page exists

Each test file: 5-10 test cases, use data-testid attributes for reliable selectors.
