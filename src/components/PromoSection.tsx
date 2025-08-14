import React from 'react';
import logo from '../assets/promo.jpeg';

const PromoSection = () => {
  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={logo}
            alt="Yugen Cuts Promo"
            className="w-full h-[400px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end justify-center pb-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Special Promo</h2>
              <p className="text-xl text-yellow-400 font-semibold">
                15–18 Agustus 2025 — Jangan lewatkan!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
