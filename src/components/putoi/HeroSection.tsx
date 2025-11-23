import { Droplet, Award, FlaskConical, Zap } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Droplet className="w-4 h-4" />
              <span className="text-sm">Water Treatment Plant PNJ</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl mb-6">
              PUTOI
            </h1>
            
            <p className="text-2xl mb-4 opacity-90">
              Polytechnic Utility Treatment of Industrial Water
            </p>
            
            <p className="text-lg mb-8 opacity-80 leading-relaxed">
              Pusat unggulan pengolahan air industri berstandar internasional dengan teknologi Reverse Osmosis, filtrasi multi-tahap, dan sistem monitoring otomatis.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a
                href="#about"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Tentang Kami
              </a>
              <a
                href="#products"
                className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Lihat Produk
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Award className="w-5 h-5" />
                  <p className="text-3xl">ISO</p>
                </div>
                <p className="text-sm opacity-80">Certified</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <FlaskConical className="w-5 h-5" />
                  <p className="text-3xl">95%</p>
                </div>
                <p className="text-sm opacity-80">TDS Removal</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <p className="text-3xl">IoT</p>
                </div>
                <p className="text-sm opacity-80">Monitoring</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748002757537-00ab5114135b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmlsdHJhdGlvbiUyMHN5c3RlbXxlbnwxfHx8fDE3NjIyMDc4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="PUTOI Water Treatment Facility"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-blue-900 text-sm mb-1">Standar Kualitas</p>
                <p className="text-gray-700 text-xs">Permenkes No. 492/2010 · ISO 9001:2015 · SNI 01-3553-2015</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
