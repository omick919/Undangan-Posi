import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 1 }}
      className="mt-12 py-4 text-center border-t border-white/10"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Aldi & Salma &bull; Dibuat dengan 💌
      </p>
    </motion.footer>
  );
}