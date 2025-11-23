import { Building2, GraduationCap, Landmark, Handshake } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function PartnersSection() {
  const akademik = [
    "Politeknik Negeri Jakarta – Jurusan Teknik Elektro",
    "Universitas Indonesia"
  ];

  const industri = [
    {
      name: "PT Juara Teknologi Elok",
      desc: "Pengembangan sistem otomasi industri dan integrasi data berbasis IoT"
    },
    {
      name: "PT Yokogawa Indonesia",
      desc: "Penyedia solusi instrumentasi dan kontrol industri berskala global"
    },
    {
      name: "PT Halia",
      desc: "Pengembangan sistem monitoring air dan teknologi lingkungan berkelanjutan"
    },
    {
      name: "PT Nutech Integrasi",
      desc: "Integrator otomasi dan SCADA industri"
    }
  ];

  const pemerintah = [
    "Program Matching Fund & Kampus Merdeka – Kolaborasi riset dan inovasi energi bersih"
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
          <h2 className="text-4xl mb-4 text-blue-900">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kolaborasi strategis untuk memastikan keberlanjutan inovasi dan peningkatan mutu layanan
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758599543157-bc1a94fec33c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0bmVyc2hpcCUyMGJ1c2luZXNzJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc2MjEzMDY5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Partnership"
            className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
          />
        </div>

        {/* Kemitraan Akademik */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-900 p-3 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-blue-900">Kemitraan Akademik</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {akademik.map((partner, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kemitraan Industri */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-900 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-blue-900">Kemitraan Industri</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {industri.map((partner, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-900 hover:shadow-lg transition-all"
              >
                <h4 className="text-lg text-blue-900 mb-3">{partner.name}</h4>
                <p className="text-gray-600">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kemitraan Pemerintah & Komunitas */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-900 p-3 rounded-lg">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-blue-900">Kemitraan Pemerintah & Komunitas</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pemerintah.map((partner, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-8 text-white text-center">
          <p className="text-lg leading-relaxed">
            Kolaborasi ini menjadikan PUTOI sebagai <span className="font-semibold">hub sinergi</span> antara akademisi, industri, dan masyarakat, mendukung agenda nasional <span className="font-semibold">Sustainable Development Goals (SDG) 6 – Clean Water and Sanitation</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
