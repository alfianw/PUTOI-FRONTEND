import { Gauge, Wifi, Monitor, FlaskConical, GraduationCap } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: Gauge,
      title: "Kalibrasi Pressure",
      desc: "Layanan kalibrasi alat ukur tekanan dengan standar industri untuk memastikan akurasi pengukuran",
      color: "from-blue-900 to-blue-700"
    },
    {
      icon: Monitor,
      title: "Kalibrasi Transmitter",
      desc: "Kalibrasi transmitter instrumentasi untuk berbagai parameter pengukuran industri",
      color: "from-blue-800 to-blue-600"
    },
    {
      icon: Wifi,
      title: "Pelatihan SCADA IoT",
      desc: "Pelatihan sistem kontrol dan monitoring industri berbasis IoT dan teknologi terkini",
      color: "from-blue-700 to-blue-500"
    },
    {
      icon: FlaskConical,
      title: "Pelatihan LabVIEW",
      desc: "Pelatihan instrumentasi dan sistem kontrol menggunakan platform LabVIEW",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: GraduationCap,
      title: "Pelatihan Kalibrasi dan Pengukuran",
      desc: "Program pelatihan komprehensif untuk kalibrasi dan teknik pengukuran standar industri",
      color: "from-blue-500 to-blue-300"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">Layanan Kami</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">Pelatihan dan Jasa</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Layanan pelatihan profesional dan jasa kalibrasi berkualitas tinggi
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-900 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${service.color} p-8 text-white transform group-hover:scale-105 transition-transform`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl mb-4">Tertarik dengan Layanan Kami?</h3>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami untuk informasi lebih lanjut mengenai pelatihan dan jasa kalibrasi
          </p>
          <a
            href="https://wa.me/6285755450598?text=Halo%20saya%20ingin%20menanyakan%20tentang%20Pelatihan%20dan%20Jasa"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
