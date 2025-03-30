import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Assignment = () => {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (id) {
      fetchImages();
    } else {
      fetchAlbums();
    }
  }, [id]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums`);
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      console.log('Albums data:', data);
      
      if (Array.isArray(data)) {
        setAlbums(data);
      } else {
        setError('Invalid data format received from server');
        setAlbums([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch albums');
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      console.log('Fetching images for album:', id);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/images/album/${id}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to fetch images');
      }
      
      const data = await response.json();
      console.log('Images data received:', data);
      
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('Invalid data format:', data);
        setError('Invalid data format received from server');
        setImages([]);
      }
    } catch (err) {
      console.error('Error in fetchImages:', err);
      setError(err.message || 'Failed to fetch images');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 300);
  };

  const previousImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (id) {
    return (
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/assignment" className="inline-block text-gray-900 hover:text-gray-600 transition-colors mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>

        {error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : images.length === 0 ? (
          <div className="text-gray-600 text-center">No images available in this album</div>
        ) : (
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Titre */}
            <h1 className="text-6xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
              {images[currentImageIndex]?.description || 'Album Images'}
            </h1>

            {/* Container d'image */}
            <div className="relative h-[75vh] overflow-hidden -mt-4">
              {images[currentImageIndex] && (
                <img 
                  src={`${process.env.REACT_APP_API_URL}${images[currentImageIndex].imageUrl}`}
                  alt={images[currentImageIndex].description || 'Album image'} 
                  className={`w-full h-full object-contain shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-lg
                    transition-all duration-1000 ease-in-out
                    ${isTransitioning ? 
                      'opacity-0 scale-95 rotate-2 translate-x-full' : 
                      'opacity-100 scale-100 rotate-0 translate-x-0'
                    }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              )}

              {/* Boutons de navigation */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={previousImage}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 p-6 text-gray-900 hover:text-gray-600 
                      transition-all duration-300 hover:scale-110 hover:-translate-x-2"
                  >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button 
                    onClick={nextImage}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 p-6 text-gray-900 hover:text-gray-600 
                      transition-all duration-300 hover:scale-110 hover:translate-x-2"
                  >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Indicateurs */}
            {images.length > 1 && (
              <div className="flex justify-center mt-6 space-x-3">
                {images.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 rounded-full transition-all duration-700 ease-in-out transform
                      ${index === currentImageIndex ? 
                        'w-8 bg-gray-900 scale-110' : 
                        'w-2 bg-gray-300 scale-100'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Albums</h1>

      {error ? (
        <div className="text-red-600 text-center mb-8">{error}</div>
      ) : albums.length === 0 ? (
        <div className="text-gray-600 text-center">No albums available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albums.map((album, index) => (
            <Link
              key={album.id}
              to={`/assignment/${album.id}`}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{
                animationDelay: `${index * 150}ms`,
                opacity: 0,
                animation: 'fadeIn 0.6s ease-out forwards'
              }}
            >
              <img 
                src={`${process.env.REACT_APP_API_URL}${album.image}`}
                alt={album.name} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  console.log('Album image error:', album.image);
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{album.name}</h3>
                <p className="text-sm text-gray-500 relative inline-block">
                  <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gray-500 after:transition-all after:duration-500 group-hover:after:w-full">
                    Click to view images
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Assignment;