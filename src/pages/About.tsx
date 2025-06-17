import React from 'react';

const About: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-left">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-4">About Yugen Cuts</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Yugen Cuts is a premium barbershop that blends traditional haircutting techniques 
            with modern style and top-tier service. Established in 2015, we’ve served thousands of clients 
            with a wide range of styles and grooming needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-[#1F2A44] mb-2">Our Philosophy</h3>
            <p className="text-gray-600 leading-relaxed">
              "Yugen" is a Japanese philosophy that expresses deep and subtle beauty.
              We believe a great haircut is not just about outer appearance, 
              but also about confidence and a memorable experience.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#1F2A44] mb-2">Why Choose Us?</h3>
            <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
              <li>Experienced and professional barbers</li>
              <li>Friendly & personalized service</li>
              <li>Premium quality grooming products</li>
              <li>Comfortable and stylish environment</li>
              <li>Easy online booking</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700">
            ✂️ Ready to level up your look? Visit <strong>Yugen Cuts</strong> and experience the difference!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
