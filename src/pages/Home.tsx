import Hero from '../components/Hero';
import HomeGallery from './HomeGallery';
import HomeServices from './HomeServices';
import HomeBarbers from './HomeBarbers';
import About from './About';
import PromoSection from '../components/PromoSection';

const Home = () => {
  return (
    <>
      <PromoSection />
      <Hero />
      <HomeGallery />
      <HomeServices />
      <HomeBarbers />
      <About />
    </>
  );
};

export default Home;