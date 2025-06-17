import  { useState } from 'react';
import { X, Check } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, selectedService }) => {
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const barbers = [
    {
      id: 1,
      name: 'Ahmad Rizki',
      specialty: 'Classic & Fade Cuts',
      experience: '8 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      specialty: 'Beard & Mustache',
      experience: '6 years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Dedi Kurniawan',
      specialty: 'Modern Styles',
      experience: '5 years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  const timeSlots = [
    '11:00', '12:00',
    '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00',
    '23:00'
  ];

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
    // Here you would typically send the booking data to your backend
    console.log('Booking completed:', {
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      time: selectedTime,
      customer: { name: customerName, phone: customerPhone }
    });
    
    setStep(4); // Show success message
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
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 4 ? 'Booking Confirmed!' : 'Book Appointment'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
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

        <div className="p-6">
          {/* Service Info */}
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
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedBarber?.id === barber.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{barber.name}</h4>
                        <p className="text-sm text-gray-600">{barber.specialty}</p>
                        <p className="text-sm text-gray-500">{barber.experience} experience</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">⭐ {barber.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedBarber}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getNextAvailableDate()}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Times
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 text-sm border rounded-lg transition-all duration-200 ${
                        selectedTime === time
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm Details */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Your Details</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barber:</span>
                    <span className="font-medium">{selectedBarber?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">{selectedService?.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleBookingComplete}
                  disabled={!customerName || !customerPhone}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success Message */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked. We'll send you a confirmation message shortly.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Appointment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barber:</span>
                    <span className="font-medium">{selectedBarber?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{customerName}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3 bg-black text-white hover:bg-gray-900 transition-colors duration-200"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;