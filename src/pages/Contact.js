import React, { useState } from 'react'; // Import useState for form handling

function Contact() {
  // State to hold form data, including the new phone and file fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // New phone state
    message: '',
    attachedFile: null, // New file state
  });
  const [fileError, setFileError] = useState(''); // State for file validation error

  // Generic handler for text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type === 'application/pdf') {
        setFormData((prevData) => ({
          ...prevData,
          attachedFile: file,
        }));
        setFileError(''); // Clear any previous error
      } else {
        setFileError('Only PDF files are allowed.');
        setFormData((prevData) => ({
          ...prevData,
          attachedFile: null, // Clear selected file if it's not a PDF
        }));
        e.target.value = ''; // Clear the input field in the UI
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        attachedFile: null,
      }));
      setFileError('');
    }
  };

  // Handler for form submission (for demonstration, just logs data)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileError) {
      alert(fileError);
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you for your submission! (Submission functionality not yet implemented)');
    // Here you would typically send formData to your backend API
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    // Main page container with the theme's soft background
    <div className="bg-apsmc-light py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Section displaying contact details and the office location map */}
        <div data-aos="fade-right">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-6 text-center md:text-left">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4 text-center md:text-left">
              Feel free to reach out to us for queries, suggestions or official communications.
            </p>
            <ul className="text-gray-800 text-sm space-y-2 text-center md:text-left">
              <li><strong>Address:</strong> Secretariat Building, Amaravati</li>
              <li><strong>Email:</strong> info@apsmc.ap.gov.in</li>
              <li><strong>Phone:</strong> +91-12345-67890</li>
            </ul>
          </div>

          {/* Embedded Google Map for our office location */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-apsmc-primary mb-6 text-center md:text-left">Our Location</h3>
            <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15302.269412532402!2d80.52553120000001!3d16.50294195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7536a0f6b4b1%3A0xc4f4b1e1d0c4f4b1!2sAndhra%20Pradesh%20Secretariat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Andhra Pradesh Secretariat Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Form for feedback and grievance submission */}
        <div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-6 text-center md:text-left">Feedback & Grievance Redressal</h2>
          <p className="text-gray-700 mb-10 text-lg text-center md:text-left">
            Your voice matters. Share your suggestions or file a grievance with the APSMC.
          </p>
          <form className="space-y-6 text-left" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* NEW: Phone Number Input */}
            <input
              type="tel" // Use type="tel" for phone numbers
              name="phone"
              placeholder="Your Phone Number"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message / Grievance"
              rows="5"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {/* NEW: File Input for PDF only */}
            <div>
              <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">
                Attach Document (PDF only):
              </label>
              <input
                id="file-upload"
                type="file"
                name="attachedFile"
                accept="application/pdf" // Restrict to PDF files
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-apsmc-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-apsmc-primary hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
              {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
              {formData.attachedFile && !fileError && (
                <p className="text-sm text-gray-600 mt-1">Selected file: {formData.attachedFile.name}</p>
              )}
            </div>
            <button type="submit" className="bg-apsmc-primary text-white px-6 py-3 rounded hover:bg-green-700 transition">Submit</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;