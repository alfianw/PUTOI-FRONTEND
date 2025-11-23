import { MapPin, Mail, Phone, Globe, Building2 } from "lucide-react";

export function ContactSection() {
  const contactInfo = [
    {
      icon: Building2,
      title: "Lokasi",
      content: "Jurusan Teknik Elektro, Politeknik Negeri Jakarta\nJl. Prof. Dr. G.A. Siwabessy, Kampus Baru UI, Depok 16425"
    },
    {
      icon: Mail,
      title: "Email",
      content: "putoi@pnj.ac.id"
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "(021) 7270036"
    },
    {
      icon: Globe,
      title: "Website",
      content: "putoi.pnj.ac.id"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Hubungi Kami</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang layanan dan produk PUTOI
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-900 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 p-3 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-blue-900 mb-2">{info.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{info.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 text-center">
          <MapPin className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h3 className="text-2xl text-blue-900 mb-4">Kunjungi Kami</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            PUTOI berlokasi di Jurusan Teknik Elektro, Politeknik Negeri Jakarta, di area Kampus Baru UI Depok. Kami siap melayani kebutuhan pelatihan, kalibrasi, dan produk air minum berkualitas.
          </p>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <p className="text-blue-900 mb-2">PUTOI – Water Treatment Plant PNJ</p>
            <p className="text-gray-600 text-sm">Politeknik Negeri Jakarta</p>
            <p className="text-gray-600 text-sm">Jl. Prof. Dr. G.A. Siwabessy, Kampus Baru UI, Depok 16425</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl mb-4">Siap Berkolaborasi?</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Kami terbuka untuk kerjasama dalam bidang pelatihan, riset, pengembangan teknologi water treatment, dan penyediaan air minum berkualitas.
          </p>
          <a
            href="mailto:putoi@pnj.ac.id"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Kirim Email
          </a>
        </div>
      </div>
    </section>
  );
}
