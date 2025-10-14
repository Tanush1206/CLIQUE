// Authentication utility functions

const API_URL = 'http://localhost:4000/api';

/**
 * Get the stored auth token
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Get the stored user data
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Logout user
 */
export const logout = async () => {
  const token = getAuthToken();
  
  if (token) {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/';
};

/**
 * Verify token validity
 */
export const verifyToken = async () => {
  const token = getAuthToken();
  
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data.success && data.valid;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

/**
 * Fetch with authentication
 */
export const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (response.status === 401) {
    // Token expired or invalid
    logout();
    throw new Error('Authentication expired');
  }
  
  return response;
};
