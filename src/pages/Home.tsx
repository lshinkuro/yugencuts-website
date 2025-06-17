import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { Scissors, Sparkles, Crown, LucideIcon } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';


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
    const getData = async () => {
      const { data, error } = await supabase
        .from('pricelist-table')
        .select('*');
  
      if (error) {
        console.error('Error fetching:', error);
      } else {
        const formatted: ServiceItem[] = data.map((item: any, index: number) => {
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
      }
    };
  
    getData();
  }, []);

  return (
    <>
      <Hero />
      <Services services={servicesData} />
    </>
  );
};

export default Home;
