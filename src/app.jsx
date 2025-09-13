import { useEffect, useState } from 'react';
import InvitationCover from './components/InvitationCover';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import RSVPForm from './components/RSVPForm';
import Gallery from './components/Gallery';
import GiftRegistry from './components/GiftRegistry';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';
import MusicToggle from './components/MusicToggle';
import Location from './components/Location';
import Story from './components/Story';
import Verse from './components/Verse';

// 1. Impor file musik sebagai modul
import bgMusic from '../assets/bg-music.mp3'; // <-- INI YANG BENAR

export default function App() {
   const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  // Efek untuk mengontrol scroll pada body
  useEffect(() => {
    // Jika undangan belum dibuka, sembunyikan scrollbar
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // Jika sudah dibuka, kembalikan scrollbar
      document.body.style.overflow = 'auto';
    }

    // Cleanup function untuk memastikan overflow kembali normal jika komponen di-unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // dark-mode auto according to system
  const [dark, setDark] = useState(
    window.matchMedia('(prefers-color-scheme: light)').matches,
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <>
      <InvitationCover isOpen={isOpen} onOpen={handleOpenInvitation} />
      <FloatingNav dark={dark} toggleDark={() => setDark(!dark)} />
      
      {/* 2. Gunakan variabel yang sudah diimpor sebagai src */}
      <MusicToggle src={bgMusic} />

      <main className="font-sans selection:bg-pink-300/40 {`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}" >
        <Verse />
        <Hero />
        <Story />
        <Countdown target="2025-10-19T10:00:00" />
        <Location />
        <Gallery />
        <GiftRegistry />
      </main>

      <Footer />
    </>
  );
}