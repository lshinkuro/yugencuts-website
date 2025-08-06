import {
  Instagram,

  MapPin,
  Phone,
  Mail,
  Clock,
  Ticket,
} from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: (
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold block mb-1">Cabang 1 (Margonda):</span>
            <a
              href="https://maps.app.goo.gl/fZjFjsBAE6YPHn728"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              📍Jl. Margonda No.518a, Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424
            </a>
          </div>
          <div>
            <span className="font-semibold block mb-1">Cabang 2 (Sukmajaya):</span>
            <a
              href="https://maps.app.goo.gl/YZGvZKDvhHBGPUYt9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              📍Jl. Tole Iskandar Graha DL No.8B, Sukmajaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412
            </a>
          </div>
        </div>
      ),
    },
    { icon: Phone, label: '+62 811-9462-018' },
    { icon: Mail, label: 'yugencuts.info@gmail.com' },
    { icon: Clock, label: 'Mon-Sun: 11:00 AM - 11:00 PM' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/yugencuts/?hl=en',
      name: 'Instagram',
    },
    { icon: Ticket , href: 'https://www.tiktok.com/@yugencutsbarbershop', name: 'Tiktok' },
  ];

  return (
    <footer className="text-white" style={{ backgroundColor: '#1F2A44' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={logo}
                alt="YugenCuts Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold">YugenCuts</span>
            </div>
            <p className="text-gray-300 max-w-sm leading-relaxed mb-6">
              Experience the art of traditional barbering with modern techniques. Your trusted barbershop for premium cuts and grooming.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black flex items-center justify-center transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-gray-300 text-sm">
            {contactInfo.map(({ icon: Icon, label }, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <Icon className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-400">
          © 2024 YugenCuts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
