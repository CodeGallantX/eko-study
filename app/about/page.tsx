import { Metadata } from 'next';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Banner from '../../components/shared/Banner';
import AboutHero from '@/components/about/AboutHero';
import AboutMission from '@/components/about/AboutMission';
import AboutVision from '@/components/about/AboutVision';
import AboutFeatures from '@/components/about/AboutFeatures';
import AboutStats from '@/components/about/AboutStats';
import AboutTestimonials from '@/components/about/AboutTestimonials';
import AboutVideo from '@/components/about/AboutVideo';
import AboutFAQ from '@/components/about/AboutFAQ';
import AboutSocial from '@/components/about/AboutSocial';
import AboutCTA from '@/components/about/AboutCTA';
import { pageData } from '../../data/about';
import { ParallaxProvider } from '@/components/providers/ParallaxProvider';

export const metadata: Metadata = {
  title: 'About EkoStudy | Revolutionizing Student Learning Experience',
  description: 'Discover how EkoStudy is transforming education with AI-powered learning tools, comprehensive study resources, and collaborative learning environments for students.',
  keywords: 'education technology, learning management system, student resources, AI learning, study tools, academic success, online education, collaborative learning',
};

export default function AboutPage() {
  return (
    <ParallaxProvider>
      <div className="bg-white">
        <Header />
        <Banner page={pageData} />

        <div className="container mx-auto px-4 py-12">
          <AboutHero />
          <AboutMission />
          <AboutVision />
          <AboutFeatures />
          <AboutStats />
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