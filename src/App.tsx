import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListBarbers from './pages/ListBarber';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
// import BookingsPage from './pages/BookingsPage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminPriceListPage from './pages/AdminPricelistPage';
import AdminBarberListPage from './pages/AdminBarberListPage.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="min-h-screen bg-white">
      {!isAdminPath && <Navbar />}
      <main className="pt-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barbers" element={<ListBarbers />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/bookinglist" element={<BookingsPage />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="prices" element={<AdminPriceListPage />} />
              <Route path="barbers" element={<AdminBarberListPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;
