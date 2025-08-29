import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import About from './pages/About';
import Organisation from './pages/Organisation';
import ActsRules from './pages/ActsRules';
import Pms15PointProgramme from './pages/Pms15PointProgramme';
import PopulationData from './pages/PopulationData';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import CircularsOrders from './pages/CircularsOrders';
import Tenders from './pages/Tenders';
import Budget from './pages/Budget';
import Services from './pages/Services';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageNews from './pages/ManageNews';
import ManageDocuments from './pages/ManageDocuments';
import AdminOrganisation from './pages/AdminOrganisation';
import AdminGallery from './pages/AdminGallery';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // --- NEW: Import the ProtectedRoute ---

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* --- Your original public routes are unchanged --- */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/organisation" element={<Organisation />} />
            <Route path="/acts-rules" element={<ActsRules />} />
            <Route path="/pms-15-point-programme" element={<Pms15PointProgramme />} />
            <Route path="/population-data" element={<PopulationData />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/circulars-orders" element={<CircularsOrders />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/services" element={<Services />} />
            
            {/* The Admin Login page is public */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* --- MODIFIED: Wrap each admin page with the ProtectedRoute component --- */}
            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
            />
            <Route
              path="/admin/manage-news"
              element={<ProtectedRoute><ManageNews /></ProtectedRoute>}
            />
            <Route
              path="/admin/manage-documents"
              element={<ProtectedRoute><ManageDocuments /></ProtectedRoute>}
            />
            <Route
              path="/admin/manage-organisation"
              element={<ProtectedRoute><AdminOrganisation /></ProtectedRoute>}
            />
            <Route
              path="/admin/manage-gallery"
              element={<ProtectedRoute><AdminGallery /></ProtectedRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;