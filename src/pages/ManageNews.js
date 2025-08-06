import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

// placeholder data, will be replaced by API call
const initialNewsItems = [
  { id: 1, title: 'New scholarship schemes announced', content: 'Details about the new schemes for the upcoming academic year.' },
  { id: 2, title: 'State-wide meeting on minority welfare', content: 'The commission will hold a meeting to discuss welfare programs.' },
];

function ManageNews() {
  const [newsItems, setNewsItems] = useState(initialNewsItems);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState('');

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      setError('Both title and content are required.');
      return;
    }

    const newAnnouncement = {
      id: Date.now(), // temp unique ID
      title: newTitle,
      content: newContent,
    };

    // adds the new item to the top of the list
    setNewsItems([newAnnouncement, ...newsItems]);

    // clear form
    setNewTitle('');
    setNewContent('');
    setError('');
    alert(`(Frontend) Successfully added: "${newTitle}"`);
  };

  const handleDeleteNews = (idToDelete) => {
    setNewsItems(newsItems.filter(item => item.id !== idToDelete));
    alert(`(Frontend) Successfully deleted item ID: ${idToDelete}`);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage News & Updates</h2>

      {/* Form to add news */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Announcement</h3>
        <form onSubmit={handleAddNews}>
          <div className="mb-4">
            <label htmlFor="newsTitle" className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              id="newsTitle"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-apsmc-primary"
              placeholder="Enter the news title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newsContent" className="block text-gray-700 font-medium mb-1">Content</label>
            <textarea
              id="newsContent"
              rows="3"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-apsmc-primary"
              placeholder="Enter the news content or a link"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="flex items-center bg-apsmc-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <FaPlus className="mr-2" />
            Add Announcement
          </button>
        </form>
      </div>

      {/* List of existing news */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Announcements</h3>
        <div className="space-y-4">
          {newsItems.length > 0 ? (
            newsItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteNews(item.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Delete ${item.title}`}
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No news items to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageNews;