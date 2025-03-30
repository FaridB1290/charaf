import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';

const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ name: '', image: null });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchAlbums();
  }, [navigate]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      console.log('Fetching albums...');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums`);
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      console.log('Received albums:', data);
      
      if (Array.isArray(data)) {
        setAlbums(data);
      } else {
        console.error('Invalid data format:', data);
        setError('Invalid data format received from server');
        setAlbums([]);
      }
    } catch (err) {
      console.error('Error fetching albums:', err);
      setError(err.message || 'Failed to fetch albums');
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAlbum({ ...newAlbum, image: file });
      // Créer une URL pour la prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newAlbum.name.trim()) {
        setError('Album name is required');
        return;
      }

      const formData = new FormData();
      formData.append('name', newAlbum.name.trim());
      if (newAlbum.image) {
        formData.append('image', newAlbum.image);
      }

      console.log('Submitting album:', {
        name: newAlbum.name.trim(),
        hasImage: !!newAlbum.image
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setNewAlbum({ name: '', image: null });
        setPreviewUrl('');
        fetchAlbums();
      } else {
        const errorData = await response.json();
        console.error('Error creating album:', errorData);
        setError(errorData.message || 'Failed to create album');
      }
    } catch (err) {
      console.error('Error creating album:', err);
      setError('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          fetchAlbums();
        } else {
          setError('Failed to delete album');
        }
      } catch (err) {
        setError('An error occurred');
      }
    }
  };

  const handleEdit = (album) => {
    setEditingAlbum({
      id: album.id,
      name: album.name,
      image: null
    });
    setEditPreviewUrl(`${process.env.REACT_APP_API_URL}${album.image}`);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingAlbum({ ...editingAlbum, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editingAlbum.name.trim());
      if (editingAlbum.image) {
        formData.append('image', editingAlbum.image);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums/${editingAlbum.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setEditingAlbum(null);
        setEditPreviewUrl('');
        fetchAlbums();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update album');
      }
    } catch (err) {
      setError('An error occurred while updating');
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Albums</h1>

        {/* Create Album Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Album</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newAlbum.name}
                onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="Enter album name"
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
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Album
            </button>
          </form>
        </div>

        {error && (
          <div className="text-red-600 text-center mb-8">{error}</div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : albums.length === 0 ? (
          <div className="text-gray-600 text-center">No albums available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div key={album.id} className="bg-white shadow rounded-lg overflow-hidden">
                {editingAlbum?.id === album.id ? (
                  // Formulaire de modification
                  <form onSubmit={handleUpdate} className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={editingAlbum.name}
                          onChange={(e) => setEditingAlbum({ ...editingAlbum, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Image (optional)</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageChange}
                          className="mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                        {editPreviewUrl && (
                          <div className="mt-2">
                            <img
                              src={editPreviewUrl}
                              alt="Preview"
                              className="h-32 w-32 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAlbum(null);
                            setEditPreviewUrl('');
                          }}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  // Affichage normal
                  <>
                    <img 
                      src={`${process.env.REACT_APP_API_URL}${album.image}`} 
                      alt={album.name} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        console.error('Error loading image:', album.image);
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{album.name}</h3>
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => handleEdit(album)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => navigate(`/admin/albums/${album.id}/images`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Manage Images
                        </button>
                        <button
                          onClick={() => handleDelete(album.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Albums; 