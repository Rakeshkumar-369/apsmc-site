import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // NEW: Icons for submission status

function Contact() {
  // --- This is your original form state, slightly renamed for clarity ---
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');

  // --- NEW: State to manage the API submission process ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [submitMessage, setSubmitMessage] = useState('');
  const API_BASE_URL = 'http://10.0.0.195:5000';

  // --- Your original handleChange function ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --- Your original handleFileChange, slightly modified to use the 'file' state ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // The API accepts various file types, so we can remove the PDF-only check
      // unless you specifically want to enforce it on the frontend.
      setFile(selectedFile);
      setFileError('');
    }
  };

  // --- MODIFIED: handleSubmit now sends data to the backend ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    const dataToSubmit = new FormData();
    dataToSubmit.append('name', formValues.name);
    dataToSubmit.append('email', formValues.email);
    dataToSubmit.append('phone', formValues.phone);
    dataToSubmit.append('message', formValues.message);
    if (file) {
      dataToSubmit.append('file', file);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        body: dataToSubmit,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Submission failed.');
      }
      setSubmitStatus('success');
      setSubmitMessage(result.message || 'Feedback sent successfully!');
      // Reset form
      setFormValues({ name: '', email: '', phone: '', message: '' });
      setFile(null);
      e.target.reset();
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Your original, unchanged JSX layout ---
  return (
    <div className="bg-apsmc-light py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        <div data-aos="fade-right">
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
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-apsmc-primary mb-6 text-center md:text-left">Our Location</h3>
            <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15302.269412532402!2d80.52553120000001!3d16.50294195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7536a0f6b4b1%3A0xc4f4b1e1d0c4f4b1!2sAndhra%20Pradesh%20Secretariat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Andhra Pradesh Secretariat Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold text-apsmc-primary mb-6 text-center md:text-left">Feedback & Grievance Redressal</h2>
          <p className="text-gray-700 mb-10 text-lg text-center md:text-left">
            Your voice matters. Share your suggestions or file a grievance with the APSMC.
          </p>
          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            <input
              type="text" name="name" placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formValues.name} onChange={handleChange} required
            />
            <input
              type="email" name="email" placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formValues.email} onChange={handleChange} required
            />
            <input
              type="tel" name="phone" placeholder="Your Phone Number"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formValues.phone} onChange={handleChange}
            />
            <textarea
              name="message" placeholder="Your Message / Grievance" rows="5"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-apsmc-primary"
              value={formValues.message} onChange={handleChange} required
            ></textarea>
            <div>
              <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">
                Attach Document (Optional):
              </label>
              <input
                id="file-upload" type="file" name="attachedFile"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-apsmc-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-apsmc-primary hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
              {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
              {file && !fileError && (
                <p className="text-sm text-gray-600 mt-1">Selected file: {file.name}</p>
              )}
            </div>
            <button type="submit" disabled={isSubmitting} className="bg-apsmc-primary text-white px-6 py-3 rounded hover:bg-green-700 transition disabled:bg-gray-400 flex items-center">
                {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : <FaPaperPlane className="mr-2" />}
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {/* NEW: Display success or error message after submission */}
            {submitMessage && (
              <div className={`p-4 mt-4 rounded-md text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus === 'success' ? <FaCheckCircle className="inline mr-2" /> : <FaExclamationCircle className="inline mr-2" />}
                {submitMessage}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;