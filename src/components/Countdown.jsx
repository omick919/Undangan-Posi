import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react'; // Impor ikon kalender

// Fungsi untuk membuat tautan Google Calendar
const createGoogleCalendarLink = () => {
  const title = encodeURIComponent('Pernikahan Poshie & Aji');
  // Waktu dalam format UTC (WIB adalah UTC+7)
  // 10:00 WIB = 03:00 UTC
  // 15:00 WIB = 08:00 UTC
  const startTime = '20251019T030000Z';
  const endTime = '20251019T080000Z';
  const details = encodeURIComponent('Acara pernikahan Poshie & Aji. Kehadiran Anda sangat berarti bagi kami.');
  const location = encodeURIComponent('Gedung Korpri Pati, Jl. Akpb Agil Kusumadya No. 17A, Ngarus, Pati, Jawa Tengah');
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
};

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const tick = () => {
      const diff = dayjs(targetDate).diff(dayjs(), 'second');
      if (diff <= 0) {
        setTimeLeft({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
        return;
      }
      setTimeLeft({
        Days: Math.floor(diff / 86400),
        Hours: Math.floor((diff % 86400) / 3600),
        Minutes: Math.floor((diff % 3600) / 60),
        Seconds: diff % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: 'easeOut' },
    }),
  };

  return (
    <section 
      id="countdown" 
      className="relative isolate py-20 px-4"
    >
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-lg max-w-4xl mx-auto text-center">
        <div className="text-stone-800">

          <motion.h2 
            className="font-title text-5xl md:text-6xl text-amber-800"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Menuju Hari Bahagia
          </motion.h2>

          <motion.p 
            className="font-body mt-2"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Pernikahan Poshie & Aji akan diselenggarakan pada:
          </motion.p>
          <motion.p 
            className="font-body text-lg font-bold mt-1"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Minggu, 19 Oktober 2025
          </motion.p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 my-8">
            {Object.entries(timeLeft).map(([unit, val], i) => (
              <motion.div
                key={unit}
                className="flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/20 rounded-2xl shadow-inner"
                custom={i} initial="hidden" whileInView="visible" viewport={{ once: false }} variants={itemVariants}
              >
                <div className="text-3xl md:text-5xl font-title tabular-nums">
                  {String(val).padStart(2, '0')}
                </div>
                <div className="font-body uppercase tracking-wider text-xs">{unit}</div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-800/80 text-white font-body text-sm rounded-full py-3 px-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-amber-700 hover:scale-105"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            <CalendarPlus size={18} />
            Simpan Tanggal
          </motion.a>

        </div>
      </div>
    </section>
  );
}
