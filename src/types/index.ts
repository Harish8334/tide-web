// src/types/index.ts

export type UserRole = 'student' | 'admin' | 'instructor';
export type UserStatus = 'active' | 'pending' | 'rejected' | 'suspended';

export interface User {
  _id: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  phone?: string;
  whatsappNumber?: string;
  program?: string;
  institution?: string;
  district?: string;
  dob?: string;
  avatar?: string;
  enrolledCourses?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  category: 'M.Sc Physics' | 'CSIR-NET/GATE' | 'B.Ed & Pedagogy' | 'Research & Lab' | 'Other' | string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnailUrl?: string;
  price?: number;
  instructor?: {
    _id?: string;
    name?: string;
    email?: string;
  } | string;
  tags?: string[];
  units?: CourseUnit[];
  enrolledCount?: number;
  isEnrolled?: boolean;
  isPending?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseUnit {
  id?: string;
  title: string;
  description?: string;
  topics?: string[];
}

export interface LiveClass {
  _id: string;
  title: string;
  description?: string;
  batch?: {
    _id?: string;
    name?: string;
  } | string;
  instructor?: {
    _id?: string;
    name?: string;
  } | string;
  scheduledAt?: string;
  startTime?: string;
  endTime?: string;
  duration?: number; // in minutes
  status: 'scheduled' | 'live' | 'ongoing' | 'completed' | 'cancelled';
  meetLink?: string;
  participantsCount?: number;
  createdAt?: string;
}

export interface ExamQuestion {
  _id?: string;
  id?: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  } | string[];
  correctOption?: 'A' | 'B' | 'C' | 'D' | number;
  marks?: number;
  negativeMarks?: number;
  explanation?: string;
}

export interface Exam {
  _id: string;
  title: string;
  description?: string;
  course?: {
    _id?: string;
    title?: string;
  } | string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks?: number;
  startDate?: string;
  endDate?: string;
  questions?: ExamQuestion[];
  isAttempted?: boolean;
  score?: number;
  createdAt?: string;
}

export interface ExamSubmissionAnswer {
  questionId: string;
  selectedOption: string | number;
}

export interface ExamResult {
  _id: string;
  examId: string;
  examTitle?: string;
  studentId: string;
  studentName?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeTakenMinutes?: number;
  submittedAt: string;
  questionReview?: {
    questionId: string;
    questionText: string;
    selectedOption: string | number;
    correctOption: string | number;
    isCorrect: boolean;
    explanation?: string;
  }[];
}

export interface Batch {
  _id: string;
  name: string;
  course?: {
    _id?: string;
    title?: string;
  } | string;
  instructor?: {
    _id?: string;
    name?: string;
  } | string;
  schedule?: {
    days?: string[];
    time?: string;
  };
  maxStudents?: number;
  studentsCount?: number;
  students?: User[] | string[];
  createdAt?: string;
}

export interface StudyMaterial {
  _id: string;
  title: string;
  courseId: string;
  fileUrl: string;
  fileSize?: string;
  fileType?: 'pdf' | 'doc' | 'notes' | string;
  uploadedAt?: string;
}

export interface Lecture {
  _id: string;
  title: string;
  courseId: string;
  unitNumber?: number;
  duration?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
  uploadedAt?: string;
}

export interface Doubt {
  _id: string;
  courseId: string;
  courseTitle?: string;
  studentId: string;
  studentName?: string;
  subject: string;
  question: string;
  imageUrl?: string;
  status: 'pending' | 'answered';
  answer?: string;
  answeredBy?: string;
  createdAt?: string;
  answeredAt?: string;
}

export interface Formula {
  _id: string;
  chapter: string;
  name: string;
  latex: string;
  description?: string;
  tags?: string[];
}

export interface StudentStats {
  enrolledCourses: number;
  avgScore: number;
  studyHours: number;
  rank: number | string;
}

export interface AdminDashboardStats {
  totalStudents: number;
  activeCourses: number;
  totalBatches: number;
  liveClassesToday: number;
  pendingEnrollments: number;
  pendingApprovals: number;
  totalExams: number;
  avgScore: number;
}
