import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Impor komponen
import StaticBackground from './components/StaticBackground';
import Hero from './components/Hero';
import Verse from './components/Verse';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Location from './components/Location';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';
import InvitationCover from './components/InvitationCover';
import Countdown from './components/Countdown';
import MusicPlayer from './components/MusicPlayer'; // Memastikan MusicPlayer yang diimpor
import GiftRegistry from './components/GiftRegistry';
import WishesList from './components/WishesList';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const weddingDate = "2025-10-19T10:00:00";

  return (
    <>
      <StaticBackground />
      
      <InvitationCover isOpen={isOpen} onOpen={handleOpenInvitation} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Verse />
            <Hero />
            <Story />
            <Countdown targetDate={weddingDate} />
            <Gallery />
            <Location />
            <GiftRegistry />
            <RSVPForm />
            <WishesList />
            <Footer />           
            <FloatingNav />
            <MusicPlayer shouldPlay={isOpen} />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

