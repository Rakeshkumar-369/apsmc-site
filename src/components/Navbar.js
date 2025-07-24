import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    // Navigation bar with a consistent gradient theme and shadow for prominence
    <nav className="bg-gradient-to-r from-[#4682B4] via-blue-700 to-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Site logo, ensuring good contrast */}
        <h1 className="text-2xl font-semibold tracking-wide text-white">APSMC</h1>
        <ul className="flex gap-10 text-lg font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Organisation", path: "/organisation" }, // Path remains '/organisation'
            { name: "Reports", path: "/publications" },
            { name: "Contact Us", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    // Distinct styling for the active navigation link
                    ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                    // Subtle hover effect for other links
                    : "hover:text-blue-200 transition duration-300"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Language selection dropdown for site localization */}
      <div className="ml-auto px-6 pb-4">
        <select
          // Styling for the language selector for readability
          className="bg-white text-blue-900 border border-blue-300 rounded px-2 py-1 text-sm"
          defaultValue="en"
          onChange={(e) =>
            alert(`Language switch to: ${e.target.value} (feature coming soon)`)
          }
        >
          <option value="en">English</option>
          <option value="te">తెలుగు</option>
          {/* Removed Urdu and Hindi options as requested */}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;