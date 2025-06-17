import { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { Scissors, Sparkles, Crown, LucideIcon } from 'lucide-react';

// Tipe data untuk 1 service item
interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  icon: LucideIcon;
  popular: boolean;
}

// Mapping kategori ke ikon
const iconMap: Record<string, LucideIcon> = {
  haircut: Scissors,
  grooming: Sparkles,
  haircolor: Crown,
};

const Home = () => {
  const [servicesData, setServicesData] = useState<ServiceItem[]>([]);

  useEffect(() => {
    axios
      .get('https://sheetdb.io/api/v1/cz58xc39pr52o') // Ganti dengan SheetDB ID kamu
      .then((res) => {
        const formatted: ServiceItem[] = res.data.map((item: any, index: number) => {
          const category = item.Kategori?.toLowerCase() || 'uncategorized';
          return {
            id: index + 1,
            name: item.Layanan,
            description: item.Deskripsi,
            price: item.Harga,
            duration: `${item.Duration} min`,
            category,
            icon: iconMap[category] || Crown,
            popular: false,
          };
        });
        setServicesData(formatted);
      });
  }, []);

  return (
    <>
      <Hero />
      <Services services={servicesData} />
    </>
  );
};

export default Home;
