import { Building2, GraduationCap, Landmark, Handshake } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function PartnersSection() {
  const akademik = [
    "Politeknik Negeri Jakarta – Jurusan Teknik Elektro"
  ];

  const industri = [
    {
      name: "PT Juara Teknologi Elok",
      desc: "Pengembangan sistem otomasi industri dan integrasi data berbasis IoT."
    },
    {
      name: "PT Yokogawa Indonesia",
      desc: "Penyedia solusi instrumentasi dan kontrol industri berskala global."
    },
    {
      name: "PT Nutech Integrasi",
      desc: "Integrator otomasi dan SCADA industri."
    }
  ];

  const pemerintah = [
    "Program Hibah Kompetisi Pengembangan Mutu Pendidikan Politeknik (PHK-PMPP) Polytechnic Education Development Project (PEDP) ADB Loan 2928-INO",
    "Program Revitalisasi Perguruan Tinggi Negeri Vokasi (PR-PTNV) Tahun 2025"
  ];

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <Handshake className="w-4 h-4" />
            <span className="text-sm">Kemitraan</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">Mitra Kerjasama Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PUTOI-TIK menjalin kemitraan strategis dengan berbagai pihak, baik dari dunia pendidikan, industri, maupun lembaga pemerintah. Kolaborasi ini memastikan keberlanjutan inovasi dan peningkatan mutu layanan.
          </p>
          <div className="mt-4 pt-4 grid grid-cols-2 md:grid-cols-2 gap-8 items-center justify-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <ImageWithFallback src="/src/assets/kerjasama/logo-nutech.png" alt="Nutech" className="h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center">
              <ImageWithFallback src="/src/assets/kerjasama/logo-yokogawa.png" alt="Yokogawa" className="h-20 w-auto object-contain" />
            </div>
            {/* Tambahkan logo lain di sini jika ada */}
          </div>
        </div>

        {/* Footer Message */}
        {/* <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-8 text-white text-center">
          <p className="text-lg leading-relaxed">
            Kolaborasi ini menjadikan PUTOI-TIK sebagai <span className="font-semibold">hub sinergi</span> antara akademisi, industri, dan masyarakat, mendukung agenda nasional <span className="font-semibold">Sustainable Development Goals (SDG) 6 – Clean Water and Sanitation</span>.
          </p>
        </div> */}
      </div>
    </section>
  );
}
