import React, { useState } from 'react';
import clsx from 'clsx';

type ImageItem = {
  id: number;
  url: string;
  category: 'Haircut' | 'Beard' | 'Styling';
};

const categories = ['All', 'Haircut', 'Beard', 'Styling'];

const galleryItems: ImageItem[] = [
  {
    id: 1,
    url: 'https://plus.unsplash.com/premium_photo-1683120994739-2be0d817c0e4?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Haircut',
  },
  {
    id: 2,
    url: 'https://plus.unsplash.com/premium_photo-1683120994739-2be0d817c0e4?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Beard',
  },
  {
    id: 3,
    url: 'https://plus.unsplash.com/premium_photo-1683120994739-2be0d817c0e4?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Styling',
  },
  {
    id: 4,
    url: 'https://plus.unsplash.com/premium_photo-1683120994739-2be0d817c0e4?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Haircut',
  },
  {
    id: 5,
    url: 'https://plus.unsplash.com/premium_photo-1683120994739-2be0d817c0e4?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Haircut',
  },
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredImages = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

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
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.url}
                alt={`Gallery ${item.id}`}
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
