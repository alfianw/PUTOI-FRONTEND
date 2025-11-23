import { Droplet, Package, Cylinder } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ProductsSection() {
  const products = [
    {
      icon: Package,
      title: "Air Minum Kemasan 600 ml",
      desc: "Air minum dalam kemasan 600 ml merupakan varian utama produksi PUTOI. Dikemas dengan desain ergonomis dan higienis, cocok untuk aktivitas harian, rapat, pelatihan, maupun kegiatan kampus.",
      image: "https://images.unsplash.com/photo-1683533893978-70a5a6f613e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYyMTUyODAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-900 to-blue-700"
    },
    {
      icon: Package,
      title: "Air Minum Kemasan 300 ml",
      desc: "Air minum 300 ml dirancang untuk kebutuhan kegiatan formal, seminar, dan pertemuan skala besar. Kemasan praktis dan ekonomis menjadikannya pilihan ideal untuk instansi maupun acara kampus.",
      image: "https://images.unsplash.com/photo-1683533893978-70a5a6f613e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYyMTUyODAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-800 to-blue-600"
    },
    {
      icon: Cylinder,
      title: "Air Galon 19 Liter",
      desc: "Air galon 19 liter merupakan varian air isi ulang berkualitas tinggi hasil proses RO, Ozonisasi, dan UV. Produk ini diperuntukkan bagi kebutuhan kantor, laboratorium, dan industri kecil menengah.",
      image: "https://images.unsplash.com/photo-1662647344062-b0cdb1ed7227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGdhbGxvbiUyMGRpc3BlbnNlcnxlbnwxfHx8fDE3NjIyMDc4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-700 to-blue-500"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-full mb-4">
            <Droplet className="w-4 h-4" />
            <span className="text-sm">Produk Kami</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">Produk Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Air Bersih Berkualitas – Dari Laboratorium ke Masyarakat
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            PUTOI menghadirkan produk air minum hasil proses Water Treatment Plant berstandar industri. Setiap tetes air melalui sistem filtrasi bertahap, Reverse Osmosis (RO), Ozonisasi, dan Sterilisasi UV, menghasilkan air yang jernih, higienis, dan sesuai standar Permenkes No. 492/MENKES/PER/IV/2010.
          </p>
        </div>

        {/* Products */}
        <div className="space-y-12">
          {products.map((product, index) => {
            const Icon = product.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                  />
                </div>
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <div className={`bg-gradient-to-br ${product.gradient} rounded-2xl p-8 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl mb-4">{product.title}</h3>
                    <p className="leading-relaxed">{product.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Assurance */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center">
          <Droplet className="w-16 h-16 text-blue-900 mx-auto mb-6" />
          <h3 className="text-2xl text-blue-900 mb-4">Jaminan Kualitas</h3>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Produk kami digunakan untuk mendukung kegiatan pendidikan, riset, dan kebutuhan masyarakat umum. Setiap produk melalui kontrol kualitas ketat untuk memastikan kesegaran dan keamanan air yang Anda konsumsi.
          </p>
        </div>
      </div>
    </section>
  );
}
