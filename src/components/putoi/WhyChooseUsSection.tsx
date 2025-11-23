import { Factory, GraduationCap, Award, Leaf, CheckCircle2 } from "lucide-react";

export function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Factory,
      title: "Industrial Grade Facility",
      desc: "PUTOI bukan sekadar laboratorium akademik — seluruh peralatan menggunakan standar industri (Ebara, Grundfos, Pentair, VIQUA) yang digunakan di instalasi profesional.",
      gradient: "from-blue-900 to-blue-700"
    },
    {
      icon: GraduationCap,
      title: "Integrated Training Ecosystem",
      desc: "Fasilitas ini terhubung langsung dengan sistem pelatihan, sertifikasi, dan pembelajaran digital berbasis IoT dan otomasi kontrol — memastikan mahasiswa dan industri dapat belajar langsung dari proses nyata.",
      gradient: "from-blue-800 to-blue-600"
    },
    {
      icon: Award,
      title: "Quality Assurance & Standardization",
      desc: "Sistem operasional mengacu pada standar Permenkes No. 492/2010 (Kualitas Air Minum), ISO 9001:2015 (Manajemen Mutu), dan SNI 01-3553-2015 (Air Minum Dalam Kemasan).",
      gradient: "from-blue-700 to-blue-500"
    },
    {
      icon: Leaf,
      title: "Sustainable and Smart Water System",
      desc: "PUTOI mengintegrasikan teknologi sensor, data logger, dan sistem monitoring real-time, menjadikannya model Smart Water Plant untuk edukasi dan riset lingkungan berkelanjutan.",
      gradient: "from-blue-600 to-blue-400"
    }
  ];

  const standards = [
    "Permenkes No. 492/2010 (Kualitas Air Minum)",
    "ISO 9001:2015 (Manajemen Mutu)",
    "SNI 01-3553-2015 (Air Minum Dalam Kemasan)"
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">Keunggulan</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mengapa PUTOI menjadi pilihan terbaik untuk kebutuhan water treatment dan pelatihan industri
          </p>
        </div>

        {/* Main Reasons */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${reason.gradient} p-8 text-white`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl mb-3">{reason.title}</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Standards Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-8">
            <Award className="w-12 h-12 text-blue-900 mx-auto mb-4" />
            <h3 className="text-2xl text-blue-900 mb-4">Standar Kualitas Internasional</h3>
            <p className="text-gray-600">
              PUTOI beroperasi dengan mengacu pada standar kualitas nasional dan internasional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {standards.map((standard, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-6 text-center hover:border-blue-900 transition-colors"
              >
                <CheckCircle2 className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                <p className="text-gray-700">{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
