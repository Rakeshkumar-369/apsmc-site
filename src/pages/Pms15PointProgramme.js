// src/pages/Pms15PointProgramme.js
import React from 'react';

function Pms15PointProgramme() {
  // This is a placeholder page for the "PM's 15 Point Programme".
  // You can expand this content later with specific details, PDFs, etc.
  const programDetails = [
    "Enhancing opportunities for education.",
    "Equitable share in economic activities.",
    "Improving the conditions of living of minorities.",
    "Preventing and controlling communal disharmony.",
    "Schemes for skill development and employment."
  ];

  return (
    <div className="bg-apsmc-light py-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-8">
          PM's 15 Point Programme
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          This program is designed to ensure that the benefits of various government schemes
          reach the disadvantaged sections of the minority communities.
        </p>

        <div className="space-y-6 text-left">
          <h3 className="text-2xl font-semibold text-apsmc-primary mb-4">Key Focus Areas:</h3>
          <ul className="list-disc list-inside text-gray-800 text-lg space-y-2">
            {programDetails.map((point, index) => (
              <li key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* You can add more sections here, e.g., for downloadable PDFs or external links */}
        <div className="mt-12">
          <p className="text-gray-700">
            Detailed guidelines and reports will be made available here soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pms15PointProgramme;