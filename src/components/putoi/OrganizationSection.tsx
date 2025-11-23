import { Users, Award, Wrench, FlaskConical, Cog } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function OrganizationSection() {
  const struktur = [
    {
      icon: Award,
      title: "Penanggung Jawab",
      desc: "Ketua Jurusan Teknik Elektro PNJ",
      color: "from-blue-900 to-blue-700"
    },
    {
      icon: FlaskConical,
      title: "Kepala Laboratorium PUTOI",
      desc: "Dosen ahli bidang Water Treatment & Control System",
      color: "from-blue-800 to-blue-600"
    },
    {
      icon: Cog,
      title: "Koordinator Operasional",
      desc: "Teknisi senior berpengalaman dalam pengolahan air industri",
      color: "from-blue-700 to-blue-500"
    },
    {
      icon: FlaskConical,
      title: "Tim Peneliti & Pengembang",
      desc: "Dosen dan mahasiswa yang aktif dalam riset dan inovasi",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: Wrench,
      title: "Tim Layanan & Kalibrasi",
      desc: "Teknisi bersertifikat yang menangani pemeliharaan dan uji kualitas",
      color: "from-blue-500 to-blue-300"
    }
  ];

  return (
    <section id="organization" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm">Organisasi</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">Struktur & Kepemimpinan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PUTOI berada di bawah pengelolaan Jurusan Teknik Elektro, Politeknik Negeri Jakarta
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <p className="text-gray-700 mb-6 leading-relaxed">
              PUTOI berada di bawah pengelolaan Jurusan Teknik Elektro, Politeknik Negeri Jakarta, sebagai bagian dari <span className="text-blue-900">Center of Excellence</span> dalam bidang Instrumentasi, Kontrol, dan Teknologi Lingkungan.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Struktur organisasi dibentuk untuk menjamin kesinambungan fungsi edukasi, layanan industri, dan pengembangan riset terapan.
            </p>
            <div className="bg-blue-900 text-white rounded-xl p-6">
              <p className="leading-relaxed">
                Organisasi ini berjalan dengan prinsip <span className="font-semibold">Academic–Industrial Collaboration</span>, di mana kegiatan operasional dan layanan industri juga menjadi sarana pembelajaran berbasis proyek (Project-Based Learning) bagi mahasiswa vokasi.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1743385779347-1549dabf1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6YXRpb24lMjB0ZWFtJTIwc3RydWN0dXJlfGVufDF8fHx8MTc2MjE1ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Organization Structure"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Struktur Organisasi */}
        <div>
          <h3 className="text-2xl text-blue-900 mb-8 text-center">Struktur Organisasi Utama</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {struktur.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                    <Icon className="w-10 h-10 mb-3" />
                    <h4 className="text-xl mb-2">{item.title}</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
