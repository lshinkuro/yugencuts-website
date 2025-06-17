import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type Barber = {
  id: number;
  name: string;
  role: string;
  experience?: string;
  bio: string;
  image: string;
  specialty?: string;
  rating?: number;
};

type Service = {
  id: string;
  name: string;
  price: string;
  duration?: string;
};

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedService }) => {
  const [step, setStep] = useState<number>(1);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  const timeSlots = [
    '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00'
  ];

  useEffect(() => {
    const fetchBarbers = async () => {
      const { data, error } = await supabase
        .from('barberlist-table')
        .select('*');

      if (error) {
        console.error('Error fetching barbers:', error);
      } else {
        setBarbers(data as Barber[]);
      }
    };

    if (isOpen) fetchBarbers();
  }, [isOpen]);

  const resetModal = () => {
    setStep(1);
    setSelectedBarber(null);
    setSelectedDate('');
    setSelectedTime('');
    setCustomerName('');
    setCustomerPhone('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleBookingComplete = () => {
    const message = `
    Halo, saya ingin booking layanan:
    • Layanan: ${selectedService?.name}
    • Barber: ${selectedBarber?.name}
    • Tanggal: ${selectedDate}
    • Jam: ${selectedTime}
    • Nama: ${customerName}
    • No HP: ${customerPhone} Note: Terima kasih atas booking-nya di Yugen Cuts. Untuk kenyamanan bersama, mohon datang tepat waktu ya. Keterlambatan lebih dari 10 menit, booking akan dijadwalkan ulang. See you! 🙏🏻😊
        `.trim();

    const phone = '628119462018'; // Ganti dengan nomor WA admin
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, '_blank');
    onClose();
  };

  const getNextAvailableDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? 'text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    style={step >= stepNumber ? { backgroundColor: '#1F2A44' } : {}}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        step > stepNumber ? 'bg-black' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Choose Barber</span>
              <span>Select Date & Time</span>
              <span>Confirm Details</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Selected Service */}
          {selectedService && step < 4 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">Selected Service</h3>
              <p className="text-gray-600">{selectedService.name} - {selectedService.price}</p>
              <p className="text-sm text-gray-500">{selectedService.duration}</p>
            </div>
          )}

          {/* Step 1: Choose Barber */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Barber</h3>
              <div className="space-y-4">
                {barbers.map((barber) => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber)}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedBarber?.id === barber.id ? 'border-black bg-gray-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{barber.name}</h4>
                        <p className="text-sm text-gray-600">{barber.specialty}</p>
                        <p className="text-sm text-gray-500">{barber.experience} years experiences</p>
                      </div>
                      {barber.rating && (
                        <span className="text-sm font-medium">⭐ {barber.rating}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedBarber}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Choose Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getNextAvailableDate()}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Available Times</label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 text-sm border rounded-lg ${
                        selectedTime === time
                          ? 'bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-2 border">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Confirm Your Details</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="e.g. 081234567890"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-6 py-2 border">Back</button>
                <button
                  onClick={handleBookingComplete}
                  disabled={!customerName || !customerPhone}
                  className="px-6 py-2 bg-green-600 text-white disabled:bg-gray-300"
                >
                  Confirm Booking (WA)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
