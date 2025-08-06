import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';

// login form for the admin panel
// onLoginSuccess is passed from the parent to update the auth state
function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock auth logic, replace with an API call
    if (username === 'admin' && password === 'admin@123') {
      setError('');
      onLoginSuccess(); // tell the parent component we're logged in
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6" data-aos="fade-in">
        <div className="flex flex-col items-center">
          <FaUserShield className="text-apsmc-primary text-5xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-gray-700 font-semibold" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-apsmc-primary focus:border-apsmc-primary transition duration-150"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-apsmc-primary focus:border-apsmc-primary transition duration-150"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-apsmc-primary text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;