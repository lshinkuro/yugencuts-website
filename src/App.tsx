import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListBarbers from './pages/ListBarber';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/home" element={<Home />} />  
          <Route path="/barbers" element={<ListBarbers />} /> 
          <Route path="/about" element={<About />} />          {/* Tambahkan route lain di sini */}
          <Route path="/gallery" element={<Gallery />} />          {/* Tambahkan route lain di sini */}
          <Route path="/contact" element={<Contact />} />     
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
