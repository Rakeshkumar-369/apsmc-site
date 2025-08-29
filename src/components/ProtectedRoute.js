import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the admin login page.
    // The 'replace' prop prevents the user from using the browser's 'back' button
    // to return to the protected page after being redirected.
    return <Navigate to="/admin" replace />;
  }

  // If the user is authenticated, render the page they were trying to access.
  return children;
}

export default ProtectedRoute;