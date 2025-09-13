import { Home, Image, Gift, Mail, BookOpen, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Daftar tautan untuk navigasi
const links = [
  { href: '#hero', icon: <Home size={18} />, label: 'Home' },
  { href: '#story', icon: <BookOpen size={18} />, label: 'Story'},
  { href: '#gallery', icon: <Image size={18} />, label: 'Gallery' },
  { href: '#location', icon: <MapPin size={18} />, label: 'Location'},
  { href: '#gifts', icon: <Gift size={18} />, label: 'Gifts' },
];

export default function FloatingNav() {
  return (
    <motion.nav
      // Animasi muncul dari bawah
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      // Posisi di tengah bawah layar
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
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

