import { motion } from 'framer-motion';
// Menggunakan background dan foto yang sama dengan Hero
import invitationBackground from '../../assets/3.png'; 
import bridePhoto from '../../assets/Foto Wanita.jpeg';
import groomPhoto from '../../assets/Foto Pria.jpeg';

export default function Verse() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
  };

  return (
    <section 
      id="verse" 
      className="relative isolate min-h-screen flex items-center justify-center text-center py-20 px-4 overflow-hidden"
    >
      {/* Latar Belakang & Overlay (Sama seperti Hero) */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center" 
        style={{ backgroundImage: `url(${invitationBackground})` }} 
      />
      <div className="absolute inset-0 -z-10 bg-black/20"></div>

      {/* Konten Utama */}
      <motion.div 
        className="flex flex-col items-center max-w-3xl"
        initial="hidden"
        whileInView="visible" // Animasi akan berjalan saat di-scroll ke bagian ini
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Foto Berdampingan */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="w-40 h-56 rounded-xl overflow-hidden border-4 border-white/50 shadow-lg mx-auto">
            <img src={bridePhoto} alt="Mempelai Wanita" className="w-full h-full object-cover" />
          </div>
          <div className="w-40 h-56 rounded-xl overflow-hidden border-4 border-white/50 shadow-lg mx-auto">
            <img src={groomPhoto} alt="Mempelai Pria" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        
        {/* Kotak putih transparan untuk ayat */}
        <motion.div 
          variants={itemVariants} 
          className="bg-white/25 backdrop-blur-md rounded-xl p-8 shadow-lg"
        >
          <div className="font-body text-sm italic leading-relaxed text-stone-700">
            <p>Dan di antara tanda-tanda kekuasaan-Nya, ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri,</p>
            <p>supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu</p>
            <p>rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat</p>
            <p>tanda-tanda bagi kaum yang berfikir.</p>
            <p className="mt-2">(QS. Arrum, 21)</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

