// Footer.js
import React from 'react';

function Footer() {
  return (
    // Consistent gradient background for a unified look with the Navbar
    <footer className="bg-gradient-to-r from-[#4682B4] via-blue-700 to-blue-600 text-white pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-x-12 gap-y-10">

        {/* APSMC branding and mission statement */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4">APSMC</h2>
          <p className="text-sm text-gray-200 leading-relaxed text-left">
            Andhra Pradesh State Minorities Commission is committed to protecting the rights and development of minority communities.
          </p>
        </div>

        {/* Key navigation links for quick access */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-left">
            <li><a href="/" className="hover:underline text-gray-200 hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:underline text-gray-200 hover:text-white transition">About Us</a></li>
            <li><a href="/publications" className="hover:underline text-gray-200 hover:text-white transition">Publications</a></li>
            <li><a href="/contact" className="hover:underline text-gray-200 hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Links to important external government/scheme portals */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-4">Important Links</h3>
          <ul className="space-y-2 text-sm text-left">
            <li><a href="#" className="hover:underline text-gray-200 hover:text-white transition">Official Government Portal</a></li>
            <li><a href="#" className="hover:underline text-gray-200 hover:text-white transition">Scholarship Application</a></li>
            <li><a href="#" className="hover:underline text-gray-200 hover:text-white transition">Tenders & Notices</a></li>
            <li><a href="#" className="hover:underline text-gray-200 hover:text-white transition">Legal Resources</a></li>
            <li><a href="#" className="hover:underline text-gray-200 hover:text-white transition">RTI Filing</a></li>
          </ul>
        </div>

        {/* Contact details and social media connections */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="text-sm space-y-2 mb-6 text-left">
            <li>📍 Secretariat Building, Amaravati</li>
            <li>✉️ info@apsmc.ap.gov.in</li>
            <li>📞 +91-12345-67890</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-left">
            {/* Social icons for quick access to our online presence */}
            <a href="#" className="hover:text-yellow-300 transition">🌐</a>
            <a href="#" className="hover:text-yellow-300 transition">📘</a>
            <a href="#" className="hover:text-yellow-300 transition">🐦</a>
          </div>
        </div>
      </div>

      {/* Copyright information, automatically updated */}
      <div className="mt-10 text-center text-sm text-gray-200 border-t border-blue-600 pt-6">
        © {new Date().getFullYear()} APSMC. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;