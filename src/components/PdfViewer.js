// src/components/PdfViewer.js
import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker source to ensure it can load PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Loading document...");
  const pdfWrapperRef = useRef(null); // Ref for the main container that holds PDF and buttons

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoadingError(false);
    setLoadingStatus(null);
  }

  function onDocumentLoadError(error) {
    console.error('Error loading PDF:', error);
    setLoadingError(true);
    setLoadingStatus("Failed to load PDF.");
    setNumPages(null);
  }

  // Handle PDF download
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle Fullscreen Toggle
  const toggleFullScreen = () => {
    if (pdfWrapperRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        pdfWrapperRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          alert('Full-screen mode not supported by your browser or blocked. Please try another browser or check settings.');
        });
      }
    }
  };

  if (!pdfUrl) {
    return (
      <div className="flex justify-center items-center py-20 bg-apsmc-light text-apsmc-primary">
        <p>No PDF URL provided. Please select a document from Schemes & Programs.</p>
      </div>
    );
  }

  const pages = Array.from(new Array(numPages), (el, index) => index + 1);

  return (
    <div className="py-8 bg-apsmc-light min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-apsmc-primary mb-4">Document Viewer</h2>

      {loadingStatus && (
        <p className={`text-gray-700 mb-4 ${loadingError ? 'text-red-600' : ''}`}>
          {loadingStatus}
        </p>
      )}
      {!loadingError && numPages && (
         <p className="text-gray-700 mb-4">Total Pages: {numPages}</p>
      )}

      {/* Main PDF wrapper: This is the RELATIVE container for floating buttons */}
      <div
        ref={pdfWrapperRef}
        className="relative w-full max-w-3xl border border-gray-300 shadow-lg rounded-lg bg-white"
        style={{ height: '80vh' }}
      >
        {/* Inner container for PDF content: This is the SCROLLABLE element */}
        <div className="w-full h-full overflow-y-auto">
            <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex flex-col items-center py-4"
            loading={<p className="text-gray-700 p-8 text-center">Loading PDF pages...</p>}
            error={<p className="text-red-600 p-8 text-center">Error: Failed to load document. Ensure the PDF file exists.</p>}
            noData={<p className="text-gray-700 p-8 text-center">No PDF file specified.</p>}
            >
            {pages.map(page => (
                <div key={`page_${page}`} className="mb-4 last:mb-0">
                <Page
                    pageNumber={page}
                    width={Math.min(window.innerWidth * 0.75, 700)}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                />
                </div>
            ))}
            </Document>
        </div>


        {/* Floating Download Button */}
        {numPages && !loadingError && (
          <button
            onClick={handleDownload}
            className="absolute top-4 right-20 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition z-20" // <--- CHANGED: right-20
            title="Download PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        )}

        {/* Floating Fullscreen Button */}
        {numPages && !loadingError && (
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-20"
            title={document.fullscreenElement ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {document.fullscreenElement ? (
              // Exit Fullscreen Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 115 3m14 1a9 9 0 01-5 13.784M19 14.5c0 .765-.306 1.487-.852 2.033M4 9.5c0-.765.306-1.487.852-2.033" />
              </svg>
            ) : (
              // Enter Fullscreen Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1V20m0 0h-4m4 0l-5-5" />
            </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default PdfViewer;