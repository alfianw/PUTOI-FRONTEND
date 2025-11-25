import { Button } from "./ui/button";
import { Search, PlayCircle } from "lucide-react";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";
import homeImage from "../assets/home-image.jpg";
import '../utils/init-superadmin';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-6xl text-gray-900">Tingkatkan Kompetensi Anda Dengan Pelatihan.{" "}
              <span className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Terstandar Industri
              </span>
            </h1>
            <p className="text-xl text-gray-600">
PUTOI merupakan unit pelatihan profesional PNJ yang menyelenggarakan kegiatan pelatihan dan uji kompetensi baik untuk mahasiswa dan alumni maupun masyarakat umum.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl text-blue-900">3+</div>
                <div className="text-gray-600">Pelatihan</div>
              </div>
              <div>
                <div className="text-3xl text-blue-900">4+</div>
                <div className="text-gray-600">Produk</div>
              </div>
              <div>
                <div className="text-3xl text-blue-900">50+</div>
                <div className="text-gray-600">Instruktur</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={homeImage}
                alt="Online Learning"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <PlayCircle className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                  <div className="text-2xl text-gray-900">5,000+</div>
                  <div className="text-gray-600">Video Tutorial</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
