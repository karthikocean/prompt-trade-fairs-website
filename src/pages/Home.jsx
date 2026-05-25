import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import Hero from '../components/Hero';
import Stats from '../components/ExhibitionsCard';
import About from '../components/Testimonials';
import EnquirySection from '../components/ResigterForm';
import PreviousExpo from '../components/IndustriesSlider';
import WhyChoose from '../components/WhyChoose';
import NextExpoSection from '../components/NextExpoSection';
import MobileAppSection from '../components/MobileAppSection';
import FlashNews from '../components/FlashNews';

const Home = () => {
  useScrollAnimation();

  return (
    <main>
      <Hero />
      <FlashNews />
      <NextExpoSection />
      <Stats />
      {/* <PreviousExpo /> */}
      <WhyChoose />
      <EnquirySection />
      <About />
      <MobileAppSection />
    </main>
  );
};

export default Home;
