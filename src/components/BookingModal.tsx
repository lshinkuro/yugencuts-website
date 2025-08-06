import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type Branch = {
  branch_id: string;
  branch_name: string;
  branch_address: string;
};

type Barber = {
  barber_id: string;
  id: number;
  name: string;
  role: string;
  experience?: string;
  bio: string;
  image: string;
  specialty?: string;
  rating?: number;
  status?: boolean;
  branch_id: string;
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
  const [branches, setBranch] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);


  const today = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === today;

  const timeSlots = [
    '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00'
  ];

  useEffect(() => {
    const fetchBranch = async () => {
      const { data, error } = await supabase
        .from('branch_table')
        .select('*');

      if (error) {
        console.error('Error fetching branch:', error);
      } else {
        setBranch(data as Branch[]);
      }
    };

    const fetchBarbers = async () => {
      const { data, error } = await supabase
        .from('barberlist_table')
        .select('*')
        .eq('status', true);

      if (error) {
        console.error('Error fetching barbers:', error);
      } else {
        setBarbers(data as Barber[]);
      }
    };

    if (isOpen)  { 
      fetchBranch();
      fetchBarbers();
    };
  }, [isOpen]);

  const resetModal = () => {
    setStep(1);
    setSelectedBranch(null);
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

  const isTimeSlotTaken = async () => {
    const { data, error } = await supabase
      .from('order_list')
      .select('*')
      .eq('barber_id', selectedBarber?.barber_id)
      .eq('date', selectedDate)
      .eq('time', selectedTime);
  
    if (error) {
      console.error('Error checking time slot:', error);
      return false;
    }
  
    return data.length > 0;
  };

  const isTimeInPast = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const now = new Date();

    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);

    return slotTime < now;
  };

  

  const handleSubmitToSupabase = async () => {
    if (await isTimeSlotTaken()) {
      alert('Waktu ini sudah dibooking untuk barber tersebut.');
      return false;
    }

    if (!selectedBarber || !selectedService || !selectedDate || !selectedTime || !customerName) {
      alert('Please fill all booking fields.');
      return false;
    }
  
    const { error } = await supabase
      .from('order_list')
      .insert([
        {
          customer_name: customerName,
          customer_phonenumber: customerPhone,
          barber_id: selectedBarber.barber_id || selectedBarber.id, // pastikan UUID
          service: selectedService.name,
          date: selectedDate,
          time: selectedTime,
          notes: customerPhone,
          status: 'Booked',
          branch_id: selectedBranch?.branch_id,
        }
      ]);
  
    if (error) {
      console.error('Insert booking error:', error);
      alert('Failed to book appointment.');
      return false;
    }
  
    return true;
  };

  const handleBookingComplete = async () => {
  if (!selectedBarber || !selectedService || !selectedDate || !selectedTime || !customerName || !customerPhone) {
    alert('Please fill all booking fields.');
    return;
  }

  if (await isTimeSlotTaken()) {
    alert('Waktu ini sudah dibooking untuk barber tersebut.');
    return;
  }

    // Tampilkan modal konfirmasi dulu
    setShowConfirmPopup(true);
  };

  const confirmBookingAndSendWA = async () => {
      const success = await handleSubmitToSupabase();
      if (!success) return;


      const message = `
    Halo, saya ingin booking layanan:
    • Cabang: ${selectedBranch?.branch_name}
    • Layanan: ${selectedService?.name}
    • Barber: ${selectedBarber?.name}
    • Tanggal: ${selectedDate}
    • Jam: ${selectedTime}
    • Nama: ${customerName}
    • No HP: ${customerPhone}

    Note: Terima kasih atas booking-nya di Yugen Cuts. Untuk kenyamanan bersama, mohon datang tepat waktu ya. Keterlambatan lebih dari 10 menit, booking akan dijadwalkan ulang. See you! 🙏🏻😊
      `.trim();

      const phone = '628119462018';
      const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(whatsappLink, '_blank');
      setShowConfirmPopup(false);
      onClose();
    };

  
 
  
  const getNextAvailableDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // format: yyyy-mm-dd
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
        {step < 5 && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNumber ? 'text-white' : 'bg-gray-200 text-gray-600'}`}
                    style={step >= stepNumber ? { backgroundColor: '#1F2A44' } : {}}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? 'bg-black' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Choose Branch</span>
              <span>Choose Barber</span>
              <span>Select Date & Time</span>
              <span>Confirm Details</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Selected Service */}
          {selectedService && step < 5 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">Selected Service</h3>
              <p className="text-gray-600">{selectedService.name} - {selectedService.price}</p>
              <p className="text-sm text-gray-500">{selectedService.duration}</p>
            </div>
          )}

          {/* Step 1: Choose Branch */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Branch</h3>
              <div className="space-y-4">
                {branches.map((branch) => (
                  <div
                    key={branch.branch_id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`p-4 border rounded-lg cursor-pointer ${selectedBranch?.branch_id === branch.branch_id ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                  >
                    <h4 className="font-semibold">{branch.branch_name}</h4>
                    <p className="text-sm text-gray-600">{branch.branch_address}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedBranch}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Choose Barber (sebelumnya Step 1) */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Barber</h3>
              <div className="space-y-4">
                {barbers
                .filter(barber => barber.branch_id === selectedBranch?.branch_id) // ⬅️ tambahkan ini
                .map((barber) => (
                  <div
                    key={barber.barber_id}
                    onClick={() => setSelectedBarber(barber)}
                    className={`p-4 border rounded-lg cursor-pointer ${selectedBarber?.barber_id === barber.barber_id ? 'border-black bg-gray-50' : 'border-gray-200'}`}
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
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-2 border">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedBarber}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time (sebelumnya Step 2) */}
          {step === 3 && (
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
                  {timeSlots.map((time) => {
                    const disabled = isToday && isTimeInPast(time);

                    return (
                      <button
                        key={time}
                        onClick={() => !disabled && setSelectedTime(time)}
                        disabled={disabled}
                        className={`p-3 text-sm border rounded-lg ${
                          selectedTime === time
                            ? 'bg-black text-white'
                            : disabled
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
              </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-6 py-2 border">Back</button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-2 bg-black text-white disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm (sebelumnya Step 3) */}
          {step === 4 && (
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
                <button onClick={() => setStep(3)} className="px-6 py-2 border">Back</button>
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

        {/* Confirmation Popup */}
        {showConfirmPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
              <h3 className="text-lg font-bold mb-4">Konfirmasi Booking</h3>
              <p className="text-sm text-gray-700 mb-4">
                Apakah kamu yakin ingin melakukan booking dengan detail berikut?
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li><strong>Cabang:</strong> {selectedBranch?.branch_name}</li>
                <li><strong>Layanan:</strong> {selectedService?.name}</li>
                <li><strong>Barber:</strong> {selectedBarber?.name}</li>
                <li><strong>Tanggal:</strong> {selectedDate}</li>
                <li><strong>Jam:</strong> {selectedTime}</li>
                <li><strong>Nama:</strong> {customerName}</li>
                <li><strong>No HP:</strong> {customerPhone}</li>
              </ul>
              <p className="text-xs text-gray-500 mb-4">
                Jika ingin pembatalan, hubungi langsung WA <strong>Yugen Cuts</strong> ya!
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={confirmBookingAndSendWA}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Ya, Saya Setuju
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
