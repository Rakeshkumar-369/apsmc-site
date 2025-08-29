import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { FaTachometerAlt, FaNewspaper, FaFileAlt, FaUsers, FaImage, FaSignOutAlt } from 'react-icons/fa';

function AdminSidebar() {
  const { logout, token } = useAuth(); // Get the logout function and token
  const navigate = useNavigate();
  const API_BASE_URL = 'http://10.0.0.195:5000';

  const handleLogout = async () => {
    // First, try to invalidate the token on the server
    try {
      await fetch(`${API_BASE_URL}/admin/logout`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      // Log the error but proceed with client-side logout anyway
      console.error('Failed to logout on server:', error);
    } finally {
      // Always perform client-side logout and redirect
      logout();
      navigate('/admin');
    }
  };

  const linkClasses = "flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-apsmc-blue/20 hover:text-apsmc-blue transition-colors duration-200";
  const activeLinkClasses = "bg-apsmc-blue text-white";

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-apsmc-blue">Admin Menu</h1>
      </div>
      <nav className="px-4">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </NavLink>
        <NavLink 
          to="/admin/manage-news" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FaNewspaper className="mr-3" /> News
        </NavLink>
        <NavLink 
          to="/admin/manage-documents" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FaFileAlt className="mr-3" /> Documents
        </NavLink>
        <NavLink 
          to="/admin/manage-organisation" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FaUsers className="mr-3" /> Organisation
        </NavLink>
        <NavLink 
          to="/admin/manage-gallery" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <FaImage className="mr-3" /> Gallery
        </NavLink>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className={`${linkClasses} w-full mt-6`}
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </nav>
    </div>
  );
}

export default AdminSidebar;