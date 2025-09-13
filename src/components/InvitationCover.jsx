import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Anda bisa mengganti nama mempelai di sini
const brideName = "Poshie";
const groomName = "Aji";

export default function InvitationCover({ onOpen }) {
  const [isVisible, setIsVisible] = useState(true);

  // Fungsi yang dipanggil saat tombol di klik
  const handleOpenClick = () => {
    onOpen(); // Memberitahu App.jsx untuk memulai musik
    setIsVisible(false); // Memulai animasi keluar
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/assets/10.png?v=2')" }} // Pastikan gambar ada di public/assets
          initial={{ opacity: 1 }}
          // PERUBAHAN: Animasi keluar diubah menjadi bergerak ke atas (tirai)
          exit={{ y: '-100%' }} 
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} // Menggunakan easing yang lebih halus
        >
          {/* Lapisan gradien gelap untuk keterbacaan */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Konten di Tengah (Tombol & Teks) dengan animasi masuk */}
          <motion.div
            className="relative z-10 flex flex-col items-center text-center p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <p className="font-body text-base md:text-lg tracking-widest uppercase">
              The Wedding Of
            </p>
            <h1 className="font-title text-6xl md:text-8xl my-4 text-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.8)]">
              {brideName} & {groomName}
            </h1>
            <button
              onClick={handleOpenClick}
              // PERUBAHAN: Warna tombol diubah menjadi merah
              className="mt-6 font-body text-sm tracking-widest bg-red-800/80 text-white rounded-full py-3 px-10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-red-700 hover:scale-105"
            >
              Buka Undangan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

