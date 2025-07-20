import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X } from 'lucide-react';

interface BarberItem {
  barber_id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  rating: number;
  status: boolean;
}

const AdminBarberListPage = () => {
  const [barbers, setBarbers] = useState<BarberItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BarberItem | null>(null);
  const [form, setForm] = useState<Omit<BarberItem, 'barber_id'>>({
    name: '',
    role: '',
    bio: '',
    image: '',
    experience: '',
    rating: 4.9,
    status: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<null | string>(null);

  const fetchBarbers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('barberlist_table').select('*').order('name');
    if (!error && data) {
      setBarbers(data);
    } else {
      console.error('Error fetching barber list:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    const { error } = await supabase.from('barberlist_table').delete().eq('barber_id', showDeleteConfirm);
    if (!error) fetchBarbers();
    setShowDeleteConfirm(null);
  };

  const handleEdit = (item: BarberItem) => {
    setSelectedItem(item);
    setForm({
      name: item.name,
      role: item.role,
      bio: item.bio,
      image: item.image,
      experience: item.experience,
      rating: item.rating,
      status: item.status,
    });
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'rating' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (selectedItem) {
      await supabase.from('barberlist_table').update(form).eq('barber_id', selectedItem.barber_id);
    } else {
      await supabase.from('barberlist_table').insert([form]);
    }
    setSelectedItem(null);
    setShowModal(false);
    setForm({ name: '', role: '', bio: '', image: '', experience: '', rating: 4.9, status: true });
    fetchBarbers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin: Barber List Management</h1>
        <button
          onClick={() => {
            setSelectedItem(null);
            setForm({ name: '', role: '', bio: '', image: '', experience: '', rating: 4.9, status: true });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Add Barber
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Experience</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((item) => (
              <tr key={item.barber_id} className="border-t hover:bg-gray-50">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.role}</td>
                <td className="p-2">{item.experience}</td>
                <td className="p-2">{item.rating.toFixed(1)}</td>
                <td className="p-2">{item.status ? 'Active' : 'Inactive'}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => setShowDeleteConfirm(item.barber_id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-xl">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={() => setShowModal(false)}>
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedItem ? 'Edit Barber' : 'Add New Barber'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Name" value={form.name} onChange={handleFormChange} className="border p-2 rounded" />
              <input name="role" placeholder="Role" value={form.role} onChange={handleFormChange} className="border p-2 rounded" />
              <input name="experience" placeholder="Experience" value={form.experience} onChange={handleFormChange} className="border p-2 rounded" />
              <input name="rating" placeholder="Rating" type="number" step="0.1" value={form.rating} onChange={handleFormChange} className="border p-2 rounded" />
              <input name="image" placeholder="Image URL" value={form.image} onChange={handleFormChange} className="border p-2 rounded col-span-2" />
              <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleFormChange} className="border p-2 rounded col-span-2" />
              <label className="col-span-2 flex items-center space-x-2">
                <input type="checkbox" name="status" checked={form.status} onChange={handleFormChange} />
                <span>Active</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">{selectedItem ? 'Save Changes' : 'Add Barber'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this barber?</h2>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBarberListPage;
