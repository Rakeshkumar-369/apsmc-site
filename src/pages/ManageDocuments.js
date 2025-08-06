import React, { useState } from 'react';
import { FaPlus, FaTrash, FaFilePdf } from 'react-icons/fa';

// placeholder data, will be replaced by API call
const initialDocuments = [
    { id: 101, title: 'Andhra Pradesh Minorities Act, 1994', category: 'Acts & Rules', filename: 'acts-1994.pdf' },
    { id: 102, title: 'Tender Notice: Construction of Skill Center', category: 'Tenders', filename: 'tender-skill-center-construction.pdf' },
    { id: 103, title: 'Annual Budget Allocation (2024-25)', category: 'Budget', filename: 'annual-budget-2024-25.pdf' }
];

// These categories should match the public-facing pages
const categories = ["Acts & Rules", "Circulars & Orders", "Population Data", "Tenders", "Budget", "PM's 15 Point Programme"];

function ManageDocuments() {
    const [documents, setDocuments] = useState(initialDocuments);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleAddDocument = (e) => {
        e.preventDefault();
        if (!title.trim() || !file) {
            setError('Title and a PDF file are required.');
            return;
        }

        const newDocument = {
            id: Date.now(), // temp unique ID
            title,
            category,
            filename: file.name
        };

        setDocuments([newDocument, ...documents]);
        
        // clear the form
        setTitle('');
        setCategory(categories[0]);
        setFile(null);
        document.getElementById('pdf-upload').value = '';
        setError('');

        alert(`(Frontend) Successfully added document: "${title}" to category: "${category}"`);
    };

    const handleDeleteDocument = (idToDelete) => {
        setDocuments(documents.filter(doc => doc.id !== idToDelete));
        alert(`(Frontend) Successfully deleted document ID: ${idToDelete}`);
    };
    
    // basic check for PDF files
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid PDF file.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Page Documents (PDFs)</h2>

            {/* Add Document Form */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
                <form onSubmit={handleAddDocument}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="docTitle" className="block text-gray-700 font-medium mb-1">Document Title</label>
                            <input
                                id="docTitle"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter the document title"
                            />
                        </div>
                        <div>
                            <label htmlFor="docCategory" className="block text-gray-700 font-medium mb-1">Category</label>
                            <select
                                id="docCategory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pdf-upload" className="block text-gray-700 font-medium mb-1">PDF File</label>
                            <input
                                id="pdf-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="flex items-center bg-apsmc-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                        <FaPlus className="mr-2" />
                        Add Document
                    </button>
                </form>
            </div>

            {/* List of existing documents */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Uploaded Documents</h3>
                <div className="space-y-4">
                    {documents.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                            <div className="flex items-center">
                                <FaFilePdf className="w-6 h-6 text-red-500 mr-4" />
                                <div>
                                    <h4 className="font-bold">{doc.title}</h4>
                                    <p className="text-sm text-gray-600">Category: {doc.category}</p>
                                </div>
                            </div>
                            <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-500 hover:text-red-700">
                                <FaTrash className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageDocuments;