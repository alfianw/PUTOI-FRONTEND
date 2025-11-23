import { Button } from "./ui/button";
import { Search, PlayCircle } from "lucide-react";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";
import '../utils/init-superadmin';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-900">
              🎓 Platform Pembelajaran Online Terbaik
            </div>
            <h1 className="text-4xl lg:text-6xl text-gray-900">
              Tingkatkan Skill Anda Dengan{" "}
              <span className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Pembelajaran Online
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Akses ribuan kursus berkualitas dari instruktur ahli. Belajar sesuai dengan
              kecepatan Anda sendiri dan raih karir impian Anda.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Cari kursus, instruktur, atau topik..."
                  className="pl-12 h-14 text-lg border-2 focus:border-blue-900"
                />
              </div>
              <Button className="h-14 px-8 bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-500">
                Cari Kursus
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl text-blue-900">10,000+</div>
                <div className="text-gray-600">Kursus</div>
              </div>
              <div>
                <div className="text-3xl text-blue-900">50,000+</div>
                <div className="text-gray-600">Siswa</div>
              </div>
              <div>
                <div className="text-3xl text-blue-900">500+</div>
                <div className="text-gray-600">Instruktur</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613151096599-b234757eb4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MDQzMDg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
