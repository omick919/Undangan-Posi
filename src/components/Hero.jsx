import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Impor semua foto yang ingin Anda tampilkan.
// Pastikan Anda menempatkan foto-foto ini di dalam folder 'src/assets/'.
import bridePhoto1 from '../../assets/Foto Wanita.jpeg';
import bridePhoto2 from '../../assets/9.jpeg'; // GANTI DENGAN FOTO KEDUA MEMPELAI WANITA
import groomPhoto1 from '../../assets/Foto Pria.jpeg';
import groomPhoto2 from '../../assets/8.jpeg'; // GANTI DENGAN FOTO KEDUA MEMPELAI PRIA

// 2. Kelompokkan foto-foto ke dalam array
const brideImages = [bridePhoto1, bridePhoto2];
const groomImages = [groomPhoto1, groomPhoto2];

// 3. Komponen kecil untuk slideshow
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Ganti gambar setiap 4 detik

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-32 h-40 rounded-[50%] overflow-hidden border-4 border-amber-800/50 shadow-lg mb-4">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Foto mempelai"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
  };

  return (
    <section 
      id="hero" 
      className="relative isolate min-h-screen flex items-center justify-center text-center py-20 px-4"
    >
      <motion.div 
        className="bg-white/25 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="flex flex-col items-center text-stone-800">
          <motion.p variants={itemVariants} className="font-title text-4xl">
            Bismillahirrahmanirrahim<br/>
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </motion.p>

          <motion.p variants={itemVariants} className="font-body text-sm mt-4 leading-relaxed">
            Maha Suci Allah, yang telah menciptakan mahluk-Nya berpasang-pasangan.
            Ya Allah perkenankanlah kami melangsungkan resepsi pernikahan putra-putri kami.
          </motion.p>

          {/* Foto & Nama Mempelai Wanita */}
          <motion.div variants={itemVariants} className="my-5 flex flex-col items-center">
            {/* 4. Gunakan komponen ImageSlider di sini */}
            <ImageSlider images={brideImages} />
            <h1 className="font-title text-5xl md:text-6xl tracking-wide text-amber-800 [text-shadow:_1px_1px_3px_rgba(0,0,0,0.2)]">
              Desthari Pasaning Ratna Furi, S.H
            </h1>
            <p className="font-body text-sm mt-2">
              Putri dari Bpk. Prieyo Soedarmanto & Ibu Emy Sulistyowati
            </p>
          </motion.div>
          
          <motion.p variants={itemVariants} className="font-title text-5xl my-1 text-stone-700">
            Dengan
          </motion.p>
          
          {/* Foto & Nama Mempelai Pria */}
          <motion.div variants={itemVariants} className="my-5 flex flex-col items-center">
            {/* 5. Gunakan komponen ImageSlider di sini juga */}
            <ImageSlider images={groomImages} />
            <h1 className="font-title text-5xl md:text-6xl tracking-wide text-amber-800 [text-shadow:_1px_1px_3px_rgba(0,0,0,0.2)]">
              Hikmah Prastyo Aji, S.H
            </h1>
            <p className="font-body text-sm mt-2">
              Putra dari Bpk. Ponco Raharjo & Ibu Ruswati
            </p>
          </motion.div>

          {/* Detail Acara */}
          <motion.div variants={itemVariants} className="font-body my-4 w-full">
            <p className="text-sm">Akad Nikah & Resepsi akan dilaksanakan pada:</p>
            <div className="flex justify-around items-center border-y-2 border-stone-400 py-4 mt-4 max-w-lg mx-auto">
              <div className="w-1/3">
                <h3 className="font-bold tracking-wider">Akad Nikah</h3>
                <p>Pukul: 10.00 WIB</p>
              </div>
              <div className="w-1/3 border-x-2 border-stone-400 px-2">
                <p className="text-lg">Minggu</p>
                <p className="font-title text-7xl leading-none">19</p>
                <p className="text-lg">Oktober 2025</p>
              </div>
              <div className="w-1/3">
                <h3 className="font-bold tracking-wider">Resepsi</h3>
                <p>Pukul: 13.00 s/d 15.00</p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

