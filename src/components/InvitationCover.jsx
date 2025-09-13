import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import opening2 from '../../assets/Opening2.png';


// Anda bisa mengganti nama mempelai di sini
const brideName = "Poshie";
const groomName = "Aji";

export default function InvitationCover({ isOpen, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Fungsi yang dipanggil saat tombol di klik
  const handleOpenClick = () => {
    setIsFadingOut(true); // 1. Mulai fade out teks & tombol

    // 2. Setelah teks mulai hilang, buka gerbangnya
    setTimeout(() => {
      onOpen(); // Memberitahu App.jsx untuk memulai musik, dll.
      setIsOpening(true);
    }, 500); // Durasi ini harus cocok dengan durasi transisi opacity di bawah
  };

  // 3. Setelah animasi gerbang selesai, sembunyikan seluruh komponen
  useEffect(() => {
    if (isOpening) {
      setTimeout(() => {
        setIsHidden(true);
      }, 1500); // Sesuaikan dengan durasi transisi transform di bawah
    }
  }, [isOpening]);

  // Style untuk kedua panel agar menggunakan satu gambar yang sama
  const panelStyle = (position) => ({
    backgroundImage: opening2, // Ganti dengan gambar latar Anda
    // Perbaikan: Buat lebar gambar 2x lipat dari panel, 
    // dan tinggi otomatis untuk menjaga rasio aspek (tidak gepeng).
    backgroundSize: '200% auto', 
    backgroundPosition: position, // Posisikan 'left' atau 'right'
    backgroundRepeat: 'no-repeat',
  });

  return (
    <div className={isHidden ? 'hidden' : 'fixed inset-0 z-50 flex overflow-hidden'}>
      {/* Panel Kiri */}
      <div
        className={`w-1/2 bg-cover transition-transform duration-[1500ms] ease-in-out ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={panelStyle('left center')}
      ></div>

      {/* Panel Kanan */}
      <div
        className={`w-1/2 bg-cover transition-transform duration-[1500ms] ease-in-out ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={panelStyle('right center')}
      ></div>

      {/* Konten di Tengah (Tombol & Teks) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-500 ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Lapisan gradien gelap untuk keterbacaan */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
           <p className="font-body text-base md:text-lg tracking-widest uppercase">
              The Wedding Of
            </p>
            <h1 className="font-display text-6xl md:text-8xl my-4 text-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.8)]">
              {brideName} & {groomName}
            </h1>
            <button
              onClick={handleOpenClick}
              className="mt-6 font-body text-sm tracking-widest bg-red-800/80 text-white rounded-full py-3 px-10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-red-700 hover:scale-105"
            >
              Buka Undangan
            </button>
        </div>
      </div>
    </div>
  );
}

