import { Calendar } from 'lucide-react';
import heroBg from '../assets/yugent.png';

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 py-24">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-white">
            <span className="inline-block mb-5 px-4 py-1 text-xs font-medium tracking-wider uppercase bg-white/10 text-white rounded-full backdrop-blur-sm">
              Premium Barbershop Experience
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-5">
              Craft Your <span className="text-yellow-400">Perfect Look</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-md">
              Modern grooming rooted in tradition. Our master barbers bring out your best look with precision and care.
            </p>

            <button
              onClick={scrollToServices}
              className="inline-flex items-center px-6 py-3 text-sm font-medium bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-md"
            >
              Book Appointment
              <Calendar className="ml-2 w-4 h-4" />
            </button>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-xs text-left">
              {[
                { label: 'Clients', value: '1000+' },
                { label: 'Years', value: '8+' },
                { label: 'Satisfaction', value: '99%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/70 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image (optional, for future use) */}
          {/* <div className="hidden lg:block w-1/2">
            <img
              src="/your-barber-image.jpg"
              alt="Barber"
              className="rounded-2xl shadow-xl object-cover w-full h-auto"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
