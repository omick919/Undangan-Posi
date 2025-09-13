import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';

// Impor gambar-gambar galeri Anda.
// Pastikan semua gambar ada di folder 'src/assets/'.
import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import img4 from '../../assets/4.jpeg';
import img5 from '../../assets/5.jpeg';
import img6 from '../../assets/6.jpeg';
import img7 from '../../assets/Foto Cincin.jpeg';

// Daftar gambar yang akan ditampilkan
const images = [img1, img2, img3, img4, img5, img6, img7];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="gallery" className="relative isolate py-20 px-4">
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-lg max-w-5xl mx-auto">
        
        <motion.h2 
          className="font-title text-5xl md:text-6xl text-amber-800 text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={itemVariants}
        >
          Galeri Cinta
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <motion.div
              key={src}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => setActiveImage(src)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img
                src={src}
                alt={`Galeri foto ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="text-white w-12 h-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox (Layar Penuh untuk Zoom Gambar) */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.button 
              className="absolute top-5 right-5 z-50 text-white bg-white/10 rounded-full p-2"
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setActiveImage(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.img
              src={activeImage}
              alt="Tampilan diperbesar"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

