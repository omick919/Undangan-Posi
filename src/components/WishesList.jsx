import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import Papa from 'papaparse';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXBD-livLAAdOiG5wiG7Pg-2umKaYEXpSK38ECpv0NHTh4LtDDkvIl8Uc14CQqKB2v4crEr5JEKsk1/pub?output=csv';

// ... WishSkeleton, WishAvatar, usePausableInterval, shuffleArray ...
// (Tidak ada perubahan di bagian ini, Anda bisa biarkan seperti sebelumnya)
const WishSkeleton = () => (
    <div className="bg-white/20 backdrop-blur-md rounded-lg p-5 shadow w-full animate-pulse">
        <div className="h-4 bg-slate-300/50 rounded w-1/3 mb-4"></div>
        <div className="h-3 bg-slate-300/50 rounded w-full mb-2"></div>
        <div className="h-3 bg-slate-300/50 rounded w-5/6"></div>
    </div>
);

const WishAvatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    return (
        <div className="w-10 h-10 rounded-full bg-amber-200/50 flex items-center justify-center text-amber-800 font-bold text-xl flex-shrink-0">
            {initial}
        </div>
    );
};

const usePausableInterval = (callback, delay) => {
    const savedCallback = useRef();
    const intervalId = useRef(null);
    useEffect(() => { savedCallback.current = callback; }, [callback]);
    const resume = () => {
        if (intervalId.current) return;
        intervalId.current = setInterval(() => savedCallback.current(), delay);
    };
    const pause = () => {
        clearInterval(intervalId.current);
        intervalId.current = null;
    };
    useEffect(() => {
        resume();
        return pause;
    }, [delay]);
    return { pause, resume };
};

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};


export default function WishesList() {
    // ... Seluruh bagian state dan logika useEffect tetap sama ...
    const [wishes, setWishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentWishIndex, setCurrentWishIndex] = useState(0);
    const DURATION = 6000;
    useEffect(() => {
        const fetchWishes = async () => {
            try {
                const fetchUrl = `${GOOGLE_SHEET_CSV_URL}&t=${new Date().getTime()}`;
                const response = await fetch(fetchUrl);
                if (!response.ok) throw new Error('Gagal mengambil data ucapan.');
                const csvText = await response.text();
                const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true });
                const filteredWishes = parsedData.data.map(row => ({
                    nama: row.Nama || 'Seorang Sahabat',
                    ucapan: row.Ucapan || '',
                })).filter(wish => wish.ucapan && wish.ucapan.trim() !== '');
                setWishes(shuffleArray(filteredWishes));
            } catch (err) { setError(err.message); } finally { setIsLoading(false); }
        };
        fetchWishes();
    }, []);
    const { pause, resume } = usePausableInterval(() => {
        if (wishes.length > 0) {
            setCurrentWishIndex(prevIndex => (prevIndex + 1) % wishes.length);
        }
    }, DURATION);
    const currentWish = wishes[currentWishIndex];
    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0.5 } }
    };
    const textLetterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    // ✅ BARU: Varian animasi untuk judul & subjudul agar konsisten
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* ✅ DIUBAH: Menerapkan varian animasi yang konsisten */}
                <motion.h2 
                    className="font-title text-5xl md:text-6xl text-amber-800"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={itemVariants}
                >
                    Ucapan & Doa
                </motion.h2>

                {/* ✅ DIUBAH: Menerapkan varian animasi yang konsisten */}
                <motion.p 
                    className="font-body mt-2 mb-8 max-w-md mx-auto" // DIUBAH: mb-12 menjadi mb-8
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={itemVariants}
                >
                    Doa dan restu dari Anda adalah hadiah terindah bagi kami.
                </motion.p>
                
                <div 
                    className="w-full relative h-56 md:h-48" // DIHAPUS: mt-8 karena p sudah punya mb-8
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                >
                    {isLoading ? (
                        <WishSkeleton />
                    ) : error ? (
                        <div className="text-center p-8 text-red-600">Terjadi kesalahan: {error}</div>
                    ) : wishes.length > 0 ? (
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentWishIndex}
                                // ... sisa animasi kartu tetap sama ...
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 text-left shadow-lg relative overflow-hidden h-full flex flex-col">
                                    <Quote className="absolute -top-2 -right-2 text-amber-200/30" size={80} />
                                    <div className="flex items-center gap-4 mb-3">
                                        <WishAvatar name={currentWish.nama} />
                                        <p className="font-body font-bold text-amber-900 text-lg">{currentWish.nama}</p>
                                    </div>
                                    <motion.p 
                                        className="font-body text-stone-700 text-sm md:text-base flex-grow"
                                        variants={textContainerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {currentWish.ucapan.split('').map((char, index) => (
                                            <motion.span key={index} variants={textLetterVariants}>
                                                {char}
                                            </motion.span>
                                        ))}
                                    </motion.p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                        <motion.div 
                                            key={`progress-${currentWishIndex}`}
                                            className="h-full bg-amber-700/70"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: DURATION / 1000, ease: 'linear' }}
                                            style={{ transformOrigin: 'left' }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <p className="font-body text-stone-600 pt-8">Jadilah yang pertama memberikan ucapan & doa!</p>
                    )}
                </div>
            </div>
        </section>
    );
}