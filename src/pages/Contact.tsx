import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example if integrated with EmailJS or Google Sheets
    console.log('Sending data:', form);

    alert('Your message has been sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1F2A44] mb-12 text-left">Contact Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Have questions or want to book an appointment? Don’t hesitate to reach out. Our team is here to help!
            </p>

            <div className="flex items-start space-x-4">
              <MapPin className="text-[#1F2A44] w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-[#1F2A44]">Address</h4>
                <p className="text-gray-600">📍Jl. Margonda No.518a, Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="text-[#1F2A44] w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-[#1F2A44]">Phone / WhatsApp</h4>
                <p className="text-gray-600">+62 811-9462-018</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-[#1F2A44] w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-[#1F2A44]">Email</h4>
                <p className="text-gray-600">yugencuts.info@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-md"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1F2A44] focus:border-[#1F2A44] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1F2A44] focus:border-[#1F2A44] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1F2A44] focus:border-[#1F2A44] outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#1F2A44] text-white px-6 py-3 rounded-full hover:bg-[#162036] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
