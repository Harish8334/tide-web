# 📄 PROMPT FILE 4 — STUDY MATERIAL, LEADERBOARD, PROFILE & MORE STUDENT FEATURES

Continue building remaining student portal features.
Apply: @skill:modern-web-guidance @skill:taste @skill:a11y-debugging

## STUDY MATERIALS PAGE (src/app/(student)/study-material/page.tsx)
Mirror StudyMaterialsScreen.js:

### Course selector:
Dropdown of enrolled courses → on select, fetch content for that course

### Two tabs: Lectures | Materials

#### Lectures tab:
GET /files/lectures/{courseId}
Show LectureCards: thumbnail, title, duration, unit number
Click → navigate to /student/video/{lectureId}
Sort by unit number ascending

#### Materials tab:
GET /files/materials/{courseId}
Show MaterialCards: PDF icon, title, file size, upload date
Click → navigate to /student/pdf/{materialId}
Download icon → trigger file download

## VIDEO PLAYER PAGE (src/app/(student)/video/[lectureId]/page.tsx)
- Native HTML5 <video> element with controls
- Video source from lecture.videoUrl (from backend)
- Below video: lecture title, instructor, unit info
- Back button to Study Materials
- Responsive: full-width on mobile

## PDF VIEWER PAGE (src/app/(student)/pdf/[materialId]/page.tsx)
- Embed PDF via <iframe src={material.fileUrl}> or react-pdf
- Title bar with download button + fullscreen toggle
- Mobile: direct download link if iframe doesn't render well

## LEADERBOARD PAGE (src/app/(student)/leaderboard/page.tsx)
Mirror LeaderboardScreen.js:

### Top 3 Podium:
Styled podium (1st=gold, 2nd=silver, 3rd=bronze) showing avatar + name + score
Animated entrance: each podium box scales up on mount

### Full Rankings Table:
Columns: Rank | Avatar | Name | Score | Exams Taken | Streak
Current user's row highlighted with --primary border
Pagination: 20 per page
Data: GET /analytics/leaderboard (or derive from exam results)

## PROFILE PAGE (src/app/(student)/profile/page.tsx)
Mirror ProfileScreen.js:

### Profile Header:
Large avatar circle (first letter, gradient background)
Name + email + role badge + status badge (Active=green, Pending=amber)

### Edit Profile Form:
Fields: firstName, lastName, phone, whatsappNumber, program, institution, district, dob
PUT /auth/profile on save
Success toast: "Profile updated successfully ✓"

### Stats Section:
Same StatCards as dashboard but larger + always visible

### Account Actions:
- Change Password (modal with oldPassword, newPassword, confirmPassword)
- Logout (confirm dialog → AuthContext.logout() → redirect to /)
- Delete Account (red button, double-confirm modal)

## ASK A DOUBT PAGE (src/app/(student)/doubts/page.tsx)
Mirror AskDoubtScreen.js:

### New Doubt Form:
- Course selector dropdown
- Subject/topic text input
- Doubt description textarea (support LaTeX preview for math symbols)
- Math symbol picker component (grid of common physics/math symbols to insert)
- Attach image button (placeholder)
- Submit → POST /doubts

### My Doubts List:
- Each doubt card: title, status (pending/answered), timestamp
- If answered: show instructor's response highlighted in green
- Filter: All | Pending | Answered

## MISTAKE NOTEBOOK (src/app/(student)/mistakes/page.tsx)
Mirror MistakeNotebookScreen.js:

- Questions where student selected wrong answer are auto-saved
- Grouped by Course, then by Exam
- Each mistake entry: question text, my answer (red), correct answer (green), explanation
- Filter by course dropdown
- "Practice Again" button per section → opens mini-quiz with only mistake questions

## FORMULA HANDBOOK (src/app/(student)/formulas/page.tsx)
Mirror FormulaHandbookScreen.js:

- Chapter tabs: Mechanics | Thermodynamics | Electromagnetism | Optics | Modern Physics | Quantum Mechanics
- Each formula card: formula name, LaTeX rendered formula (use katex or similar), usage note
- Search across all formulas
- Bookmark icon per formula (saved to localStorage)
- "My Bookmarks" filter tab

## ATTENDANCE PAGE (src/app/(student)/attendance/page.tsx)
Mirror AttendanceScreen.js:

- Calendar view: green day = attended, red = missed, gray = no class
- Monthly selector (prev/next month)
- Stats: Total Classes | Attended | Missed | Attendance %
- Color-coded progress bar for attendance %
- Warning banner if attendance < 75%

## PHYSICS LAB PAGE (src/app/(student)/lab/page.tsx)
Mirror PhysicsLabScreen.js:

- Grid of lab experiment cards: title, subject area, interactive/video badge
- Click → embedded simulation (iframe to PhET or similar, or placeholder)
- Categories: Mechanics, Electromagnetism, Optics, Thermodynamics, Modern Physics

## OMR SCANNER RESULT PAGE (src/app/(student)/omr/page.tsx)
Mirror OMRScannerScreen.js:

- Upload image of OMR sheet → POST /omr/scan
- Show scanned answers grid
- Compare with answer key → highlight correct (green) and wrong (red)
- Score summary card
- Mobile camera capture button
