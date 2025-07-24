// src/pages/AdministrationStructure.js
import React from 'react';

function AdministrationStructure() {
  return (
    <div className="bg-apsmc-light py-20 px-6 min-h-screen"> {/* Using the new soft white background */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-12"> {/* Using the new turquoise for heading */}
          Our Administration Structure
        </h2>
        <img
          src="https://via.placeholder.com/800x600?text=Your+Administration+Structure+Image+Here" // IMPORTANT: REPLACE THIS LINK!
          alt="Organization Administration Structure"
          className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200"
        />
        <p className="mt-8 text-gray-700 max-w-2xl mx-auto">
          This image illustrates the complete administrative hierarchy of our organization, outlining roles and reporting lines.
        </p>
      </div>
    </div>
  );
}

export default AdministrationStructure;