import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GridBackground from '../components/GridBackground';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };
  
  const handleGoogleLogin = () => {
    // For now, just simulate a successful Google login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'google-user@example.com');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center relative z-10 bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-800/90 backdrop-blur-sm" style={{ 
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)'
      }}>
        <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
          {/* Scaler Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/src/frontend/assets/sst.png" 
              alt="SST Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Log In to your Scaler Account
          </h1>
          
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-full font-medium mb-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          
          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-800/90 text-blue-200">or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-900/20 border-l-4 border-red-400 p-4 text-red-100 backdrop-blur-sm rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email : student@sst.scaler.com"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-blue-600/80 backdrop-blur-sm hover:bg-blue-500/80 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-[1.02] border border-blue-400/30 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'shadow-lg hover:shadow-blue-500/30'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-blue-200 italic">
            "Become 1% better every day"
          </p>
        </div>
      </div>
      
      {/* Right side - Grid */}
      <GridBackground />
    </div>
  );
}