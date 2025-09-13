import React, { useState, useEffect } from 'react';

// Impor komponen baru
import StaticBackground from './components/StaticBackground';

// Impor semua komponen halaman Anda
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

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Target tanggal dan waktu untuk hitung mundur (Tahun-Bulan-TanggalTJam:Menit:Detik)
  const weddingDate = "2025-10-19T10:00:00";

  return (
    <>
      {/* Latar belakang statis dirender di sini, di belakang segalanya */}
      <StaticBackground />
      
      <InvitationCover isOpen={isOpen} onOpen={handleOpenInvitation} />
      
      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <Verse />
        <Hero />
        <Story />
        <Gallery />
        <Location />
        {/* Di sini kita teruskan target tanggal ke komponen Countdown */}
        <Countdown target={weddingDate} />
        <Footer />
        {isOpen && <FloatingNav />}
      </main>
    </>
  );
}

export default App;

