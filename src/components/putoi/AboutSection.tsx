import { Droplet, Target, Briefcase, FlaskConical, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutSection() {
  const technologies = [
    "Sand Filter – Menghilangkan kekeruhan dan partikel kasar",
    "Carbon Filter – Menyerap bau dan bahan organik",
    "Water Softener – Mengurangi kandungan kapur (hardness)",
    "Reverse Osmosis System (RO) – Menghilangkan hingga 95% total padatan terlarut (TDS)",
    "Ozone Reactor – Membunuh bakteri dan menyegarkan air",
    "Ultraviolet Sterilizer – Tahap akhir disinfeksi untuk memastikan air aman diminum"
  ];

  const keunggulan = [
    "Menggunakan standar industrial grade equipment",
    "Dilengkapi instrumentasi monitoring otomatis (IoT ready)",
    "Terintegrasi dengan sistem pelatihan dan sertifikasi",
    "Mendukung kegiatan penelitian terapan dan komersialisasi produk",
    "Menyediakan layanan masyarakat & jasa industri air bersih"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <Droplet className="w-4 h-4" />
            <span className="text-sm">Tentang Kami</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">PUTOI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Polytechnic Utility Treatment of Industrial Water
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1615797534094-7fde0a4861f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMHBsYW50JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjIwOTA1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="PUTOI Water Treatment Plant"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              PUTOI (Polytechnic Utility Treatment of Industrial Water) merupakan Water Treatment Plant berstandar industri yang dimiliki oleh Jurusan Teknik Elektro – Politeknik Negeri Jakarta (PNJ).
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Didirikan sebagai bagian dari upaya modernisasi fasilitas pembelajaran dan layanan industri, PUTOI berfungsi sebagai pusat pelatihan, riset, jasa kalibrasi, dan produksi air minum dalam kemasan yang mengedepankan kualitas, inovasi, dan keberlanjutan lingkungan.
            </p>
            <p className="text-gray-700 leading-relaxed">
              PUTOI dirancang dengan sistem pengolahan Reverse Osmosis (RO), filtrasi multi-tahap otomatis, serta teknologi ozonisasi dan ultraviolet (UV) untuk menghasilkan air murni berkualitas tinggi sesuai dengan Permenkes No. 492/MENKES/PER/IV/2010.
            </p>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl">Visi</h3>
            </div>
            <p className="leading-relaxed">
              Menjadi pusat unggulan nasional dalam bidang pengolahan air industri dan lingkungan, yang mendukung pendidikan vokasi, penelitian terapan, dan layanan profesional menuju industri hijau berkelanjutan.
            </p>
          </div>

          <div className="bg-white border-2 border-blue-900 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-900 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl text-blue-900">Misi</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Mengembangkan fasilitas water treatment berteknologi tinggi untuk pelatihan dan sertifikasi</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Menyediakan layanan kalibrasi dan pengujian kualitas air sesuai standar industri</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Menghasilkan produk air minum dalam kemasan yang aman, higienis, dan berstandar nasional</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Mendukung kolaborasi riset antara akademisi, industri, dan pemerintah</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Meningkatkan kompetensi mahasiswa melalui hands-on project dan problem-based learning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Fasilitas Teknologi */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
              <FlaskConical className="w-4 h-4" />
              <span className="text-sm">Teknologi</span>
            </div>
            <h3 className="text-3xl text-blue-900 mb-4">Fasilitas Teknologi</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              PUTOI dilengkapi dengan sistem pengolahan air berlapis menggunakan teknologi terkini
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-900 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg mt-1">
                    <Droplet className="w-5 h-5 text-blue-900" />
                  </div>
                  <p className="text-gray-700 flex-1">{tech}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
            <p className="text-gray-700">
              Semua sistem dikontrol secara otomatis dengan sensor tekanan, pH, dan TDS, menjadikan PUTOI sebagai fasilitas pembelajaran berbasis <span className="text-blue-900">smart water management system</span>.
            </p>
          </div>
        </div>

        {/* Keunggulan PUTOI */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl text-blue-900 mb-4">Keunggulan PUTOI</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keunggulan.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
