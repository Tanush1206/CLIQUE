import { useEffect, useState } from 'react';
import { API_BASE } from '../lib/api';

export function useEvents({ category, page = 1, limit = 10, featured = false }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (category) params.set('category', category);
    if (featured) params.set('featured', 'true');

    setLoading(true);
    setError('');

    fetch(`${API_BASE}/api/events?${params.toString()}`, {
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`)))
      .then((json) => setData(json.data || []))
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setError('Failed to load events');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [category, page, limit, featured]);

  return { data, loading, error };
}
