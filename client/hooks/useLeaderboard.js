import { useEffect, useState } from 'react';
import { API_BASE } from '../lib/api';

// Default house data that matches the expected structure
const defaultHouses = [
  { _id: '68e14603e95fcf80200e6c4a', name: 'PHOENIX', points: 0, color: '#fb923c' },
  { _id: '68e14604e95fcf80200e6c4b', name: 'TUSKER', points: 0, color: '#9ca3af' },
  { _id: '68e14604e95fcf80200e6c4c', name: 'LEO', points: 0, color: '#f59e0b' },
  { _id: '68e14604e95fcf80200e6c4d', name: 'KONG', points: 0, color: '#6b7280' }
];

export function useLeaderboard() {
  // Initialize with default data to prevent flash of "no data"
  const [data, setData] = useState(defaultHouses);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchLeaderboard = async (signal) => {
    try {
      const response = await fetch(`${API_BASE}/api/leaderboard`, {
        credentials: 'include',
        signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const json = await response.json();
      if (json.data && json.data.length > 0) {
        setData(json.data);
      }
      setError('');
      return json.data;
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Failed to load leaderboard:', e);
        setError('Failed to load latest leaderboard data. Showing cached data.');
        throw e; // Re-throw to allow error handling in components
      }
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Expose a refresh function that can be called after updates
  const refresh = async () => {
    setIsLoading(true);
    const controller = new AbortController();
    try {
      return await fetchLeaderboard(controller.signal);
    } finally {
      // Cleanup the controller
      controller.abort();
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchLeaderboard(controller.signal);
    
    return () => controller.abort();
  }, []);

  return { 
    data, 
    loading: isLoading, 
    error,
    refresh,
    // Add a flag to indicate if we're using default data
    isUsingDefaultData: isInitialLoad && data === defaultHouses
  };
}
