import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Efek untuk menyinkronkan state isPlaying dengan kondisi audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Efek untuk menangani error (tidak ada perubahan)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onErr = () => {
      const map = {1:'aborted',2:'network',3:'decode',4:'src not supported'};
      console.error('Audio error:', map[a.error?.code], 'currentSrc=', a.currentSrc);
    };
    a.addEventListener('error', onErr);
    return () => a.removeEventListener('error', onErr);
  }, []);
  
  // Efek untuk mengatur waktu mulai ke 5 detik (dengan perbaikan)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // ✅ PERBAIKAN PENTING: Handler ini sekarang akan menghapus dirinya sendiri setelah dijalankan
    const setStartTimeOnce = () => {
      audio.currentTime = 5.5;
      // Hapus listener agar tidak berjalan lagi saat buffering ulang
      audio.removeEventListener('canplay', setStartTimeOnce);
    };
    
    audio.addEventListener('canplay', setStartTimeOnce);

    return () => {
      // Cleanup jika komponen unmount sebelum 'canplay' terpicu
      audio.removeEventListener('canplay', setStartTimeOnce);
    };
  }, []);

  // Mengontrol play/pause menggunakan prop `shouldPlay`
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      // play() mungkin gagal karena kebijakan autoplay, error akan muncul di console
      audio.play().catch(error => {
        console.warn("Autoplay was prevented:", error.message);
        // Biarkan audio dalam keadaan siap, pengguna bisa memulainya dengan klik
      });
    } else {
      audio.pause();
    }
  }, [shouldPlay]);

  // Fungsi untuk tombol klik manual (ini menjadi sangat penting)
  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Klik pertama oleh pengguna akan "memberi izin" browser untuk memutar suara
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Manual play failed:", error);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/11.mp3?v=4"
        loop
        preload="auto"
        playsInline
      />
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