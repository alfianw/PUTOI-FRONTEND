import { Gauge, Wifi, Monitor, FlaskConical, GraduationCap, Wrench, Zap, Droplets } from "lucide-react";

export function ServicesSection() {
  const trainings = [
    {
      icon: Wifi,
      title: "Pelatihan SCADA IoT",
      desc: "Tingkatkan kompetensi dalam membangun sistem pengawasan dan kendali jarak jauh berbasis SCADA (Supervisory Control and Data Acquisition) yang terintegrasi dengan teknologi Internet of Things (IoT). Peserta akan mempelajari arsitektur SCADA modern, komunikasi sensor–gateway, dashboard real-time, hingga implementasi pada industri. Cocok bagi teknisi, engineer, dan instansi yang ingin mengadopsi otomasi berbasis IoT."
    },
    {
      icon: Monitor,
      title: "Pelatihan LabVIEW",
      desc: "Kuasai pemrograman grafis menggunakan NI LabVIEW untuk aplikasi otomasi, akuisisi data, kontrol instrumen, dan sistem monitoring real-time. Pelatihan dirancang praktis dengan modul latihan langsung menggunakan sensor, DAQ, serta pembuatan GUI profesional. Sangat sesuai untuk praktisi laboratorium, akademisi, dan industri yang membutuhkan solusi instrumentasi cerdas."
    },
    {
      icon: GraduationCap,
      title: "Pelatihan Kalibrasi dan Pengukuran",
      desc: "Pelatihan ini membekali peserta dengan kompetensi standar industri terkait kalibrasi alat ukur, teknik pengukuran yang benar, perhitungan ketidakpastian, serta dokumentasi sesuai standar ISO/IEC 17025. Dirancang untuk teknisi laboratorium, quality control, maupun industri yang membutuhkan akurasi dan keandalan alat ukur dalam proses produksi."
    }
  ];

  const services = [
    {
      icon: Gauge,
      title: "Jasa Kalibrasi Pressure",
      desc: "Layanan kalibrasi pressure (tekanan) untuk memastikan akurasi peralatan industri seperti pressure gauge, manometer, dan sensor tekanan. Proses kalibrasi dilakukan menggunakan standar terverifikasi dan prosedur sesuai ISO/IEC 17025, sehingga hasil pengukuran lebih presisi dan andal untuk kebutuhan operasional maupun audit kualitas.",
      color: "from-blue-900 to-blue-700"
    },
    {
      icon: Monitor,
      title: "Jasa Kalibrasi Transmitter",
      desc: "Kami menyediakan layanan kalibrasi untuk berbagai jenis transmitter—pressure, temperature, level, maupun flow. Kalibrasi dilakukan oleh teknisi berpengalaman dengan peralatan standar tinggi guna memastikan output sinyal transmitter tetap stabil, akurat, dan sesuai spesifikasi pabrik. Cocok untuk industri proses, otomasi, dan manufaktur.",
      color: "from-blue-800 to-blue-600"
    },
    {
      icon: Wrench,
      title: "Jasa System Integrator",
      desc: "Layanan integrasi sistem untuk menghubungkan perangkat, sensor, software, dan kontrol industri menjadi satu kesatuan yang efisien. Kami membantu desain, instalasi, hingga commissioning sistem otomasi, SCADA, IoT, dan instrumentasi sehingga proses operasional lebih cepat, aman, dan mudah dimonitor.",
      color: "from-blue-700 to-blue-500"
    },
    {
      icon: FlaskConical,
      title: "Jasa Sewa TUK",
      desc: "Menyediakan layanan penyewaan Tempat Uji Kompetensi (TUK) lengkap dengan fasilitas dan peralatan standar SKKNI untuk kebutuhan sertifikasi kompetensi. Cocok untuk lembaga pelatihan, institusi pendidikan, hingga industri yang membutuhkan sarana uji kompetensi tersertifikasi.",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: Zap,
      title: "Sewa Power Quality Analyzer",
      desc: "Layanan sewa Power Quality Analyzer (PQA) untuk kebutuhan pengukuran kualitas daya listrik, analisis harmonisa, arus, tegangan, dan gangguan pada sistem kelistrikan. Perangkat siap pakai, akurat, dan didukung panduan teknis sehingga dapat membantu audit energi, troubleshooting, maupun inspeksi instalasi.",
      color: "from-blue-500 to-blue-300"
    },
    {
      icon: Droplets,
      title: "Sewa Water Quality Analyzer",
      desc: "Layanan sewa Water Quality Analyzer untuk kebutuhan pengukuran kualitas air pada laboratorium, industri, instalasi pengolahan air, maupun penelitian. Perangkat mampu mengukur parameter penting seperti pH, konduktivitas, turbidity, DO (Dissolved Oxygen), dan suhu dengan akurasi tinggi. Tersedia paket harian hingga bulanan, lengkap dengan panduan penggunaan sehingga memudahkan proses monitoring dan analisis kualitas air secara cepat dan tepat.",
      color: "from-blue-400 to-blue-200"
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
          <h2 className="text-4xl mb-4 text-blue-900">Layanan Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Layanan pelatihan profesional dan jasa kalibrasi berkualitas tinggi
          </p>
        </div>

        {/* Pelatihan Section */}
        <div className="mb-20">
          <h3 className="text-3xl text-blue-900 mb-12 text-center">Pelatihan</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {trainings.map((training, index) => {
              const Icon = training.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-900 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white">
                    <Icon className="w-12 h-12 mb-4" />
                    <h4 className="text-xl">{training.title}</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed text-sm">{training.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Jasa Section */}
        <div>
          <h3 className="text-3xl text-blue-900 mb-12 text-center">Jasa</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-900 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${service.color} p-8 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h4 className="text-xl">{service.title}</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed text-sm mb-4">{service.desc}</p>
                    <a
                      href="https://wa.me/6285755450598?text=Halo%20saya%20ingin%20menanyakan%20tentang%20layanan%20kami"
                      className="inline-block text-blue-900 hover:text-blue-600 font-semibold transition-colors"
                    >
                      Hubungi Kami →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl mb-4">Tertarik dengan Layanan Kami?</h3>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami untuk informasi lebih lanjut mengenai pelatihan dan jasa
          </p>
          <a
            href="https://wa.me/6285755450598?text=Halo%20saya%20ingin%20menanyakan%20tentang%20Pelatihan%20dan%20Jasa"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
