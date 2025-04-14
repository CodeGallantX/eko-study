import { ParallaxProvider } from 'react-scroll-parallax';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Banner from '../../components/shared/Banner';
import AboutHero from '../../components/about/AboutHero';
import AboutStats from '../../components/about/AboutStats';
import AboutMission from '../../components/about/AboutMission';
import AboutVision from '../../components/about/AboutVision';
import AboutFeatures from '../../components/about/AboutFeatures';
import AboutTestimonials from '../../components/about/AboutTestimonials';
import AboutVideo from '../../components/about/AboutVideo';
import AboutFAQ from '../../components/about/AboutFAQ';
import AboutSocial from '../../components/about/AboutSocial';
import AboutCTA from '../../components/about/AboutCTA';
import { pageData } from '../../data/about';

export default function AboutPage() {
  return (
    <ParallaxProvider>
      <div className="bg-white">
        <Header />
        <Banner page={pageData} />

        <div className="container mx-auto px-4 py-12">
          <AboutHero />
          <AboutStats />
          <AboutMission />
          <AboutVision />
          <AboutFeatures />
          <AboutTestimonials />
          <AboutVideo />
          <AboutFAQ />
          <AboutSocial />
          <AboutCTA />
        </div>

        <Footer />
      </div>
    </ParallaxProvider>
  );
}