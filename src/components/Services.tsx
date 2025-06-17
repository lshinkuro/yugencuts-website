import { useState } from 'react';
import {
  Scissors,
  Sparkles,
  Crown,
  Clock,
  Star,
  LucideIcon,
} from 'lucide-react';
import BookingModal from './BookingModal';

// Tipe untuk setiap layanan (service)
export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  icon: LucideIcon;
  popular: boolean;
}

// Tipe props
interface ServicesProps {
  services: ServiceItem[];
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

const Services: React.FC<ServicesProps> = ({ services = [] }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const serviceCategories: Category[] = [
    { id: 'all', name: 'All Services', icon: Star },
    { id: 'haircut', name: 'Haircuts', icon: Scissors },
    { id: 'grooming', name: 'Grooming', icon: Sparkles },
    { id: 'haircolor', name: 'Hair Color', icon: Crown },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  const handleBookService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <>
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of premium barbering services.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                  style={
                    activeCategory === category.id
                      ? { backgroundColor: '#1F2A44' }
                      : {}
                  }
                >
                    <Icon className="w-4 h-4" />
                <span>{category.name}</span>
               </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition duration-200"
                  >
                    {service.popular && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <div className="text-base font-semibold text-gray-800">
                          {service.price}
                        </div>
                        <div className="flex items-center justify-end text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 leading-snug">
                      {service.description}
                    </p>

                    <button
                      onClick={() => handleBookService(service)}
                      className="w-full text-sm py-2 rounded-md text-white transition bg-gray-800 hover:bg-gray-900"
                    >
                      Book This Service
                    </button>
                  </div>
                );
              })}
            </div>


          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No services found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </>
  );
};

export default Services;
