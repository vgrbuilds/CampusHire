import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
};

// Drives API
export const drivesAPI = {
  getAll: () => apiClient.get('/drives'),
  getById: (id) => apiClient.get(`/drives/${id}`),
  create: (data) => apiClient.post('/drives', data),
  update: (id, data) => apiClient.put(`/drives/${id}`, data),
  delete: (id) => apiClient.delete(`/drives/${id}`),
};

// Jobs API
export const jobsAPI = {
  getAll: () => apiClient.get('/jobs'),
  getById: (id) => apiClient.get(`/jobs/${id}`),
  getByDrive: (driveId) => apiClient.get(`/jobs/drive/${driveId}`),
  create: (data) => apiClient.post('/jobs', data),
  update: (id, data) => apiClient.put(`/jobs/${id}`, data),
  delete: (id) => apiClient.delete(`/jobs/${id}`),
};

// Forms API
export const formsAPI = {
  getAll: () => apiClient.get('/forms'),
  getById: (id) => apiClient.get(`/forms/${id}`),
  getByJob: (jobId) => apiClient.get(`/forms/job/${jobId}`),
  create: (data) => apiClient.post('/forms', data),
  update: (id, data) => apiClient.put(`/forms/${id}`, data),
  delete: (id) => apiClient.delete(`/forms/${id}`),
};

// Applications API
export const applicationsAPI = {
  getAll: () => apiClient.get('/applications'),
  getById: (id) => apiClient.get(`/applications/${id}`),
  getByJob: (jobId) => apiClient.get(`/applications/job/${jobId}`),
  getByStudent: (studentId) => apiClient.get(`/applications/student/${studentId}`),
  create: (data) => apiClient.post('/applications', data),
  updateStatus: (id, status) => apiClient.patch(`/applications/${id}/status`, { status }),
  delete: (id) => apiClient.delete(`/applications/${id}`),
};

// Resumes API
export const resumesAPI = {
  getAll: () => apiClient.get('/resumes'),
  getById: (id) => apiClient.get(`/resumes/${id}`),
  getByStudent: (studentId) => apiClient.get(`/resumes/student/${studentId}`),
  upload: (formData) => apiClient.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => apiClient.put(`/resumes/${id}`, data),
  delete: (id) => apiClient.delete(`/resumes/${id}`),
};

// AI API
export const aiAPI = {
  evaluateCandidate: (applicationId) => apiClient.post(`/ai/analyze/${applicationId}`),
  generateRecommendations: (data) => apiClient.post('/ai/recommendations', data),
};

export default apiClient;
