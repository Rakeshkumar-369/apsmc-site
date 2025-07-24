import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Pages
import Home from './pages/Home';
import Organisation from './pages/Organisation';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import ActsRules from './pages/ActsRules';
import CircularsOrders from './pages/CircularsOrders';
import PopulationData from './pages/PopulationData';
import Tenders from './pages/Tenders';
import Scholarships from './pages/Scholarships';
import Budget from './pages/Budget';
import AdministrationStructure from './pages/AdministrationStructure';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton'; // This is your existing scroll-to-top button
import PdfViewer from './components/PdfViewer';

// <--- NEW: Import ScrollToTop component (for automatic page scroll on route change) --->
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      {/* <--- NEW: Place ScrollToTop here ---> */}
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/organisation" element={<Organisation />} />
            <Route path="/administration-structure" element={<AdministrationStructure />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />

            {/* Schemes & Programs Routes */}
            <Route path="/acts-rules" element={<ActsRules />} />
            <Route path="/circulars-orders" element={<CircularsOrders />} />
            <Route path="/population" element={<PopulationData />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/budget" element={<Budget />} />

            {/* Route for the PDF Viewer */}
            <Route path="/view-pdf" element={<PdfViewerWrapper />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

// PdfViewerWrapper component to extract URL parameter
import { useLocation } from 'react-router-dom';

function PdfViewerWrapper() {
  const location = useLocation();
  const pdfUrl = location.state?.pdf;

  return <PdfViewer pdfUrl={pdfUrl} />;
}

export default App;