import React, { useState } from 'react';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

// This is the main gatekeeper for the /admin route.
// It checks if the user is logged in and shows the correct page.
function AdminLayout() {
  // Simple auth state for now.
  // For a real app, this should probably use Context and check localStorage for a token.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // TODO: set user token in localStorage here
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // TODO: clear user token from localStorage
  };

  // If they're logged in, show the main dashboard. Otherwise, the login page.
  if (isAuthenticated) {
    // AdminDashboard will handle all the inner routes (news, gallery, etc.)
    return <AdminDashboard onLogout={handleLogout} />;
  } else {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }
}

export default AdminLayout;