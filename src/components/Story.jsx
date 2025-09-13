import { motion } from 'framer-motion';
import { FaInstagram, FaMale, FaFemale } from 'react-icons/fa';

import coupleImage from '../../assets/1.jpeg';
import groomImage from '../../assets/Foto Pria.jpeg';
import brideImage from '../../assets/Foto Wanita.jpeg';

// Data untuk timeline cerita (tidak berubah)
const storyData = [
    { date: '14 Februari 2021', title: 'Pertama Bertemu', description: 'Kami pertama kali bertemu di sebuah acara komunitas dan langsung merasa ada kecocokan.' },
    { date: '10 Oktober 2021', title: 'Hubungan Dimulai', description: 'Setelah beberapa bulan saling mengenal, kami memutuskan untuk memulai perjalanan cinta kami bersama.' },
    { date: '25 Desember 2024', title: 'Lamaran Romantis', description: 'Di bawah langit senja, Aldi melamar Salma dan memulai babak baru dalam hidup kami.' },
    { date: '17 Agustus 2025', title: 'Hari Pernikahan', description: 'Kami akan mengikat janji suci dan merayakannya bersama orang-orang terkasih.' },
];

// Data untuk profil mempelai (tidak berubah)
const profilesData = [
  { name: 'Aldi Pratama', icon: <FaMale className="text-2xl text-blue-500" />, image: groomImage, description: 'Putra dari Bapak John Doe & Ibu Jane Doe. Aldi adalah seorang software engineer yang hobi bersepeda dan fotografi.', instagram: 'https://instagram.com/aldi' },
  { name: 'Salma Putri', icon: <FaFemale className="text-2xl text-pink-500" />, image: brideImage, description: 'Putri dari Bapak Michael Smith & Ibu Sarah Smith. Salma adalah seorang desainer grafis yang mencintai seni dan traveling.', instagram: 'https://instagram.com/salma' },
];

export default function Story() {
  return (
    // 1. Tambahkan style untuk background & 'relative' pada section utama
    <section 
      id="story" 
      className="relative py-20 md:py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${coupleImage})` }}
    >
      {/* 2. Tambahkan div overlay semi-transparan untuk readability */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm"></div>

      {/* 3. Tambahkan 'relative' pada container konten agar berada di atas overlay */}
      <div className="container mx-auto px-4 relative">
        
        {/* === Bagian Our Story === */}
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-display text-gray-800 dark:text-white">
            Perjalanan Cinta Kami
          </motion.h2>
        </div>
<div className="relative max-w-2xl mx-auto">
  {/* Garis vertikal tetap sama */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-pink-200 dark:bg-gray-600"></div>
  
  {storyData.map((item, index) => (
    <motion.div
      key={index}
      className="relative mb-12" // Sedikit tambah margin bottom
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
    >
      {/* Lingkaran nomor sekarang diposisikan ABSOLUT di tengah */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center size-8 rounded-full bg-pink-500 text-white shadow">
        {index + 1}
      </div>
      <div
        className={`w-5/12 p-4 bg-gray-50/70 dark:bg-gray-700/70 backdrop-blur-md rounded-lg shadow-md
          ${index % 2 === 0 ? 'mr-auto text-right' : 'ml-auto text-left'}`
        }
      >
        <p className="text-sm font-semibold text-pink-500 dark:text-pink-400">{item.date}</p>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{item.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
      </div>
    </motion.div>
  ))}
</div>

        {/* 4. Parallax separator dihapus karena fungsinya sudah digantikan oleh background utama section */}

        {/* === Bagian Profil Mempelai === */}
        <div className="text-center mt-28 mb-16">
          <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-display text-gray-800 dark:text-white">
            Mempelai
          </motion.h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {profilesData.map((profile, index) => (
            <motion.div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50/70 dark:bg-gray-700/70 backdrop-blur-md rounded-2xl shadow-lg" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }}>
              <img src={profile.image} alt={profile.name} className="w-40 h-40 object-cover rounded-full border-4 border-white dark:border-gray-600 shadow-md mb-4"/>
              <div className="flex items-center gap-2">
                {profile.icon}
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{profile.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{profile.description}</p>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 text-pink-500 hover:text-pink-600 transition-colors">
                <FaInstagram className="text-3xl" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}