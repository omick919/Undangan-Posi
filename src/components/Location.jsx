import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Location() {
  // Tautan untuk Google Maps
  const gmapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.2008190004544!2d111.03155657482093!3d-6.745343893251014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70d3ad5bf58b67%3A0x256472e33348a875!2sKORPRI%20Building%20Pati!5e0!3m2!1sen!2sid!4v1757748687417!5m2!1sen!2sid";
  const gmapsShareLink = "https://maps.app.goo.gl/2WcDg5sx5PML68FFA";

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="location" className="relative isolate py-20 px-4">
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-lg max-w-5xl mx-auto text-center">
        <div className="text-stone-800">

          <motion.h2 
            className="font-title text-5xl md:text-6xl text-amber-800"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Lokasi Acara
          </motion.h2>

          <motion.div 
            className="mt-8 flex flex-col md:flex-row gap-8 items-center"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={itemVariants}
          >
            {/* Kolom Kiri: Informasi Teks */}
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="font-title text-4xl">
                Gedung Korpri Pati
              </h3>
              <p className="font-body mt-2 text-stone-700">
                Jl. AKBP Agil Kusumadya No. 17A, Ngarus, Kec. Pati, Kab. Pati, Jawa Tengah
              </p>
              <a
                href={gmapsShareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-amber-800/80 text-white font-body text-sm rounded-full py-3 px-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-amber-700 hover:scale-105"
              >
                <MapPin size={18} />
                Buka Peta
              </a>
            </div>

            {/* Kolom Kanan: Peta */}
            <div className="w-full md:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-white/50">
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
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

