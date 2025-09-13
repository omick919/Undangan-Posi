import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';


export default function Countdown({ target }) {
  const [left, setLeft] = useState({});

  useEffect(() => {
    const tick = () => {
      const diff = dayjs(target).diff(dayjs(), 'second');
      setLeft({
        Days: Math.max(0, Math.floor(diff / 86400)),
        Hours: Math.max(0, Math.floor((diff % 86400) / 3600)),
        Minutes: Math.max(0, Math.floor((diff % 3600) / 60)),
        Seconds: Math.max(0, diff % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section 
      id="countdown" 
      className="relative bg-cover bg-center py-20 md:py-28"
    >
     
      <div className="relative container mx-auto px-4 text-center text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center text-4xl md:text-5xl font-display mb-10 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)]"
        >
          Menuju Hari Bahagia
        </motion.h2>

        {/* 1. Tambahkan flex-wrap dan sesuaikan gap agar bisa pindah baris */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 font-mono">
          {Object.entries(left).map(([unit, val], i) => (
            <motion.div
              key={unit}
              // 2. Buat ukuran lebih kecil untuk mobile, dan besar untuk desktop (md:)
              className="flex flex-col items-center justify-center w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
            >
              {/* 3. Sesuaikan ukuran font untuk mobile dan desktop */}
              <div className="text-3xl md:text-6xl font-bold tabular-nums">
                {String(val).padStart(2, '0')}
              </div>
              <div className="uppercase tracking-wider text-xs">{unit}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}