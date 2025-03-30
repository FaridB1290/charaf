import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="/hero-image.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Welcome to Charaf Lahib's Portfolio
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-8">
                Capturing moments, telling stories through the lens
              </p>
              <div className="space-x-4">
                <Link
                  to="/projects"
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured Item 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/featured1.jpg"
                  alt="Featured work 1"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Red Poppies</h3>
                  <p className="text-gray-600">A personal exploration of childhood memories in rural Morocco.</p>
                </div>
              </div>

              {/* Featured Item 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/featured2.jpg"
                  alt="Featured work 2"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hawafir</h3>
                  <p className="text-gray-600">Documentary photography capturing the spirit of Moroccan Tbourida.</p>
                </div>
              </div>

              {/* Featured Item 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/featured3.jpg"
                  alt="Featured work 3"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Amazigh Weddings</h3>
                  <p className="text-gray-600">Cultural documentation of traditional wedding customs in southeastern Morocco.</p>
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

export default Home; 