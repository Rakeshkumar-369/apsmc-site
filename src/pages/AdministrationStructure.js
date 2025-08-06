import React, { useState, useEffect } from 'react';

function AdministrationStructure() {
    // State for holding URL
    // default = placeholder
    const [structureImage, setStructureImage] = useState('https://via.placeholder.com/1200x800?text=Administration+Structure');

    // ---useEffect - loads image from Local store
    useEffect(() => {
        const savedImage = localStorage.getItem('adminStructureImage');
        if (savedImage) {
            setStructureImage(savedImage);
        }
    }, []); // The empty array ensures this runs only once.

    return (
        <div className="bg-apsmc-light py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-12" data-aos="fade-down">
                    Administration Structure
                </h2>
                <div className="bg-white p-4 rounded-lg shadow-xl" data-aos="fade-up">
                    <img
                        src={structureImage}
                        alt="Administration Structure of Andhra Pradesh State Minorities Commission"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdministrationStructure;