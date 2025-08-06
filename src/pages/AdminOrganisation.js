import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaUserEdit, FaSave } from 'react-icons/fa';

// placeholder data, will be replaced by API call
const initialMembers = [
    { id: 1, name: 'Dr. Iqbal Ahmed Khan', role: 'Chairman', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Mr. A. B. C. Das', role: 'Vice-Chairman', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Mrs. X. Y. Z. Reddy', role: 'Member', image: 'https://via.placeholder.com/150' }
];

function AdminOrganisation() {
    // states for the members list
    const [members, setMembers] = useState(initialMembers);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    // state for chairman details
    const [chairmanDetails, setChairmanDetails] = useState({
        name: 'Mr. A. Rahman',
        message: '“At the APSMC, our unwavering mission is to promote equity, uphold dignity, and empower minority communities across the state...”',
        image: 'https://via.placeholder.com/400x300?text=Chairman'
    });
    const [chairmanImageFile, setChairmanImageFile] = useState(null);

    // state for admin structure image
    const [adminStructureImage, setAdminStructureImage] = useState('https://via.placeholder.com/800x600?text=Admin+Structure');
    const [adminStructureFile, setAdminStructureFile] = useState(null);

    // load saved data from local storage on initial render
    useEffect(() => {
        const savedChairman = localStorage.getItem('chairmanDetails');
        if (savedChairman) {
            setChairmanDetails(JSON.parse(savedChairman));
        }
        const savedAdminStructure = localStorage.getItem('adminStructureImage');
        if (savedAdminStructure) {
            setAdminStructureImage(savedAdminStructure);
        }
    }, []); // empty array = run once

    const handleAddMember = (e) => {
        e.preventDefault();
        if (!name.trim() || !role.trim()) {
            setError('Name and Role are required.');
            return;
        }

        const newMember = {
            id: Date.now(),
            name,
            role,
            image: imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/150'
        };

        setMembers([newMember, ...members]);
        
        // clear form
        setName('');
        setRole('');
        setImageFile(null);
        document.getElementById('memberImage').value = '';
        setError('');

        alert(`(Frontend) Successfully added member: "${name}"`);
    };

    const handleDeleteMember = (idToDelete) => {
        setMembers(members.filter(member => member.id !== idToDelete));
        alert(`(Frontend) Successfully deleted member ID: ${idToDelete}`);
    };

    // chairman details handlers
    const handleChairmanChange = (e) => {
        const { name, value } = e.target;
        setChairmanDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleChairmanImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setChairmanImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setChairmanDetails(prev => ({ ...prev, image: previewUrl }));
        }
    };
    
    const handleChairmanSave = (e) => {
        e.preventDefault();
        // TODO: replace with API call
        localStorage.setItem('chairmanDetails', JSON.stringify(chairmanDetails));
        alert('(Frontend) Chairman details have been saved!');
    };
    
    // admin structure handlers
    const handleAdminStructureImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAdminStructureFile(file);
            const previewUrl = URL.createObjectURL(file);
            setAdminStructureImage(previewUrl);
        }
    };

    const handleAdminStructureSave = (e) => {
        e.preventDefault();
        // TODO: replace with API call
        localStorage.setItem('adminStructureImage', adminStructureImage);
        alert('(Frontend) Administration Structure image has been saved!');
    };

    return (
        <div className="bg-gray-100 p-8 space-y-8">
            {/* Chairman Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Manage Chairman's Details</h3>
                <form onSubmit={handleChairmanSave}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="chairmanName" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="chairmanName" value={chairmanDetails.name} onChange={handleChairmanChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            </div>
                            <div>
                                <label htmlFor="chairmanMessage" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea name="message" id="chairmanMessage" rows="4" value={chairmanDetails.message} onChange={handleChairmanChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"></textarea>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <img src={chairmanDetails.image} alt="Chairman preview" className="w-full h-40 object-cover rounded-md border mb-2" />
                            <input type="file" onChange={handleChairmanImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 flex items-center bg-apsmc-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                        <FaSave className="mr-2" /> Save Chairman Details
                    </button>
                </form>
            </div>

            {/* Commission Members */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Manage Commission Members</h3>
                <form onSubmit={handleAddMember} className="mb-6 border-b pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="memberName" className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input id="memberName" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter member's name" />
                        </div>
                        <div>
                            <label htmlFor="memberRole" className="block text-gray-700 font-medium mb-1">Role / Position</label>
                            <input id="memberRole" type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Chairman, Member" />
                        </div>
                        <div>
                            <label htmlFor="memberImage" className="block text-gray-700 font-medium mb-1">Image</label>
                            <input id="memberImage" type="file" accept="image/jpeg, image/png" onChange={(e) => setImageFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="flex items-center bg-apsmc-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                        <FaPlus className="mr-2" /> Add Member
                    </button>
                </form>
                <div className="space-y-4">
                    {members.map(member => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-md">
                            <div className="flex items-center">
                                <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <h4 className="font-bold">{member.name}</h4>
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button className="text-blue-500 hover:text-blue-700" aria-label={`Edit ${member.name}`}><FaUserEdit className="w-5 h-5" /></button>
                                <button onClick={() => handleDeleteMember(member.id)} className="text-red-500 hover:text-red-700" aria-label={`Delete ${member.name}`}><FaTrash className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Administration Structure */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Manage Administration Structure Image</h3>
                <form onSubmit={handleAdminStructureSave}>
                    <label className="block text-sm font-medium text-gray-700">Image Preview</label>
                    <img src={adminStructureImage} alt="Admin structure preview" className="w-full h-auto max-h-96 object-contain rounded-md border mb-4 p-2"/>
                    <label htmlFor="adminStructureFile" className="block text-sm font-medium text-gray-700">Upload New Image</label>
                    <input type="file" id="adminStructureFile" onChange={handleAdminStructureImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    <button type="submit" className="mt-4 flex items-center bg-apsmc-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                        <FaSave className="mr-2" /> Save Structure Image
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminOrganisation;