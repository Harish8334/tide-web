const REMOTE_API = 'http://52.64.117.32:8000/api';
const API_BASE = typeof window === 'undefined' ? REMOTE_API : '/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

interface FetchOptions {
  method?: string;
  data?: unknown;
  requiresAuth?: boolean;
  params?: Record<string, string | number>;
}

async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', data, requiresAuth = true, params } = options;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (requiresAuth) {
    const tok = getToken();
    if (tok) headers['Authorization'] = `Bearer ${tok}`;
  }

  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    );
    url += `?${query}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    apiClient('/auth/login', { method: 'POST', data: { email, password }, requiresAuth: false }),
  register: (data: Record<string, unknown>) =>
    apiClient('/auth/register', { method: 'POST', data, requiresAuth: false }),
  getProfile: () => apiClient('/auth/profile'),
  updateProfile: (data: Record<string, unknown>) =>
    apiClient('/auth/profile', { method: 'PUT', data }),
  getStats: () => apiClient('/auth/stats'),
  logout: () => apiClient('/auth/logout', { method: 'POST' }),
  getAllUsers: (params?: Record<string, string | number>) =>
    apiClient('/auth/users', { params }),
  getStudents: (params?: Record<string, string | number>) =>
    apiClient('/auth/users', { params: { role: 'student', ...params } }),
  updateUserStatus: (userId: string, status: string, reason?: string) =>
    apiClient(`/auth/users/${userId}/status`, { method: 'PUT', data: { status, rejectionReason: reason } }),
  updateUserRole: (userId: string, role: string) =>
    apiClient(`/auth/users/${userId}/role`, { method: 'PUT', data: { role } }),
  updateUser: (userId: string, data: Record<string, unknown>) =>
    apiClient(`/auth/users/${userId}`, { method: 'PUT', data }),
  deleteUser: (email: string) =>
    apiClient('/auth/delete-user', { method: 'DELETE', data: { email } }),
};

// ─── COURSES ─────────────────────────────────────────────────────────────────
export const courseApi = {
  getAll: (params?: Record<string, string | number>) =>
    apiClient('/courses', { requiresAuth: false, params }),
  getById: (courseId: string) =>
    apiClient(`/courses/${courseId}`, { requiresAuth: false }),
  getEnrolled: () => apiClient('/courses/student/enrolled'),
  enroll: (courseId: string) =>
    apiClient(`/courses/${courseId}/enroll`, { method: 'POST' }),
  getPendingEnrollments: () => apiClient('/courses/enrollment-requests'),
  create: (data: Record<string, unknown>) =>
    apiClient('/courses', { method: 'POST', data }),
  update: (courseId: string, data: Record<string, unknown>) =>
    apiClient(`/courses/${courseId}`, { method: 'PUT', data }),
  delete: (courseId: string) =>
    apiClient(`/courses/${courseId}`, { method: 'DELETE' }),
  approveEnrollment: (courseId: string, userId: string) =>
    apiClient(`/courses/${courseId}/enroll/approve/${userId}`, { method: 'POST' }),
  rejectEnrollment: (courseId: string, userId: string) =>
    apiClient(`/courses/${courseId}/enroll/reject/${userId}`, { method: 'POST' }),
};

// ─── LIVE CLASSES ─────────────────────────────────────────────────────────────
export const liveClassApi = {
  getAll: () => apiClient('/live-classes/all', { requiresAuth: false }),
  getByBatch: (batchId: string) => apiClient(`/live-classes/batch/${batchId}`),
  join: (classId: string) =>
    apiClient(`/live-classes/${classId}/join`, { method: 'POST' }),
  leave: (classId: string) =>
    apiClient(`/live-classes/${classId}/leave`, { method: 'POST' }),
  create: (data: Record<string, unknown>) =>
    apiClient('/live-classes', { method: 'POST', data }),
  update: (classId: string, data: Record<string, unknown>) =>
    apiClient(`/live-classes/${classId}`, { method: 'PUT', data }),
  start: (classId: string) =>
    apiClient(`/live-classes/${classId}/start`, { method: 'POST' }),
  end: (classId: string) =>
    apiClient(`/live-classes/${classId}/end`, { method: 'POST' }),
  delete: (classId: string) =>
    apiClient(`/live-classes/${classId}`, { method: 'DELETE' }),
};

// ─── EXAMS ────────────────────────────────────────────────────────────────────
export const examApi = {
  getAll: (params?: Record<string, string | number>) => apiClient('/exams', { params }),
  getByCourse: (courseId: string) => apiClient(`/exams/course/${courseId}`),
  getById: (examId: string) => apiClient(`/exams/${examId}`),
  submit: (examId: string, payload: { answers: { questionId: string; selectedOption: string | number }[] } | { questionId: string; selectedOption: string | number }[]) =>
    apiClient(`/exams/${examId}/submit`, { method: 'POST', data: Array.isArray(payload) ? { answers: payload } : payload }),
  getResult: (examId: string) => apiClient(`/exams/${examId}/result`),
  getStudentResults: () => apiClient('/exams/results/student/all'),
  getStatistics: (examId: string) => apiClient(`/exams/${examId}/statistics`),
  create: (data: Record<string, unknown>) =>
    apiClient('/exams', { method: 'POST', data }),
  update: (examId: string, data: Record<string, unknown>) =>
    apiClient(`/exams/${examId}`, { method: 'PUT', data }),
  delete: (examId: string) =>
    apiClient(`/exams/${examId}`, { method: 'DELETE' }),
};

// ─── FILES ────────────────────────────────────────────────────────────────────
export const fileApi = {
  getLectures: (courseId: string) => apiClient(`/files/lectures/${courseId}`),
  getMaterials: (courseId: string) => apiClient(`/files/materials/${courseId}`),
};

// ─── BATCHES ─────────────────────────────────────────────────────────────────
export const batchApi = {
  getAll: () => apiClient('/batches'),
  getByCourse: (courseId: string) => apiClient(`/batches/course/${courseId}`),
  getById: (batchId: string) => apiClient(`/batches/${batchId}`),
  create: (data: Record<string, unknown>) =>
    apiClient('/batches', { method: 'POST', data }),
  update: (batchId: string, data: Record<string, unknown>) =>
    apiClient(`/batches/${batchId}`, { method: 'PUT', data }),
  delete: (batchId: string) =>
    apiClient(`/batches/${batchId}`, { method: 'DELETE' }),
  addStudents: (batchId: string, studentIds: string[]) =>
    apiClient(`/batches/${batchId}/students`, { method: 'POST', data: { studentIds } }),
  removeStudent: (batchId: string, studentId: string) =>
    apiClient(`/batches/${batchId}/students/${studentId}`, { method: 'DELETE' }),
};

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
export const analyticsApi = {
  getDashboard: () => apiClient('/analytics/dashboard'),
  getLeaderboard: () => apiClient('/analytics/leaderboard'),
};

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────
export const attendanceApi = {
  getMyAttendance: (courseId?: string) =>
    apiClient('/attendance/my', { params: courseId ? { courseId } : undefined }),
  markAttendance: (data: Record<string, unknown>) =>
    apiClient('/attendance/mark', { method: 'POST', data }),
  getBatchAttendance: (batchId: string, date?: string) =>
    apiClient(`/attendance/batch/${batchId}`, { params: date ? { date } : undefined }),
};

// ─── DOUBTS ──────────────────────────────────────────────────────────────────
export const doubtApi = {
  getAll: (params?: Record<string, string | number>) =>
    apiClient('/doubts', { params }),
  getById: (doubtId: string) => apiClient(`/doubts/${doubtId}`),
  create: (data: Record<string, unknown>) =>
    apiClient('/doubts', { method: 'POST', data }),
  answer: (doubtId: string, answer: string) =>
    apiClient(`/doubts/${doubtId}/answer`, { method: 'PUT', data: { answer } }),
};

// ─── FORMULAS ────────────────────────────────────────────────────────────────
export const formulaApi = {
  getAll: (params?: Record<string, string | number>) =>
    apiClient('/formulas', { requiresAuth: false, params }),
  create: (data: Record<string, unknown>) =>
    apiClient('/formulas', { method: 'POST', data }),
  update: (formulaId: string, data: Record<string, unknown>) =>
    apiClient(`/formulas/${formulaId}`, { method: 'PUT', data }),
  delete: (formulaId: string) =>
    apiClient(`/formulas/${formulaId}`, { method: 'DELETE' }),
};

// ─── DPP (Daily Practice Problems) ───────────────────────────────────────────
export const dppApi = {
  getAll: (params?: Record<string, string | number>) =>
    apiClient('/dpp', { params }),
  create: (data: Record<string, unknown>) =>
    apiClient('/dpp', { method: 'POST', data }),
  update: (dppId: string, data: Record<string, unknown>) =>
    apiClient(`/dpp/${dppId}`, { method: 'PUT', data }),
  delete: (dppId: string) =>
    apiClient(`/dpp/${dppId}`, { method: 'DELETE' }),
};

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
export const countdownApi = {
  get: () => apiClient('/countdown', { requiresAuth: false }),
  set: (data: { title: string; targetDate: string; isActive: boolean }) =>
    apiClient('/countdown', { method: 'POST', data }),
};
