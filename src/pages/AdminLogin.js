import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignInAlt, FaSpinner } from 'react-icons/fa';

// --- Your original component structure ---
function AdminLogin() {
  // --- NEW: State for form inputs, submission status, and errors ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- NEW: Hooks for authentication context and navigation ---
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- NEW: Effect to redirect if already logged in ---
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // --- NEW: Handler to submit login credentials to the API ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // API requires urlencoded data for login 
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check credentials.');
      }

      if (data.token) {
        login(data.token); // Save token to context/localStorage
        navigate('/admin/dashboard'); // Redirect on success
      } else {
        throw new Error('Login response did not include a token.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Your original, unchanged JSX layout, now wired to the new logic ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-apsmc-primary">
            Admin Login
          </h2>
          <p className="text-gray-500 mt-2">Access the dashboard</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username" name="username" type="text" required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apsmc-primary focus:border-apsmc-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password" name="password" type="password" required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apsmc-primary focus:border-apsmc-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* NEW: Display login error message if one occurs */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-apsmc-primary hover:bg-apsmc-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apsmc-primary disabled:bg-gray-400"
            >
              {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaSignInAlt className="mr-2" />}
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;