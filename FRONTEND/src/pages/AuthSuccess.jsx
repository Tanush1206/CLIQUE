import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      // Fetch user data
      fetch('http://localhost:4000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Update useAuth context immediately
            setUser(data.user);
            
            // Redirect to home page after successful login
            navigate('/home');
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .catch((error) => {
          console.error('Auth error:', error);
          localStorage.removeItem('authToken');
          navigate('/login');
        });
    } else {
      // No token found, redirect to login
      navigate('/login');
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-white text-xl">Completing login...</p>
      </div>
    </div>
  );
}
