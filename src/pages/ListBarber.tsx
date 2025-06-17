import React from 'react';

type Barber = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
};

const barbers: Barber[] = [
  {
    id: 1,
    name: 'John Barber',
    role: 'Master Barber',
    bio: '10+ tahun pengalaman potong rambut dan grooming.',
    image: '/images/barbers/john.jpg',
  },
  {
    id: 2,
    name: 'Mike Fade',
    role: 'Fade Expert',
    bio: 'Spesialis fade, taper, dan gaya modern.',
    image: '/images/barbers/mike.jpg',
  },
  {
    id: 3,
    name: 'Alex Scissors',
    role: 'Classic Expert',
    bio: 'Ahli gaya klasik dan beard trimming profesional.',
    image: '/images/barbers/alex.jpg',
  },
];

const ListBarbers: React.FC = () => {
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
              className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center p-6"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2A44]">{barber.name}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-3">{barber.role}</p>
              <p className="text-sm text-gray-600 mb-6">{barber.bio}</p>
              <button className="bg-[#1F2A44] text-white text-sm px-5 py-2 rounded-full hover:bg-[#162036] transition-colors duration-300">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListBarbers;
