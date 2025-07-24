import React from 'react';
import { useLocation } from 'react-router-dom';

function Publications() {
  const query = new URLSearchParams(useLocation().search);
  const section = query.get('section');

  const pdfs = {
    "Act & Rules": ["act1.pdf", "rules2.pdf"],
    "Circulars & Orders": ["circular1.pdf", "order2.pdf"],
    "Minorities Population": ["data1.pdf"],
    "Tenders": ["tender1.pdf"],
    "Scholarships": ["scholar1.pdf"],
    "Budget & Expenditure": ["budget1.pdf"]
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">{section}</h2>
      <ul className="space-y-3">
        {(pdfs[section] || []).map((file, idx) => (
          <li key={idx}>
            <a
              href={`/pdfs/${file}`}
              className="text-blue-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Publications;
