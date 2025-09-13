import { useState } from 'react';
import { motion } from 'framer-motion';

// Impor gambar yang akan digunakan
import coupleImage from '../../assets/1.jpeg';

export default function RSVPForm() {
  const [data, setData] = useState({ name: '', attendance: 'yes', message: '' });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: integrate EmailJS / Supabase / custom API
    console.log('RSVP data', data);
    
    // Simulasi pengiriman data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSent(true);
  };

  return (
    // 1. Ganti background section dengan gambar
    <section 
      id="rsvp" 
      className="relative bg-cover bg-center py-20 md:py-28"
      style={{ backgroundImage: `url(${coupleImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div> {/* Overlay gelap */}
      
      <div className="relative container mx-auto px-4 text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-display mb-10 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)]"
        >
          Konfirmasi Kehadiran
        </motion.h2>

        {sent ? (
          // 4. Pesan sukses dibuat lebih menonjol
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto p-8 text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          >
            <p className="text-xl">Terima kasih, konfirmasi Anda telah kami terima! 💌</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto grid gap-6"
          >
            {/* 2. Styling input form "Glassmorphism" */}
            <input
              required
              type="text"
              placeholder="Nama lengkap Anda"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-gray-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 backdrop-blur-sm"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <select
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white focus:border-pink-300 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 backdrop-blur-sm [&>option]:text-gray-800"
              value={data.attendance}
              onChange={(e) => setData({ ...data, attendance: e.target.value })}
            >
              <option value="yes">Insya Allah, saya akan hadir</option>
              <option value="no">Maaf, saya tidak bisa hadir</option>
            </select>
            <textarea
              rows="4"
              placeholder="Tuliskan ucapan dan doa terbaik Anda..."
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-gray-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 backdrop-blur-sm"
              onChange={(e) => setData({ ...data, message: e.target.value })}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg text-white font-bold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}