import invitationBackground from '../../assets/3.png';

/**
 * Komponen ini berfungsi untuk menampilkan gambar latar belakang
 * secara statis (fixed) di belakang semua konten halaman.
 */
export default function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-50">
      {/* Gambar Latar */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${invitationBackground})` }} 
      />
      {/* Lapisan Overlay Gelap */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
}

