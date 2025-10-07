function resolveApiBase() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && String(envUrl).trim()) return String(envUrl);
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  return 'http://localhost:4000';
}

const API_BASE = resolveApiBase();

export function api(path, options = {}) {
  return fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
  });
}

// House ID to name mapping
const HOUSE_NAMES = {
  '68e14603e95fcf80200e6c4a': 'PHOENIX',
  '68e14604e95fcf80200e6c4b': 'TUSKER',
  '68e14604e95fcf80200e6c4c': 'LEO',
  '68e14604e95fcf80200e6c4d': 'KONG'
};

/**
 * Award points to a house in the leaderboard
 * @param {string} houseId - The ID of the house to award points to
 * @param {string} houseName - The name of the house to award points to
 * @param {number} points - Number of points to award (can be negative)
 * @param {string} reason - Reason for awarding points
 * @param {string} eventId - Optional event ID associated with the points
 * @returns {Promise<Response>}
 */
export async function awardPoints(houseId, houseName, points, reason, eventId = null) {
  try {
    // Ensure all required fields are included and properly formatted
    const requestBody = {
      house: houseName.trim(),  // Changed from houseId to house (name)
      points: Number(points),
      reason: reason.trim(),
      category: 'general',
      ...(eventId && { eventId: eventId.trim() })
    };
    
    // Validate required fields
    if (!requestBody.house || isNaN(requestBody.points) || !requestBody.reason) {
      throw new Error('Missing required fields: house name, points, and reason are required');
    }
    
    console.log('Sending request to /api/leaderboard/award with:', requestBody);
    
    const response = await api('/api/leaderboard/award', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to award points');
    }

    return await response.json();
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error;
  }
}

export { API_BASE };
