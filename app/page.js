import Headerpage from '@/components/Header';
import Heropage from '@/components/Hero';
import Statspage from '@/components/Stats';
import Whychoosepage from '@/components/Whychoose';
import Footer from '@/components/Footer';
import Testimonialpage from '@/components/Testimonial';
import Services from '@/components/Services';
import Pricingpage from '@/components/Pricing';
import Galarypage from '@/components/Galary';
export default function Home () {
  return (
    <>
      <Headerpage />
      <Heropage />
      <Statspage />
      <Whychoosepage />
      <Services />
      <Testimonialpage />
      <Pricingpage />
      <Galarypage />
      <Footer />
    </>
  );
}