import { motion } from 'framer-motion';
import { FaInstagram, FaMale, FaFemale } from 'react-icons/fa';

// Ganti nama file foto jika perlu
import groomImage from '../../assets/8.jpeg';
import brideImage from '../../assets/9.jpeg';

// Data untuk timeline cerita
const storyData = [
  { date: 'Awal Mula', title: 'Pertemuan Pertama', description: 'Masa kecil mempertemukan kami di satu kompleks sekolah. Meski berbeda SD, takdir sudah diam-diam menyiapkan kisah indah ini.' },
  { date: 'Masa SMA', title: 'Bertemu Kembali', description: 'Di SMA, semesta menghadirkan kami lagi. Senyum sederhana kala itu tumbuh menjadi rasa yang tak terhapuskan.' },
  { date: '12 April 2014', title: 'Awal Kisah Cinta', description: 'Hari itu menjadi saksi ketika kami sepakat untuk saling menggenggam hati. Dari sinilah perjalanan cinta kami benar-benar dimulai.' },
  { date: '18 Juni 2025', title: 'Tunangan Bahagia', description: 'Dengan penuh syukur, kami melangkah ke tahap baru. Janji suci pertunangan menjadi pengikat kuat untuk menatap masa depan bersama.' },
  { date: '19 Oktober 2025', title: 'Hari Pernikahan', description: 'Hari yang dinanti tiba. Di hadapan keluarga dan sahabat, kami akan merajut janji abadi dan memulai babak baru sebagai suami istri.' },
];

// Data untuk profil mempelai
const profilesData = [
  { name: 'Hikmah Prastyo Aji, S.H', image: groomImage, description: 'Putra dari Bpk. H. Ponco Raharjo & Ibu Hj. Ruswati', instagram: 'https://instagram.com/ajiprasetyaa', icon: <FaMale /> },
  { name: 'Desthari Pasaning Ratna Furi, S.H', image: brideImage, description: 'Putri dari Bpk. Prieyo Soedarmanto & Ibu Emy Sulistyowati', instagram: 'https://instagram.com/poshierf', icon: <FaFemale /> },
];

export default function Story() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="story" className="relative isolate py-20 px-4">
      <div className="bg-white/25 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-lg max-w-4xl mx-auto">
        
        {/* === Bagian Perjalanan Cinta === */}
        <div className="text-center mb-12">
          <motion.h2 
            className="font-title text-5xl md:text-6xl text-amber-800"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Perjalanan Cinta Kami
          </motion.h2>
        </div>

        <div className="space-y-8">
          {storyData.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
            >
              <p className="font-body font-semibold text-amber-800">{item.date}</p>
              <h3 className="font-title text-4xl text-stone-800 mt-1">{item.title}</h3>
              <p className="font-body text-stone-700 mt-2 max-w-md">{item.description}</p>
              {/* Tambahkan pemisah dekoratif kecuali untuk item terakhir */}
              {index < storyData.length - 1 && (
                <div className="w-20 h-px bg-stone-400/50 my-6"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* === Bagian Profil Mempelai === */}
        <div className="text-center mt-20 mb-12">
          <motion.h2 
            className="font-title text-5xl md:text-6xl text-amber-800"
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
          >
            Mempelai
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {profilesData.map((profile, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center"
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={itemVariants}
            >
              <img src={profile.image} alt={profile.name} className="w-40 h-40 object-cover rounded-full border-4 border-white/80 shadow-md mb-4"/>
              <div className="flex items-center gap-2 text-stone-800">
                <h3 className="font-title text-4xl">{profile.name}</h3>
              </div>
              <p className="font-body text-stone-700 mt-2 text-sm">{profile.description}</p>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 text-amber-800/80 hover:text-amber-800 transition-colors">
                <FaInstagram className="text-3xl" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

