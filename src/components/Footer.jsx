import { motion } from 'framer-motion';

export default function Footer() {
  return (
    // Tambahkan id="page-footer" di sini
    <motion.footer 
      id="page-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: 0.5 }}
      // Tambahkan margin-bottom agar ada ruang di bawah
      className="relative isolate text-center py-10 px-4 mb-20"
    >
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-3xl mx-auto">
        <div className="text-stone-800">
            <p className="text-sm">
              © {new Date().getFullYear()} Poshie & Aji &bull;
            </p>
            <div className="border-t border-stone-400/50 my-3 max-w-xs mx-auto"></div>
            <p className="font-body text-xs">
              Dibuat oleh <a 
                href="https://wa.me/6282328837654" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-amber-800 hover:underline">
                  UndanganOnlineOmik
              </a>
            </p>
        </div>
      </div>
    </motion.footer>
  );
}

