// API Configuration
export const API_BASE_URL = 'http://localhost:4000/api';

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GOOGLE: '/auth/google',
  GOOGLE_CALLBACK: '/auth/google/callback',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
};

// API Endpoints
export const API_ENDPOINTS = {
  EVENTS: '/events',
  LEADERBOARD: '/leaderboard',
  HOUSES: '/houses',
};

// Full API URLs
export const API_URLS = {
  ...Object.fromEntries(
    Object.entries(AUTH_ENDPOINTS).map(([key, value]) => [key, `${API_BASE_URL}${value}`])
  ),
  ...Object.fromEntries(
    Object.entries(API_ENDPOINTS).map(([key, value]) => [key, `${API_BASE_URL}${value}`])
  ),
};
