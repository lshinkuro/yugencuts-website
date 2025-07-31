import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X } from 'lucide-react';

type Photo = {
  id: number;
  name: string;
  image_path: string;
  category: string;
  created_at: string;
};

const CATEGORIES = ['All', 'Haircut', 'Beard', 'Styling'];

const AdminGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [newPhoto, setNewPhoto] = useState({
    name: '',
    category: 'Haircut', // Default category
    image_path: '',
  });

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('potolist_table')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching photos:', error);
    } else {
      setPhotos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async () => {
    if (!newPhoto.image_path) {
      alert('Please enter image path');
      return;
    }

    // Create database entry
    const { error: dbError } = await supabase
      .from('potolist_table')
      .insert([
        {
          name: newPhoto.name,
          category: newPhoto.category,
          image_path: newPhoto.image_path,
        },
      ]);

    if (dbError) {
      console.error('Error creating photo entry:', dbError);
      return;
    }

    // Reset form and refresh list
    setNewPhoto({
      name: '',
      category: 'Haircut',
      image_path: '',
    });
    fetchPhotos();
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this photo?');
    if (!confirm) return;

    const { error } = await supabase
      .from('potolist_table')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
    } else {
      fetchPhotos();
    }
  };

  const openEditModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setEditName(photo.name);
    setEditCategory(photo.category);
  };

  const handleUpdate = async () => {
    if (!selectedPhoto) return;

    const { error } = await supabase
      .from('potolist_table')
      .update({
        name: editName,
        category: editCategory,
      })
      .eq('id', selectedPhoto.id);

    if (error) {
      console.error('Update error:', error);
    } else {
      setSelectedPhoto(null);
      fetchPhotos();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Admin: Manage Gallery</h1>
        
        {/* Add New Photo Form */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add New Photo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newPhoto.name}
                onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={newPhoto.category}
                onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                className="w-full border rounded p-2"
              >
                {CATEGORIES.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image Path</label>
              <input
                type="text"
                value={newPhoto.image_path}
                onChange={(e) => setNewPhoto({ ...newPhoto, image_path: e.target.value })}
                placeholder="Enter image URL"
                className="w-full border rounded p-2"
              />
            </div>
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add Photo
            </button>
          </div>
        </div>
      </div>

      {/* Photo List */}
      {loading ? (
        <p>Loading photos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={photo.image_path}
                alt={photo.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-semibold">{photo.name}</h3>
              <p className="text-sm text-gray-600">{photo.category}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => openEditModal(photo)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Photo</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                >
                  {CATEGORIES.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;