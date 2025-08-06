import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaNewspaper, FaImages, FaUsers, FaFilePdf, FaSignOutAlt } from 'react-icons/fa';

// sidebar navigation links
const navLinks = [
  { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
  { name: 'News', path: '/admin/news', icon: FaNewspaper },
  { name: 'Gallery', path: '/admin/gallery', icon: FaImages },
  { name: 'Organisation', path: '/admin/organisation', icon: FaUsers },
  { name: 'Documents', path: '/admin/documents', icon: FaFilePdf },
];

function AdminSidebar({ onLogout }) {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen">
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name} className="mb-2">
              <NavLink
                to={link.path}
                // 'end' prop ensures only the dashboard link is active on the root admin page
                end={link.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200 ${
                    isActive ? 'bg-apsmc-primary' : ''
                  }`
                }
              >
                <link.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center p-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;