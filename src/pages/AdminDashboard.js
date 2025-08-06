import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaTachometerAlt, FaNewspaper, FaImages, FaUsers, FaFilePdf } from 'react-icons/fa';

// page components
import AdminLogin from './AdminLogin';
import AdminSidebar from '../components/AdminSidebar';
import ManageNews from './ManageNews';
import AdminGallery from './AdminGallery';
import AdminOrganisation from './AdminOrganisation';
import ManageDocuments from './ManageDocuments';

// The main dashboard content with the cards
const DashboardContent = () => {
    const adminSections = [
        { title: 'Manage News', link: '/admin/news', icon: <FaNewspaper className="text-4xl" /> },
        { title: 'Manage Gallery', link: '/admin/gallery', icon: <FaImages className="text-4xl" /> },
        { title: 'Manage Organisation', link: '/admin/organisation', icon: <FaUsers className="text-4xl" /> },
        { title: 'Manage Documents', link: '/admin/documents', icon: <FaFilePdf className="text-4xl" /> },
    ];
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin!</h1>
            <p className="text-gray-600 mb-8">Select a section to manage your website's content.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {adminSections.map((section) => (
                    <Link key={section.title} to={section.link} className="block bg-gray-50 rounded-lg p-6 text-center text-apsmc-primary hover:shadow-xl hover:-translate-y-1 transform transition">
                        <div className="flex justify-center items-center h-16 w-16 mx-auto rounded-full mb-4">{section.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};


// This component wraps the entire admin section
function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);

    // show login page if not authenticated
    if (!isAuthenticated) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    // otherwise, show the main admin layout
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar onLogout={handleLogout} />
            <main className="flex-grow p-8">
                <Routes>
                    <Route path="/" element={<DashboardContent />} />
                    <Route path="/news" element={<ManageNews />} />
                    <Route path="/gallery" element={<AdminGallery />} />
                    <Route path="/organisation" element={<AdminOrganisation />} />
                    <Route path="/documents" element={<ManageDocuments />} />
                </Routes>
            </main>
        </div>
    );
}

export default AdminDashboard;