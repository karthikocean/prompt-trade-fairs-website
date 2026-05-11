import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import UpcomingExhibitions from './pages/UpcomingExhibitions';
import PreviousExhibitions from './pages/PreviousExhibitions';
import OurGroups from './pages/OurGroups';
import Careers from './pages/Careers';
import ToExhibit from './pages/ToExhibit';
import PaymentTerms from './pages/PaymentTerms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import EventDetail from './pages/EventDetail';
import RegisterNow from './pages/RegisterNow';
import './assets/css/styles.css';

function App() {
    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollToTop />
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/upcoming-exhibitions" element={<UpcomingExhibitions />} />
                    <Route path="/previous-exhibitions" element={<PreviousExhibitions />} />
                    <Route path="/our-groups" element={<OurGroups />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/to-export" element={<ToExhibit />} />
                    <Route path="/register-now" element={<RegisterNow />} />
                    <Route path="/payment-terms" element={<PaymentTerms />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                </Routes>
                <Footer />
                <ChatBot />
            </div>

        </Router>
    );
}

export default App;
