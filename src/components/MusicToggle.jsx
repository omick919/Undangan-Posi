import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Buat fungsi baru untuk menangani logika play/pause
  const handleToggle = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      // .play() mengembalikan Promise
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Pemutaran berhasil
            setPlaying(true);
          })
          .catch(error => {
            // Pemutaran gagal (misalnya diblokir browser)
            console.error("Audio playback failed:", error);
            setPlaying(false);
          });
      }
    }
  };

  return (
    <>
      {/* Pastikan audio tag dirender */}
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        onClick={handleToggle} // Panggil fungsi handleToggle saat di-klik
        aria-label="Toggle music"
        className="fixed bottom-6 right-6 z-40 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur p-3 shadow-lg"
      >
        {/* Ikon berubah berdasarkan state 'playing' */}
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}