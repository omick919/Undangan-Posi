import { motion } from 'framer-motion';
// 1. Ganti path ini dengan foto bersama Anda.
// Pastikan foto sudah ada di folder 'src/assets/'.
import couplePhoto from '../../assets/2.jpeg'; // FOTO BERSAMA

export default function Verse() {
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
        delay: 0.4, // Teks akan muncul sedikit setelah foto
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
        whileInView="visible" // Animasi akan berjalan saat di-scroll ke bagian ini
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Kontainer untuk Foto dan Teks - UKURAN HAMPIR PENUH */}
        <div className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50">
          <img
            src={couplePhoto}
            alt="Poshie & Aji"
            className="w-full h-full object-cover"
          />

          {/* Kotak Teks di Atas Foto - TANPA BLUR */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-end p-8"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="font-body text-sm md:text-base italic leading-relaxed text-white [text-shadow:_1px_1px_3px_rgba(0,0,0,0.5)]">
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

