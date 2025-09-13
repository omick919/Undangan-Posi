import { motion } from 'framer-motion';


export default function Location() {
  const gmapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63372.39713624174!2d107.50955575820309!3d-6.917502799999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e608cfa0c18d%3A0xbe7da28b948823b!2sSudirman%20Grand%20Ballroom!5e0!3m2!1sen!2sid!4v1751078481421!5m2!1sen!2sid";
  const gmapsShareLink = "https://maps.app.goo.gl/k1hJvBgQcTjgmFyA7";

  return (
    // 1. Tambahkan background gambar pada section utama
    <section 
      id="location" 
      className="relative bg-cover bg-center py-20 md:py-28"
    >

      <div className="relative container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-5xl font-display text-gray-800 dark:text-white mb-12 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.3)]"
        >
          Lokasi Acara
        </motion.h2>

        {/* 2. Container utama untuk peta dan kartu info, dibuat 'relative' */}
        <motion.div 
          className="relative max-w-5xl mx-auto aspect-video rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 3. Kartu Info dengan posisi absolut di layar besar */}
          <div className="absolute top-0 left-0 z-10 p-6 md:p-8 w-full h-full md:w-1/3 md:h-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg flex flex-col justify-center">
            <h3 className="text-2xl font-bold font-display text-gray-800 dark:text-white">
              Sudirman Grand Ballroom
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Jl. Jend. Sudirman No. 620, Dungus Cariang, Kec. Andir, Kota Bandung, Jawa Barat 40183
            </p>
            <a
              href={gmapsShareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 w-full text-center px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Buka Peta
            </a>
          </div>

          {/* 4. iFrame peta sekarang memenuhi sisa ruang */}
          <iframe
            src={gmapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Acara"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}