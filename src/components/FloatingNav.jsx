import { Home, Image, Gift, Mail, BookOpen, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { href: '#hero', icon: <Home size={18} /> },
  { href: '#gallery', icon: <Image size={18} /> },
  { href: '#story', icon: <BookOpen size={18} />},
  { href: '#location', icon: <MapPin size={18} />},
  { href: '#gifts', icon: <Gift size={18} /> },
  { href: '#rsvp', icon: <Mail size={18} /> },
];

export default function FloatingNav({ dark, toggleDark }) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full px-4 py-2 shadow-lg"
    >
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="p-2 hover:text-pink-500"
        >
          {l.icon}
        </a>
      ))}
    </motion.nav>
  );
}