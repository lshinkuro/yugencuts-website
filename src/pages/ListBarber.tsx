import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Barber = {
  id: number;
  name: string;
  role: string;
  experience?: string;
  bio: string;
  image: string;
};

const ListBarbers: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const { data, error } = await supabase
        .from('barberlist_table')
        .select('*');

      if (error) {
        console.error('Error fetching barbers:', error);
      } else {
        setBarbers(data as Barber[]);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1F2A44] mb-16 text-left">
          Meet Our Barbers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {barbers.map((barber) => (
            <div
            key={barber.id}
            className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Full-width image */}
            <div className="w-full h-60">
              <img
                src={barber.image}
                alt={barber.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          
            {/* Content bawah */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#1F2A44]">{barber.name}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-1">{barber.role}</p>
              <p className="text-sm text-gray-600 mb-4">{barber.bio}</p>
              <button className="bg-[#1F2A44] text-white text-sm px-5 py-2 rounded-full hover:bg-[#162036] transition-colors duration-300">
                Book Now
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListBarbers;
