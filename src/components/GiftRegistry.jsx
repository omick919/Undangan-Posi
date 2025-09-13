import { useState } from 'react';
import { motion } from 'framer-motion';

// Impor ikon dari lucide-react
import { Landmark, Wallet, Copy, Check } from 'lucide-react';

// Impor gambar untuk background
import coupleImage from '../../assets/1.jpeg';

// Data hadiah/rekening
const gifts = [
  {
    name: 'BCA',
    number: '0980997413', // Hilangkan tanda hubung agar mudah disalin
    holder: 'Desthari Pasaning Ratna Furi',
    icon: <Landmark className="w-8 h-8 text-blue-300" />,
  },{
    name: 'BRI',
    number: '006601069102504', // Hilangkan tanda hubung agar mudah disalin
    holder: 'Desthari Pasaning Ratna Furi',
    icon: <Landmark className="w-8 h-8 text-blue-300" />,
  },
  {
    name: 'Gopay',
    number: '0895376357705',
    holder: 'Desthari Pasaning Ratna Furi ',
    icon: <Wallet className="w-8 h-8 text-blue-400" />,
  },
];

export default function GiftRegistry() {
  // State untuk melacak nomor mana yang baru saja disalin
  const [copied, setCopied] = useState('');

  const handleCopy = (numberToCopy) => {
    navigator.clipboard.writeText(numberToCopy);
    setCopied(numberToCopy);
    // Setelah 2 detik, hilangkan status "copied"
    setTimeout(() => {
      setCopied('');
    }, 2000);
  };

  return (
    // 1. Ganti background section
    <section 
      id="gifts" 
      className="relative bg-cover bg-center py-20 md:py-28"
      style={{ backgroundImage: `url(${coupleImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative container mx-auto px-4 text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center text-4xl md:text-5xl font-display mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)]"
        >
          Hadiah Kasih
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami telah menyediakan beberapa cara di bawah ini.
        </motion.p>

        <div className="mx-auto max-w-lg space-y-4">
          {gifts.map((gift, index) => (
            // 2. Ubah tombol menjadi kartu "kaca"
            <motion.div
              key={gift.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                {gift.icon}
                <div className="flex-grow">
                  <div className="font-bold text-lg">{gift.name}</div>
                  <div className="font-mono tracking-widest text-base">{gift.number}</div>
                  <div className="text-sm text-gray-300">a/n {gift.holder}</div>
                </div>
                <button
                  onClick={() => handleCopy(gift.number)}
                  className="flex items-center gap-2 text-xs border border-white/30 rounded-full px-3 py-1.5 hover:bg-white/20 transition-colors"
                >
                  {/* 3. Tampilkan feedback saat disalin */}
                  {copied === gift.number ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      Disalin!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Salin
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}