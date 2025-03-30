import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';

const AlbumImages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    description: '',
    link: '',
    file: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [id, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch album details
      const albumResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/albums/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!albumResponse.ok) {
        throw new Error('Failed to fetch album');
      }
      const albumData = await albumResponse.json();
      setAlbum(albumData);

      // Fetch images
      const imagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/images?albumId=${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!imagesResponse.ok) {
        throw new Error('Failed to fetch images');
      }
      const imagesData = await imagesResponse.json();
      setImages(imagesData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage({ ...newImage, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', newImage.description);
      formData.append('link', newImage.link || '');
      formData.append('image', newImage.file);
      formData.append('albumId', id);

      console.log('Submitting image with data:', {
        description: newImage.description,
        link: newImage.link,
        hasFile: !!newImage.file,
        albumId: id
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create image');
      }

      const data = await response.json();
      console.log('Image created successfully:', data);
      
      setNewImage({ description: '', link: '', file: null });
      fetchData();
    } catch (err) {
      console.error('Error creating image:', err);
      setError(err.message || 'An error occurred while creating the image');
    }
  };

  const handleDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/images/${imageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          fetchData();
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to delete image');
        }
      } catch (err) {
        console.error('Error deleting image:', err);
        setError('An error occurred while deleting the image');
      }
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">
            <p>{error}</p>
            <button
              onClick={() => navigate('/admin/albums')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Back to Albums
            </button>
          </div>
        ) : !album ? (
          <div className="text-center">
            <p>Album not found</p>
            <button
              onClick={() => navigate('/admin/albums')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Back to Albums
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Images in {album.name}</h1>
              <button
                onClick={() => navigate('/admin/albums')}
                className="text-blue-600 hover:text-blue-800"
              >
                Back to Albums
              </button>
            </div>

            {/* Create Image Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Image</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newImage.description}
                    onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
                  <input
                    type="url"
                    value={newImage.link}
                    onChange={(e) => setNewImage({ ...newImage, link: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Image
                </button>
              </form>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <img 
                    src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`} 
                    alt={image.description} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Error loading image:', image.imageUrl);
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                  <div className="p-4">
                    <p className="text-gray-700">{image.description}</p>
                    {image.link && (
                      <a
                        href={image.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 mt-2 block"
                      >
                        View Link
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="mt-4 text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumImages; 