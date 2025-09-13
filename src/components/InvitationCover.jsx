import React, { useState, useEffect } from 'react';

// Anda bisa mengganti nama mempelai di sini
const brideName = "Poshie";
const groomName = "Aji";

export default function InvitationCover({ isOpen, onOpen }) {
  // State untuk menangani fade out teks sebelum gerbang terbuka
  const [isFadingOut, setIsFadingOut] = useState(false);
  // State untuk menyembunyikan komponen setelah animasi selesai
  const [isHidden, setIsHidden] = useState(false);

  const handleOpenClick = () => {
    setIsFadingOut(true); // Mulai animasi fade-out untuk teks

    // Tunggu animasi fade-out selesai (500ms), baru buka gerbang
    setTimeout(() => {
      onOpen(); // Panggil fungsi onOpen dari parent (App.jsx)
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      // Tunggu animasi gerbang terbuka selesai (1000ms), lalu sembunyikan komponen
      // agar tidak menghalangi interaksi dengan konten utama
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
    }
  }, [isOpen]);

  // Gunakan kelas 'hidden' jika isHidden true, jika tidak, tampilkan sebagai 'fixed'
  const containerClass = isHidden ? 'hidden' : 'fixed inset-0 z-50 flex overflow-hidden';

  // Style untuk kedua panel agar menggunakan satu gambar yang sama
  const panelStyle = (position) => ({
    backgroundImage: "url('/assets/Opening.png')", // Gunakan SATU gambar Anda di sini
    backgroundSize: '200% 100%', // Buat gambar 2x lebih lebar dari panelnya
    backgroundPosition: position, // Posisikan 'left' atau 'right'
  });

  return (
    <div className={containerClass}>
      {/* Panel Kiri */}
      <div
        className={`w-1/2 bg-gray-800 transition-transform duration-1000 ease-in-out ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={panelStyle('left center')}
      ></div>

      {/* Panel Kanan */}
      <div
        className={`w-1/2 bg-gray-800 transition-transform duration-1000 ease-in-out ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={panelStyle('right center')}
      ></div>

      {/* Konten di Tengah (Tombol & Teks) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-500 ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-serif text-lg mb-2">The Wedding Of</p>
        <h1 className="font-['Amiri'] text-5xl md:text-7xl font-bold mb-8 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
          {brideName} & {groomName}
        </h1>
        <button
          onClick={handleOpenClick}
          className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

