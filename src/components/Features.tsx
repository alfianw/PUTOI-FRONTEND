import { Award, Video, Download, Users, Clock, Headphones } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Video,
    title: "Video HD Berkualitas",
    description: "Akses video pembelajaran berkualitas tinggi yang mudah dipahami",
  },
  {
    icon: Download,
    title: "Materi Download",
    description: "Download materi pembelajaran untuk belajar offline kapan saja",
  },
  {
    icon: Award,
    title: "Sertifikat Resmi",
    description: "Dapatkan sertifikat resmi setelah menyelesaikan kursus",
  },
  {
    icon: Users,
    title: "Komunitas Aktif",
    description: "Bergabung dengan ribuan siswa dalam komunitas pembelajaran",
  },
  {
    icon: Clock,
    title: "Akses Selamanya",
    description: "Belajar sesuai dengan kecepatan Anda tanpa batas waktu",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Tim support kami siap membantu Anda kapan saja",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Mengapa Memilih EduLearn?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Platform pembelajaran online dengan berbagai keunggulan untuk mendukung kesuksesan Anda
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
