import { Calendar } from 'lucide-react';
import heroBg from '../assets/yugent.png';

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat overflow-hidden min-h-screen"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center min-h-screen">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 pr-8">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-[#F0F4FA] text-[#1F2A44] rounded-full">
              Premium Barbershop Experience
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2A44] mb-4 leading-tight">
              Craft Your <span className="text-black">Perfect Look</span>
            </h1>

            <p className="text-base sm:text-lg text-white mb-6 leading-relaxed max-w-md">
              Modern grooming rooted in tradition. Our master barbers bring out your best look with precision and care.
            </p>

            <button
              onClick={scrollToServices}
              className="inline-flex items-center px-6 py-3 text-sm font-medium bg-[#1F2A44] text-white rounded-full hover:bg-[#162036] transition-all duration-300"
            >
              Book Appointment
              <Calendar className="ml-2 w-4 h-4" />
            </button>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-xl font-semibold text-black">1000+</p>
                <p className="text-xs text-gray-500 uppercase">Clients</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-black">8+</p>
                <p className="text-xs text-gray-500 uppercase">Years</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-black">99%</p>
                <p className="text-xs text-gray-500 uppercase">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Optional Right Image */}
          {/* <div className="hidden lg:block w-1/2">
            <img
              src="/your-barbershop-image.jpg"
              alt="Barber"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
