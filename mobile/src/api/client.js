import axios from 'axios';

// Point this at your FastAPI backend. On a physical device use your LAN IP.
export const BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

let accessToken = null;
export const setAccessToken = (t) => { accessToken = t; };

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // TODO: on 401, call POST /auth/refresh and retry once
    return Promise.reject(error);
  }
);

/* ── Endpoint helpers (Sprints 1–3) ──────────────── */
export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/users/me'),
  updateMe: (payload) => api.patch('/users/me', payload),
};

export const therapistApi = {
  list: (params) => api.get('/therapists', { params }),
  detail: (id) => api.get(`/therapists/${id}`),
  availability: (id) => api.get(`/therapists/${id}/availability`),
};

export const appointmentApi = {
  book: (payload) => api.post('/appointments', payload),
  reschedule: (id, payload) => api.patch(`/appointments/${id}/reschedule`, payload),
  cancel: (id) => api.patch(`/appointments/${id}/cancel`),
  list: (params) => api.get('/appointments', { params }),
  review: (id, payload) => api.post(`/appointments/${id}/review`, payload),
};

export const sessionApi = {
  start: (appointmentId) => api.post(`/sessions/${appointmentId}/start`),
  join: (id) => api.post(`/sessions/${id}/join`),
  end: (id) => api.post(`/sessions/${id}/end`),
};

export default api;
