import React, { useState, useEffect } from 'react';
import { Home, Image, Gift, Mail, BookOpen, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Daftar tautan untuk navigasi (disesuaikan agar lengkap)
const links = [
  { href: '#hero', icon: <Home size={18} />, label: 'Home' },
  { href: '#story', icon: <BookOpen size={18} />, label: 'Story'},
  { href: '#gallery', icon: <Image size={18} />, label: 'Gallery' },
  { href: '#location', icon: <MapPin size={18} />, label: 'Location'},
  { href: '#rsvp', icon: <Mail size={18} />, label: 'RSVP' },
];

export default function FloatingNav() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Cari elemen footer di dalam dokumen
    const footer = document.querySelector('#page-footer');
    if (!footer) return;

    // Buat observer untuk mendeteksi kapan footer masuk ke layar
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika footer terlihat, sembunyikan navigasi. Jika tidak, tampilkan.
        setIsHidden(entry.isIntersecting);
      },
      // Atur agar observer aktif saat footer mulai terlihat
      { threshold: 0.1 }
    );

    // Mulai mengamati footer
    observer.observe(footer);

    // Bersihkan observer saat komponen tidak lagi digunakan
    return () => observer.unobserve(footer);
  }, []);

  return (
    <motion.nav
      // Animasi muncul dari bawah dan menghilang ke bawah
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isHidden ? 100 : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // Posisi di tengah bawah layar - Menggunakan metode centering yang lebih robust
      className="fixed bottom-6 inset-x-0 w-max mx-auto z-50 
                 flex items-center gap-2 
                 bg-white/25 backdrop-blur-md rounded-full p-2 shadow-lg
                 border border-white/30"
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-label={link.label}
          className="w-10 h-10 rounded-full flex items-center justify-center
                     text-stone-700 hover:bg-white/20 hover:text-amber-800 
                     transition-all duration-300"
        >
          {link.icon}
        </a>
      ))}
    </motion.nav>
  );
}

