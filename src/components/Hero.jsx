import { motion } from 'framer-motion';
// 1. Path gambar latar belakang.

// 2. Ganti path ini dengan foto mempelai yang sebenarnya.
// Pastikan foto Anda ada di folder 'src/assets/'.
import bridePhoto from '../../assets/Foto Wanita.jpeg'; // FOTO MEMPELAI WANITA
import groomPhoto from '../../assets/Foto Pria.jpeg'; // FOTO MEMPELAI PRIA


export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.5,
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
      className="relative isolate min-h-screen flex items-center justify-center text-center py-20 px-4 overflow-hidden"
    >
      
      {/* Lapisan overlay */}
      <div className="absolute inset-0 -z-10 "></div>

      {/* Konten Utama sekarang dibungkus kotak transparan */}
      <motion.div 
        className="bg-white/25 backdrop-blur-md rounded-xl p-6 max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Konten di dalam kotak */}
        <div className="flex flex-col items-center text-stone-800">
          <motion.p variants={itemVariants} className="font-body text-lg">
            Bismillahirrahmanirrahim<br/>
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </motion.p>

          <motion.p variants={itemVariants} className="font-body text-sm mt-4 leading-relaxed">
            Maha Suci Allah, yang telah menciptakan mahluk-Nya berpasang-pasangan.
            Ya Allah perkenankanlah kami melangsungkan resepsi pernikahan putra-putri kami
          </motion.p>

          {/* Foto & Nama Mempelai Wanita */}
          <motion.div variants={itemVariants} className="my-5 flex flex-col items-center">
            <div className="w-32 h-40 rounded-[50%] overflow-hidden border-4 border-amber-800/50 shadow-lg mb-4">
              <img src={bridePhoto} alt="Desthari Pasaning Ratna Furi" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-amber-800 [text-shadow:_1px_1px_3px_rgba(0,0,0,0.2)]">
              Desthari Pasaning Ratna Furi, S.H
            </h1>
            <p className="font-body text-sm mt-2">
              Putri dari Bpk. Prieyo Soedarmanto & Ibu Emy Sulistyowati
            </p>
          </motion.div>
          
          <motion.p variants={itemVariants} className="font-script text-6xl my-1 text-stone-700">
            Dengan
          </motion.p>
          
          {/* Foto & Nama Mempelai Pria */}
          <motion.div variants={itemVariants} className="my-5 flex flex-col items-center">
             <div className="w-32 h-40 rounded-[50%] overflow-hidden border-4 border-amber-800/50 shadow-lg mb-4">
              <img src={groomPhoto} alt="Hikmah Prastyo Aji" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-amber-800 [text-shadow:_1px_1px_3px_rgba(0,0,0,0.2)]">
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
                <h3 className="font-bold tracking-wider">AKAD NIKAH</h3>
                <p>Pukul: 10.00 WIB</p>
              </div>
              <div className="w-1/3 border-x-2 border-stone-400 px-2">
                <p className="text-lg">MINGGU</p>
                <p className="text-6xl font-display leading-none">19</p>
                <p className="text-lg">OKTOBER 2025</p>
              </div>
              <div className="w-1/3">
                <h3 className="font-bold tracking-wider">RESEPSI</h3>
                <p>Pukul: 13.00 s/d 15.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="font-body my-4">
            <p className="font-bold text-lg">Gedung Korpri Pati</p>
            <p className="text-sm mt-1 max-w-xs mx-auto">
              Jl. Akpb Agil Kusumadya No. 17A, Ngarus, Kec. Pati, Kabupaten Pati, Jawa Tengah
            </p>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="font-script text-6xl mt-4 text-stone-700">
            Poshie & Aji
          </motion.h2>
        </div>
      </motion.div>
    </section>
  );
}

