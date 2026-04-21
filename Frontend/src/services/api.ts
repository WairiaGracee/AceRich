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