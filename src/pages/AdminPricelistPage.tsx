import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X } from 'lucide-react';

interface PriceItem {
  id: number;
  Kategori: string;
  Layanan: string;
  Deskripsi: string;
  Harga: string;
  Duration: number;
}

const AdminPriceListPage = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PriceItem | null>(null);
  const [form, setForm] = useState({
    Kategori: '',
    Layanan: '',
    Deskripsi: '',
    Harga: '',
    Duration: 30,
  });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<null | number>(null);

  const fetchPrices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('pricelist_table').select('*').order('id');
    if (!error && data) {
      setPrices(data);
    } else {
      console.error('Error fetching price list:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleDelete = async () => {
    if (showDeleteConfirm === null) return;
    const { error } = await supabase.from('pricelist_table').delete().eq('id', showDeleteConfirm);
    if (!error) fetchPrices();
    setShowDeleteConfirm(null);
  };

  const handleEdit = (item: PriceItem) => {
    setSelectedItem(item);
    setForm({
      Kategori: item.Kategori,
      Layanan: item.Layanan,
      Deskripsi: item.Deskripsi,
      Harga: item.Harga,
      Duration: item.Duration,
    });
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'Duration' ? parseInt(value) : value }));
  };

  const handleSubmit = async () => {
    if (selectedItem) {
      await supabase.from('pricelist_table').update(form).eq('id', selectedItem.id);
    } else {
      await supabase.from('pricelist_table').insert([form]);
    }
    setSelectedItem(null);
    setShowModal(false);
    setForm({ Kategori: '', Layanan: '', Deskripsi: '', Harga: '', Duration: 30 });
    fetchPrices();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin: Price List Management</h1>
        <button
          onClick={() => {
            setSelectedItem(null);
            setForm({ Kategori: '', Layanan: '', Deskripsi: '', Harga: '', Duration: 30 });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Add Service
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Kategori</th>
              <th className="p-2 text-left">Layanan</th>
              <th className="p-2 text-left">Deskripsi</th>
              <th className="p-2 text-left">Harga</th>
              <th className="p-2 text-left">Durasi</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{item.Kategori}</td>
                <td className="p-2">{item.Layanan}</td>
                <td className="p-2 text-gray-600">{item.Deskripsi}</td>
                <td className="p-2">{item.Harga}</td>
                <td className="p-2">{item.Duration} min</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
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
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-4">
              {selectedItem ? 'Edit Service' : 'Add New Service'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="Kategori"
                placeholder="Kategori"
                value={form.Kategori}
                onChange={handleFormChange}
                className="border p-2 rounded"
              />
              <input
                name="Layanan"
                placeholder="Layanan"
                value={form.Layanan}
                onChange={handleFormChange}
                className="border p-2 rounded"
              />
              <textarea
                name="Deskripsi"
                placeholder="Deskripsi"
                value={form.Deskripsi}
                onChange={handleFormChange}
                className="border p-2 rounded col-span-2"
              />
              <input
                name="Harga"
                placeholder="Harga"
                value={form.Harga}
                onChange={handleFormChange}
                className="border p-2 rounded"
              />
              <input
                name="Duration"
                placeholder="Durasi (menit)"
                type="number"
                value={form.Duration}
                onChange={handleFormChange}
                className="border p-2 rounded"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                {selectedItem ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this service?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPriceListPage;
