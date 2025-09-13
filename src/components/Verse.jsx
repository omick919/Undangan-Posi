import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Impor semua gambar yang ingin Anda tampilkan di slideshow.
// Pastikan semua gambar ada di folder 'src/assets/'.
import couplePhoto1 from '../../assets/Foto Cincin.jpeg';
import couplePhoto2 from '../../assets/1.jpeg'; // Ganti dengan foto Anda
import couplePhoto3 from '../../assets/2.jpeg';
import couplePhoto4 from '../../assets/3.jpeg';
import couplePhoto5 from '../../assets/4.jpeg';
import couplePhoto6 from '../../assets/5.jpeg';
import couplePhoto7 from '../../assets/6.jpeg';
 // Ganti dengan foto Anda

const slideImages = [couplePhoto1, couplePhoto2, couplePhoto3, couplePhoto4, couplePhoto5, couplePhoto6, couplePhoto7];

export default function Verse() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Efek untuk mengganti gambar setiap beberapa detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearTimeout(timer); // Bersihkan timer
  }, [currentImageIndex]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="verse"
      className="min-h-screen flex items-center justify-center text-center py-10 px-4 md:px-8"
    >
      <motion.div
        className="flex flex-col items-center w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Kontainer untuk Foto Slideshow */}
        <div className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50">
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={slideImages[currentImageIndex]}
              alt="Poshie & Aji"
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          {/* Kotak Teks di Atas Foto */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-8 md:p-12"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="font-body text-base md:text-lg italic leading-relaxed text-white [text-shadow:_2px_2px_5px_rgba(0,0,0,0.7)]">
              <p>
                "Dan di antara tanda-tanda kekuasaan-Nya, ialah Dia menciptakan
                untukmu isteri-isteri dari jenismu sendiri, supaya kamu
                cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya
                diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian
                itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
              </p>
              <p className="mt-4 font-semibold not-italic">(QS. Ar-Rum: 21)</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

