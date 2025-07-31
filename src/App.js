import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Pages
import Home from './pages/Home';
import Organisation from './pages/Organisation';
// Removed: import Publications from './pages/Publications'; // Removed because "Reports" is gone from Navbar
import Contact from './pages/Contact';
import ActsRules from './pages/ActsRules';
import CircularsOrders from './pages/CircularsOrders';
import PopulationData from './pages/PopulationData';
import Tenders from './pages/Tenders';
// Removed: import Scholarships from './pages/Scholarships'; // No longer needed
import Budget from './pages/Budget';
import AdministrationStructure from './pages/AdministrationStructure';
import Pms15PointProgramme from './pages/Pms15PointProgramme'; // PM's 15 Point Programme Page

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
// Removed: import PdfViewer from './components/PdfViewer'; // No longer needed as PDFs open in new tab

// Import ScrollToTop component (for automatic page scroll on route change)
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
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/organisation" element={<Organisation />} />
            {/* Removed: <Route path="/publications" element={<Publications />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/administration-structure" element={<AdministrationStructure />} />

            {/* Schemes & Programs Routes */}
            <Route path="/acts-rules" element={<ActsRules />} />
            <Route path="/circulars-orders" element={<CircularsOrders />} />
            <Route path="/population" element={<PopulationData />} />
            <Route path="/tenders" element={<Tenders />} />
            {/* Removed: <Route path="/scholarships" element={<Scholarships />} /> */}
            <Route path="/budget" element={<Budget />} />
            <Route path="/pms-15-point-programme" element={<Pms15PointProgramme />} />

            {/* Removed: Route for the PDF Viewer (PDFs will now open in new tab) */}
            {/* Removed: <Route path="/view-pdf" element={<PdfViewerWrapper />} /> */}
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

// Removed: PdfViewerWrapper component is no longer needed
// import { useLocation } from 'react-router-dom';
// function PdfViewerWrapper() {
//   const location = useLocation();
//   const pdfUrl = location.state?.pdf;
//   return <PdfViewer pdfUrl={pdfUrl} />;
// }

export default App;