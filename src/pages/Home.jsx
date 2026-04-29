import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

import Hero from '../components/Hero';
import Stats from '../components/ExhibitionsCard';
import About from '../components/Testimonials';
import EnquirySection from'../components/ResigterForm';
import PreviousExpo from '../components/IndustriesSlider';
import WhyChoose from '../components/WhyChoose';
import NextExpoSection from '../components/NextExpoSection';
import ReportingCharts from '../components/ReportingCharts';



import VenueSection from '../components/VenueSection';
import MobileAppSection from '../components/MobileAppSection';

const Home = () => {
    useScrollAnimation();

    return (
        <main>
            <Hero />
            <NextExpoSection />
            <PreviousExpo/>
            <Stats />
            <ReportingCharts />
            <WhyChoose />

            {/* <VenueSection /> */}
            <About />
            <MobileAppSection />
        </main>
    );
};

export default Home;
