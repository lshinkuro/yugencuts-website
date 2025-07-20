import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  BarChart2,
  CalendarCheck2,
  DollarSign,
  Scissors,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active, sidebarOpen }: any) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
      ${active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
  >
    <Icon className="w-4 h-4" />
    {sidebarOpen && <span className="sidebar-label">{label}</span>}
  </Link>
);

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white border-r transition-all duration-300 flex flex-col justify-between`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold text-gray-800">
              {sidebarOpen ? 'Admin' : 'A'}
            </span>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-black"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 overflow-hidden">
            <SidebarLink
              to="/admin/dashboard"
              icon={BarChart2}
              label="Dashboard"
              active={location.pathname.includes('/dashboard')}
            />
            <SidebarLink
              to="/admin/bookings"
              icon={CalendarCheck2}
              label="Bookings"
              active={location.pathname.includes('/bookings')}
            />
            <SidebarLink
              to="/admin/prices"
              icon={DollarSign}
              label="Pricelist"
              active={location.pathname.includes('/prices')}
            />
            <SidebarLink
              to="/admin/barbers"
              icon={Scissors}
              label="Barbers"
              active={location.pathname.includes('/barbers')}
            />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm text-red-600 hover:text-red-800"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
