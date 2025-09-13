import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import bgMusic from '../../assets/bg-music2.mp3';

export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Efek ini akan menyinkronkan state `isPlaying` dengan kondisi audio yang sebenarnya
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Tambahkan event listener ke elemen audio
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Bersihkan listener saat komponen tidak lagi digunakan
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []); // Dijalankan hanya sekali saat komponen pertama kali dimuat

  // Efek ini akan menangani perintah autoplay dari App.jsx
  useEffect(() => {
    const audio = audioRef.current;
    // Jika ada perintah putar, audio sudah siap, dan sedang di-pause...
    if (shouldPlay && audio && audio.paused) {
      // ...maka putar musiknya.
      audio.play().catch(error => {
        // Gagal autoplay biasanya karena kebijakan browser, ini normal.
        console.error("Autoplay failed:", error);
      });
    }
  }, [shouldPlay]); // Dijalankan saat `shouldPlay` berubah

  // Fungsi untuk tombol klik manual dari pengguna
  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        // Menangani error jika pemutaran manual juga gagal
        console.error("Manual play failed:", error);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />
      <button
        onClick={handleToggle}
        aria-label="Toggle music"
        className="fixed bottom-24 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-stone-700 shadow-lg transition-transform hover:scale-110"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}

