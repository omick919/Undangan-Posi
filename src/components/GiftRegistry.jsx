import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Wallet, Copy, Check } from 'lucide-react';

// Data hadiah/rekening
const gifts = [
  {
    name: 'BCA',
    number: '0980997413',
    holder: 'Desthari Pasaning Ratna Furi',
    icon: <Landmark className="w-8 h-8 text-stone-700" />,
  },
  {
    name: 'BRI',
    number: '006601069102504',
    holder: 'Desthari Pasaning Ratna Furi',
    icon: <Landmark className="w-8 h-8 text-stone-700" />,
  },
  {
    name: 'Gopay',
    number: '0895376357705',
    holder: 'Desthari Pasaning Ratna Furi',
    icon: <Wallet className="w-8 h-8 text-stone-700" />,
  },
];

export default function GiftRegistry() {
  const [copiedNumber, setCopiedNumber] = useState('');

  const handleCopy = (numberToCopy) => {
    navigator.clipboard.writeText(numberToCopy);
    setCopiedNumber(numberToCopy);
    setTimeout(() => {
      setCopiedNumber('');
    }, 2000); // Reset status setelah 2 detik
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
    <section id="gifts" className="relative isolate py-20 px-4">
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-lg max-w-2xl mx-auto text-center">
        <div className="text-stone-800">

          <motion.h2 
            className="font-title text-5xl md:text-6xl text-amber-800"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Hadiah Pernikahan
          </motion.h2>

          <motion.p 
            className="font-body mt-4 max-w-xl mx-auto"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami telah menyediakan beberapa cara di bawah ini.
          </motion.p>
          
          <motion.div 
            className="mt-8 space-y-4"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={itemVariants}
          >
            {gifts.map((gift) => (
              <div
                key={gift.name}
                className="bg-white/20 p-4 rounded-lg shadow-inner flex items-center gap-4 text-left"
              >
                <div className="flex-shrink-0">{gift.icon}</div>
                <div className="flex-grow">
                  <p className="font-body font-bold text-lg">{gift.name}</p>
                  <p className="font-mono tracking-wider text-stone-700">{gift.number}</p>
                  <p className="font-body text-xs text-stone-600">a/n {gift.holder}</p>
                </div>
                <button
                  onClick={() => handleCopy(gift.number)}
                  className="flex-shrink-0 flex items-center gap-2 text-xs font-body border border-stone-400/50 rounded-full px-3 py-1.5 hover:bg-white/20 transition-colors"
                >
                  {copiedNumber === gift.number ? (
                    <>
                      <Check size={14} className="text-green-600" />
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
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

