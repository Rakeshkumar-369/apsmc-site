import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaTimes } from 'react-icons/fa';

function AdminOrganisation() {
  // --- NEW: State for members, modal, form, and submissions ---
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const API_BASE_URL = 'http://10.0.0.195:5000';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- NEW: Function to fetch members ---
  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/members`);
      if (!response.ok) throw new Error('Failed to fetch members.');
      const data = await response.json();
      setMembers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // --- NEW: Functions to control the Add/Edit modal ---
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentMember(null);
    setName('');
    setRole('');
    setImage(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setIsEditing(true);
    setCurrentMember(member);
    setName(member.name);
    setRole(member.role);
    setImage(null);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  
  // --- NEW: Function to handle both Add and Edit form submissions ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    if (image) formData.append('image', image);
  
    if (isEditing) {
      formData.append('action', 'edit');
      formData.append('id', currentMember.id);
    } else {
      formData.append('action', 'add');
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save member.');
      closeModal();
      fetchMembers();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW: Function to handle deleting a member ---
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        body: new URLSearchParams({ action: 'delete', id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete member.');
      fetchMembers();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const getImageUrl = (imagePath) => imagePath ? `${API_BASE_URL}/uploads/images/${imagePath}` : '/images/aictc.png';

  // --- Your original, unchanged JSX layout, now using the new logic ---
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Organisation</h1>
          <button onClick={openAddModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
            <FaPlus className="mr-2" /> Add Member
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Commission Members</h2>
          {isLoading ? <p>Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => (
                <div key={member.id} className="border rounded-lg shadow-sm">
                  <img src={getImageUrl(member.image)} alt={member.name} className="w-full h-48 object-cover rounded-t-lg bg-gray-200" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-gray-600 capitalize">{member.role}</p>
                  </div>
                  <div className="flex justify-end p-2 bg-gray-50 border-t rounded-b-lg">
                    <button onClick={() => openEditModal(member)} className="text-blue-600 hover:text-blue-900 p-2" title="Edit"><FaEdit /></button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900 p-2" title="Delete"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* NEW: Modal for adding/editing members. It appears on top and doesn't change the page layout. */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Member' : 'Add New Member'}</h2>
              <button onClick={closeModal}><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block mb-1">Role</label>
                <input type="text" id="role" value={role} onChange={e => setRole(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block mb-1">Image {isEditing && '(Leave blank to keep existing)'}</label>
                <input type="file" id="image" onChange={e => setImage(e.target.files[0])} accept="image/*" className="w-full"/>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className="px-4 py-2 mr-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center">
                  {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
                  {isEditing ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminOrganisation;