import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { supabase } from '../lib/supabaseClient';

type PhotoItem = {
  id: number;
  name: string;
  image_path: string;
  category: string;
  created_at: string;
};

const categories = ['All', 'Haircut', 'Beard', 'Styling'];

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('potolist_table')
        .select('*');

      if (error) {
        console.error('Error fetching photos:', error);
      } else {
        setPhotos(data as PhotoItem[]);
      }
    };

    fetchPhotos();
  }, []);

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1F2A44] mb-10 text-left">Gallery</h2>

        <div className="flex gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                'px-5 py-2 text-sm rounded-full border transition-all duration-300',
                selectedCategory === cat
                  ? 'bg-[#1F2A44] text-white border-[#1F2A44]'
                  : 'bg-white text-[#1F2A44] border-[#1F2A44] hover:bg-[#1F2A44] hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.image_path}
                alt={item.name || `Gallery ${item.id}`}
                className="w-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
