import { Button } from "./ui/button";
import { Search, PlayCircle } from "lucide-react";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";
import homeImage from "../assets/home-image.jpg";
import '../utils/init-superadmin';

export function Hero() {

  const [countTraining, setCountTraining] = useState(0);

  const fetchTraining = async () => {
    const body = {
      sortBy: "id",
      sortOrder: "desc",
      limit: "10",
      page: "1",
      filters: {
        trainingTitle: "",
        author: "",
      },
    };

    const res = await fetch("http://localhost:8080/api/training/pagination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    setCountTraining(data.countData); // <-- SIMPAN COUNT DI STATE
  };

  useEffect(() => {
  fetchTraining();
}, []);


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
                <div className="text-3xl text-blue-900">{countTraining}+</div>
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
