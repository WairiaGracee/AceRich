const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    const message =
      data?.detail ??
      Object.values(data as Record<string, string[]>).flat().join(' ') ??
      'Something went wrong.';
    throw new Error(message);
  }
  return data as T;
}

// ── Types ────────────────────────────────────────────────────

export interface CourseListItem {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  image_url: string;
  description: string;
  duration: string;
  level: string;
  mode: string;
  intake: string;
}

export interface CourseDetail extends CourseListItem {
  overview: string;
  level_display: string;
  mode_display: string;
  what_you_learn: { id: number; text: string; order: number }[];
  modules: { id: number; title: string; order: number }[];
}

export interface ApplicationPayload {
  full_name: string;
  email: string;
  phone: string;
  program: string;
  qualification: string;
  institution: string;
}

export interface ContactPayload {
  full_name: string;
  email: string;
  subject: string;
  message: string;
}

// ── API calls ────────────────────────────────────────────────

export const getCourses = (categorySlug?: string) => {
  const qs = categorySlug ? `?category=${categorySlug}` : '';
  return request<CourseListItem[]>(`/courses/${qs}`);
};

export const getCourseById = (id: string | number) =>
  request<CourseDetail>(`/courses/${id}/`);

export const submitApplication = (payload: ApplicationPayload) =>
  request<{ message: string }>('/admissions/apply/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const submitContactForm = (payload: ContactPayload) =>
  request<{ message: string }>('/contact/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const subscribeNewsletter = (email: string) =>
  request<{ message: string }>('/newsletter/subscribe/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  // ── Auth ─────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  fee_balance: string | null;
  program: string | null;
  phone: string | null;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const registerUser = (payload: RegisterPayload) =>
  request<{ token: string; user: AuthUser; message: string }>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const loginUser = (email: string, password: string) =>
  request<{ token: string; user: AuthUser }>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const logoutUser = (token: string) =>
  request<{ message: string }>('/auth/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });

// ── Student portal ────────────────────────────────────────────

export const getStudentDashboard = (token: string) =>
  request<{
    full_name: string;
    email: string;
    phone: string;
    program: string;
    fee_balance: string;
    app_status: string;
    announcements: { id: number; title: string; body: string; created_at: string }[];
    fee_records: {
      id: number; description: string; amount: string;
      paid: string; balance: string; status: string;
      due_date: string | null; created_at: string;
    }[];
    module_progress: {
      id: number; module: number; module_title: string;
      module_order: number; completed: boolean; completed_at: string | null;
    }[];
  }>('/student/dashboard/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });

export const toggleModuleProgress = (moduleId: number, token: string) =>
  request<{ id: number; module: number; completed: boolean; completed_at: string | null }>(
    '/student/progress/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ module_id: moduleId }),
    }
  );

// ── Admin panel ───────────────────────────────────────────────

export const getAdminStats = (token: string) =>
  request<{
    total_applications: number;
    pending_applications: number;
    accepted_applications: number;
    total_students: number;
    total_messages: number;
    unread_messages: number;
    total_subscribers: number;
  }>('/admin-panel/stats/', {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

export const getAdminApplications = (token: string, status?: string) => {
  const qs = status ? `?status=${status}` : '';
  return request<{
    id: number; full_name: string; email: string; phone: string;
    program: string; qualification: string; institution: string;
    status: string; notes: string; created_at: string;
  }[]>(`/admin-panel/applications/${qs}`, {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });
};

export const updateApplicationStatus = (id: number, status: string, notes: string, token: string) =>
  request<{ id: number; status: string }>(`/admin-panel/applications/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    body: JSON.stringify({ status, notes }),
  });

export const getAdminStudents = (token: string) =>
  request<{
    id: number; full_name: string; email: string;
    phone: string; program: string; fee_balance: string;
  }[]>('/admin-panel/students/', {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

export const updateStudentFee = (id: number, fee_balance: string, token: string) =>
  request<{ message: string; fee_balance: string }>(`/admin-panel/students/${id}/fees/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    body: JSON.stringify({ fee_balance }),
  });

export const getAdminMessages = (token: string) =>
  request<{
    id: number; full_name: string; email: string;
    subject: string; message: string; is_read: boolean; created_at: string;
  }[]>('/admin-panel/messages/', {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

export const markMessageRead = (id: number, token: string) =>
  request<{ message: string }>(`/admin-panel/messages/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

export const getAnnouncements = (token: string) =>
  request<{ id: number; title: string; body: string; is_active: boolean; created_at: string }[]>(
    '/admin-panel/announcements/',
    { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` } }
  );

export const createAnnouncement = (title: string, body: string, token: string) =>
  request<{ id: number; title: string; body: string }>('/admin-panel/announcements/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    body: JSON.stringify({ title, body, is_active: true }),
  });

export const deleteAnnouncement = (id: number, token: string) =>
  request<{ message: string }>(`/admin-panel/announcements/${id}/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });