import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  // Toggle function for the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#4682B4] via-blue-700 to-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Site logo */}
        <h1 className="text-2xl font-semibold tracking-wide text-white">APSMC</h1>

        {/* Hamburger menu icon for mobile */}
        <div className="md:hidden"> {/* Only visible on medium screens and below */}
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                // Close icon (X)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links and Language Selector */}
        {/* Use flex-grow for the ul to push the language selector to the right on larger screens */}
        <div className="hidden md:flex flex-grow items-center justify-end"> {/* Changed for better alignment */}
          <ul className="flex gap-10 text-lg font-medium mr-10"> {/* Added mr-10 for spacing between nav links and dropdown */}
            {[
              { name: "Home", path: "/" },
              { name: "Organisation", path: "/organisation" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                      : "hover:text-blue-200 transition duration-300"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Language selection dropdown for desktop */}
          <select
            className="bg-white text-blue-900 border border-blue-300 rounded px-2 py-1 text-sm"
            defaultValue="en"
            onChange={(e) =>
              alert(`Language switch to: ${e.target.value} (feature coming soon)`)
            }
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden bg-blue-800 absolute w-full transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 text-white text-lg">
          {[
            { name: "Home", path: "/" },
            { name: "Organisation", path: "/organisation" },
            { name: "Contact Us", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)} // Close menu on link click
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                    : "hover:text-blue-200 transition duration-300"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {/* Mobile-only language selector */}
          <li className="mt-4">
            <select
              className="bg-white text-blue-900 border border-blue-300 rounded px-2 py-1 text-sm"
              defaultValue="en"
              onChange={(e) =>
                alert(`Language switch to: ${e.target.value} (feature coming soon)`)
              }
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;