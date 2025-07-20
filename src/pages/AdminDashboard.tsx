import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminDashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('order_list').select('*');

    if (!error && data) {
      setTotalBookings(data.length);
      const total = data.reduce((acc, item) => {
        const match = /\d+/.exec(item.service);
        const price = match ? parseInt(match[0]) : 0;
        return acc + price;
      }, 0);
      setTotalRevenue(total);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white border rounded shadow text-center">
            <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-black">{totalBookings}</p>
          </div>
          <div className="p-6 bg-white border rounded shadow text-center">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">Rp {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;