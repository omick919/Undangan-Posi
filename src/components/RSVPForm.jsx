import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function RSVPForm() {
  // --- PENTING: Ganti nilai di bawah ini dengan App ID & Access Key Anda dari AppSheet ---
  const APP_ID = "ebb17aa1-bf07-4b98-9495-7350fe1a4141";
  const ACCESS_KEY = "V2-a4Wrr-jSA32-hZxwN-7eMLe-C158Q-hARJN-edHcy-YLThR";
  const TABLE_NAME = "RSVP-POSI"; // Ganti jika nama tabel/sheet Anda berbeda
  // --------------------------------------------------------------------

  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: 'Hadir',
    jumlahTamu: 1,
    ucapan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama) {
      alert('Nama wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // AppSheet API memerlukan format body yang spesifik
    const bodyPayload = {
      Action: "Add",
      Properties: {},
      Rows: [
        {
          ...formData,
          timestamp: new Date().toISOString(),
          // Pastikan jumlahTamu dikirim sebagai angka jika diperlukan
          jumlahTamu: formData.kehadiran === 'Hadir' ? Number(formData.jumlahTamu) : null,
        }
      ]
    };

    try {
      const response = await fetch(
        `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ApplicationAccessKey': ACCESS_KEY
          },
          body: JSON.stringify(bodyPayload)
        }
      );

      if (!response.ok) {
        // Jika server merespons dengan error, lemparkan error tersebut
        const errorData = await response.json();
        throw new Error(errorData.Message || 'Gagal mengirim data ke AppSheet.');
      }

      console.log('Success!', await response.json());
      setSubmitStatus('success');
      setFormData({ nama: '', kehadiran: 'Hadir', jumlahTamu: 1, ucapan: '' });

    } catch (error) {
      console.error('Error!', error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="rsvp" className="relative isolate py-20 px-4">
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-lg max-w-2xl mx-auto text-center">
        <div className="text-stone-800">

          <motion.h2 
            className="font-title text-5xl md:text-6xl text-amber-800"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Konfirmasi Kehadiran
          </motion.h2>

          <motion.p 
            className="font-body mt-2 mb-8 max-w-md mx-auto"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Kami akan sangat berbahagia jika Anda dapat memberikan konfirmasi kehadiran Anda.
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="font-body space-y-4 text-left"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={itemVariants}
          >
            {/* Input Nama */}
            <div>
              <label htmlFor="nama" className="block font-body text-sm font-medium">Nama Anda</label>
              <input type="text" name="nama" id="nama" required value={formData.nama} onChange={handleChange} className="mt-1 block w-full bg-white/50 border-stone-400/50 rounded-md shadow-sm focus:ring-amber-800 focus:border-amber-800 px-3 py-2" />
            </div>

            {/* Pilihan Kehadiran */}
            <div>
              <label className="block font-body text-sm font-medium">Konfirmasi Kehadiran</label>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="kehadiran" value="Hadir" checked={formData.kehadiran === 'Hadir'} onChange={handleChange} className="text-amber-800 focus:ring-amber-800" />
                  <span className="ml-2 font-body">Ya, saya akan hadir</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="kehadiran" value="Tidak Hadir" checked={formData.kehadiran === 'Tidak Hadir'} onChange={handleChange} className="text-amber-800 focus:ring-amber-800" />
                  <span className="ml-2 font-body">Maaf, tidak bisa hadir</span>
                </label>
              </div>
            </div>

            {/* Jumlah Tamu (jika hadir) */}
            {formData.kehadiran === 'Hadir' && (
              <div>
                <label htmlFor="jumlahTamu" className="block font-body text-sm font-medium">Jumlah Tamu (termasuk Anda)</label>
                <input type="number" name="jumlahTamu" id="jumlahTamu" min="1" max="2" value={formData.jumlahTamu} onChange={handleChange} className="mt-1 block w-full bg-white/50 border-stone-400/50 rounded-md shadow-sm focus:ring-amber-800 focus:border-amber-800 px-3 py-2" />
              </div>
            )}

            {/* Ucapan & Doa */}
            <div>
              <label htmlFor="ucapan" className="block font-body text-sm font-medium">Ucapan & Doa</label>
              <textarea name="ucapan" id="ucapan" rows="4" value={formData.ucapan} onChange={handleChange} className="mt-1 block w-full bg-white/50 border-stone-400/50 rounded-md shadow-sm focus:ring-amber-800 focus:border-amber-800 px-3 py-2"></textarea>
            </div>

            {/* Tombol Kirim */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-800/80 text-white font-body text-sm rounded-full py-3 px-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-amber-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Mengirim...</> : <><Send size={18} /> Kirim Konfirmasi</>}
              </button>
            </div>

            {/* Pesan Status Pengiriman */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-md text-sm mt-4">
                <CheckCircle size={18} />
                <span>Terima kasih! Konfirmasi Anda telah berhasil dikirim.</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-100 text-red-800 rounded-md text-sm mt-4">
                <AlertTriangle size={18} />
                <span>Oops! Terjadi kesalahan. Silakan coba lagi.</span>
              </div>
            )}
          </motion.form>

        </div>
      </div>
    </section>
  );
}

