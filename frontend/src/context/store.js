import { create } from 'zustand';

const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false };
  }

  const token = window.localStorage.getItem('authToken');
  const user = window.localStorage.getItem('user');

  if (token && user) {
    try {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      };
    } catch {
      return { user: null, token: null, isAuthenticated: false };
    }
  }

  return { user: null, token: null, isAuthenticated: false };
};

export const useAuthStore = create((set) => ({
  ...getStoredAuth(),

  setAuth: (user, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: () => {
    const token = window.localStorage.getItem('authToken');
    const user = window.localStorage.getItem('user');
    if (token && user) {
      try {
        set({ token, user: JSON.parse(user), isAuthenticated: true });
      } catch {
        window.localStorage.removeItem('authToken');
        window.localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },
}));

export const useJobsStore = create((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,

  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setLoading: (loading) => set({ loading }),
}));

export const useDrivesStore = create((set) => ({
  drives: [],
  selectedDrive: null,
  loading: false,

  setDrives: (drives) => set({ drives }),
  setSelectedDrive: (drive) => set({ selectedDrive: drive }),
  setLoading: (loading) => set({ loading }),
}));

export const useApplicationsStore = create((set) => ({
  applications: [],
  loading: false,

  setApplications: (applications) => set({ applications }),
  setLoading: (loading) => set({ loading }),
}));
