import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Impor ikon dari lucide-react (yang sudah Anda pakai di Navigasi)
import { ZoomIn, X } from 'lucide-react';

// Impor gambar-gambar galeri Anda
import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import img4 from '../../assets/4.jpeg';
import img5 from '../../assets/5.jpeg';
import img6 from '../../assets/6.jpeg'; // Menambah 1 gambar agar pas di grid 3 kolom

const images = [img1, img2, img3, img4, img5, img6];

// Impor gambar untuk background

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    // 1. Ganti background section
    <section 
      id="gallery" 
      className="relative bg-cover bg-center py-20 md:py-28"
    >

      <div className="relative container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center text-4xl md:text-5xl font-display text-gray-800 dark:text-white mb-12 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.3)]"
        >
          Galeri Cinta
        </motion.h2>

        <div className="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((src, index) => (
            // 2. Bungkus gambar dengan div untuk efek hover
            <motion.div
              key={src}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group"
              onClick={() => setActive(src)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img
                src={src}
                alt="Love story"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay dan Ikon Zoom saat hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="text-white w-12 h-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Lightbox disempurnakan dengan tombol Close dan animasi baru */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            {/* Tombol Close */}
            <motion.button 
              className="absolute top-5 right-5 z-50 text-white bg-white/10 rounded-full p-2"
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.img
              src={active}
              alt="Large view"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              // 4. Animasi dibuat lebih "memegas" (spring)
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Mencegah lightbox tertutup saat gambar diklik
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}