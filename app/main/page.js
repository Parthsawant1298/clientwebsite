import Headerpage from '@/components/Navbar';
import Heropage from '@/components/Hero';
import Statspage from '@/components/Stats';
import Whychoosepage from '@/components/Whychoose';
import Footer from '@/components/Footer';
import Testimonialpage from '@/components/Testimonial';
import Services from '@/components/Services';
import Pricingpage from '@/components/Pricing';
import Galarypage from '@/components/Galary';
export default function Main () {
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