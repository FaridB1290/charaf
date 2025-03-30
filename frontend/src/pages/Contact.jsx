import React, { useState } from 'react';
import { FaEnvelope, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    subject: '',
    inquiry: ''
  });

  const images = Array.from({ length: 12 }, (_, i) => `/c${i + 1}.jpg`);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:fbouazi3@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.firstName} ${formData.surname}\nEmail: ${formData.email}\n\n${formData.inquiry}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="max-w-[2000px] mx-auto px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Contact</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulaire et Grille d'images */}
            <div className="lg:col-span-2">
              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First given name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                    required
                  />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                  required
                />
                <textarea
                  name="inquiry"
                  placeholder="Inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                  required
                />
                <div className="flex justify-center sm:justify-start">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-base font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </form>

              {/* Grille d'images */}
              <div className="mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden group">
                      <img
                        src={image}
                        alt={`Contact ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          console.error(`Error loading image: ${image}`);
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact avec liens corrigés */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Quick Contact</h2>
                <a 
                  href="mailto:charaf.lahib@gmail.com" 
                  className="text-base text-gray-700 hover:text-gray-900 mb-6 block text-center hover:underline transition-colors"
                >
                  charaf.lahib@gmail.com
                </a>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="mailto:charaf.lahib@gmail.com" 
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
                    aria-label="Email"
                  >
                    <FaEnvelope size={24} />
                  </a>
                  <a 
                    href="https://www.instagram.com/charaf.lahib/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/charaf-lahib/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a 
                    href="https://web.facebook.com/charaf.lahib" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a 
                    href="https://x.com/CharafLahib" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;