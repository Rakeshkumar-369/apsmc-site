// src/pages/ActsRules.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ActsRules() {
  const navigate = useNavigate();

  // Define the list of PDFs for Acts & Rules
  // These are the actual PDF filenames from your public/pdfs folder
  const actsAndRulesPdfs = [
    { title: "Andhra Pradesh Minorities Act, 1994", filename: "acts-1994.pdf" },
    { title: "Andhra Pradesh Minorities Rules, 2000", filename: "rules-2000.pdf" },
    { title: "Latest Amendments (2023)", filename: "amendments-2023.pdf" },
    { title: "Official Circular on New Act", filename: "new-act-circular.pdf" }
  ];

  // Function to handle viewing a specific PDF
  const handleViewPdf = (pdfFileName) => {
    // Construct the path to the PDF in the public/pdfs folder
    const pdfPath = `/pdfs/${pdfFileName}`;
    // Navigate to the /view-pdf route, passing the PDF URL in state
    navigate('/view-pdf', { state: { pdf: pdfPath } });
  };

  return (
    <div className="bg-apsmc-light py-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-8 text-center">
          Acts & Rules
        </h2>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Here you can find all relevant Acts, Rules, and amendments governing minority welfare in Andhra Pradesh.
        </p>

        <div className="space-y-6">
          {actsAndRulesPdfs.map((pdf, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center transition hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-semibold text-apsmc-primary mb-3 md:mb-0 md:text-left">
                {pdf.title}
              </h3>
              <div className="flex space-x-4 mt-3 md:mt-0">
                <button
                  onClick={() => handleViewPdf(pdf.filename)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View PDF
                </button>
                {/* Optional: Add a direct download link if preferred, similar to the viewer's download logic */}
                <a
                  href={`/pdfs/${pdf.filename}`} // Direct link to PDF
                  download // Triggers download
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActsRules;