import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// pages
import Home from './pages/Home';
import Organisation from './pages/Organisation';
import Contact from './pages/Contact';
import ActsRules from './pages/ActsRules';
import CircularsOrders from './pages/CircularsOrders';
import PopulationData from './pages/PopulationData';
import Tenders from './pages/Tenders';
import Budget from './pages/Budget';
import AdministrationStructure from './pages/AdministrationStructure';
import Pms15PointProgramme from './pages/Pms15PointProgramme';
import Gallery from './pages/Gallery';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';

// admin
import AdminLayout from './components/AdminLayout';

function App() {
  // init AOS library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* The admin layout will handle its own nav/footer */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/organisation" element={<Organisation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/administration-structure" element={<AdministrationStructure />} />
            <Route path="/acts-rules" element={<ActsRules />} />
            <Route path="/circulars-orders" element={<CircularsOrders />} />
            <Route path="/population" element={<PopulationData />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/pms-15-point-programme" element={<Pms15PointProgramme />} />
            <Route path="/gallery" element={<Gallery />} />

            {/* Admin Section */}
            <Route path="/admin/*" element={<AdminLayout />} />

          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;