import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X } from 'lucide-react';

type Booking = {
  order_id: string;
  customer_name: string;
  service: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  barber_name: string;
};

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const formatIndoDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${day} ${monthNames[month - 1]} ${year}`;
};

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('active');

  const fetchBookings = async () => {
    setLoading(true);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentTimeStr = today.toTimeString().split(' ')[0].slice(0, 5); // HH:MM

    let query = supabase
      .from('order_list')
      .select(`
        order_id,
        customer_name,
        service,
        date,
        time,
        status,
        notes,
        barber_id,
        barberlist_table (
          name
        )
      `);

    if (statusFilter === 'active') {
      query = query
        .eq('status', 'Booked')
        .or(`date.gt.${todayStr},and(date.eq.${todayStr},time.gte.${currentTimeStr})`);
    } else if (statusFilter === 'completed') {
      query = query.eq('status', 'Completed');
    } else if (statusFilter === 'cancelled') {
      query = query.eq('status', 'Cancelled');
    }

    query = query.order('date', { ascending: true }).order('time', { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      const formatted = data.map((item: any) => ({
        order_id: item.order_id,
        customer_name: item.customer_name,
        service: item.service,
        date: item.date,
        time: item.time,
        status: item.status,
        notes: item.notes,
        barber_name: item.barberlist_table?.name || 'Unknown',
      }));
      setBookings(formatted);
    }

    setLoading(false);
  };





  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleDelete = async (order_id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this booking?');
    if (!confirm) return;

    const { error } = await supabase
      .from('order_list')
      .delete()
      .eq('order_id', order_id);

    if (error) {
      console.error('Delete error:', error);
    } else {
      fetchBookings();
    }
  };

  const openEditModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditDate(booking.date);
    setEditTime(booking.time);
  };

  const handleUpdate = async () => {
    if (!selectedBooking) return;

    const { error } = await supabase
      .from('order_list')
      .update({
        status: editStatus,
        date: editDate,
        time: editTime,
      })
      .eq('order_id', selectedBooking.order_id);

    if (error) {
      console.error('Update error:', error);
    } else {
      setSelectedBooking(null);
      fetchBookings();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin: Manage Bookings</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="active">Aktif (Upcoming)</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
          <option value="all">Semua</option>
        </select>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Barber</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.order_id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{booking.customer_name}</td>
                  <td className="p-3 text-sm text-gray-600">{booking.notes || '-'}</td>
                  <td className="p-3">{booking.service}</td>
                  <td className="p-3">{booking.barber_name}</td>
                  <td className="p-3">{formatIndoDate(booking.date)}</td>
                  <td className="p-3">{booking.time}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => openEditModal(booking)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking.order_id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setSelectedBooking(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                >
                  <option value="Booked">Booked</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedBooking(null)}
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

export default AdminBookingsPage;
