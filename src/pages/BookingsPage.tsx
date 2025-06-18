import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

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

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchBookings = async () => {
    setLoading(true);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentTimeStr = today.toTimeString().split(' ')[0].slice(0, 5); // HH:MM

    const { data, error } = await supabase
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
      `)
      .eq('status', 'Booked')
      .or(`date.gt.${todayStr},and(date.eq.${todayStr},time.gte.${currentTimeStr})`)
      .order('date', { ascending: sortOrder === 'asc' })
      .order('time', { ascending: sortOrder === 'asc' });

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
  }, [sortOrder]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Upcoming Bookings</h1>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="asc">Sort by Date: Oldest</option>
          <option value="desc">Sort by Date: Newest</option>
        </select>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No upcoming bookings.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Customer Phone</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Barber</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
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
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
