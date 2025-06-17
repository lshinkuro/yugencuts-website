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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 mb-1">
                          {service.price}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <button
                      onClick={() => handleBookService(service)}
                      style={{ backgroundColor: '#1F2A44' }}
                      className="w-full  text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 font-medium group-hover:shadow-lg transform group-hover:-translate-y-0.5"
                    >
                      Book This Service
                    </button>
                  </div>
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
