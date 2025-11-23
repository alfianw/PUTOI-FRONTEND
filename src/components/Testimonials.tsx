import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Full Stack Developer",
    avatar: "BS",
    rating: 5,
    text: "Platform ini sangat membantu saya dalam meningkatkan skill programming. Materinya lengkap dan mudah dipahami. Sekarang saya sudah bekerja sebagai developer!",
  },
  {
    name: "Siti Nurhaliza",
    role: "UI/UX Designer",
    avatar: "SN",
    rating: 5,
    text: "Kursus desain di sini benar-benar berkualitas. Instrukturnya berpengalaman dan cara mengajarnya mudah dimengerti. Sangat direkomendasikan!",
  },
  {
    name: "Ahmad Fauzi",
    role: "Data Analyst",
    avatar: "AF",
    rating: 5,
    text: "Berkat kursus data science di platform ini, saya berhasil switch career ke bidang data. Materinya up to date dan praktis untuk diterapkan di dunia kerja.",
  },
  {
    name: "Dewi Lestari",
    role: "Digital Marketer",
    avatar: "DL",
    rating: 5,
    text: "Sangat puas dengan kualitas kursus dan support yang diberikan. Saya bisa belajar dengan fleksibel dan langsung praktik di pekerjaan saya.",
  },
  {
    name: "Rudi Hermawan",
    role: "Mobile Developer",
    avatar: "RH",
    rating: 5,
    text: "Kursus mobile development-nya sangat comprehensive. Dari basic sampai advanced semua ada. Instrukturnya juga responsif menjawab pertanyaan.",
  },
  {
    name: "Lisa Anggraini",
    role: "Product Manager",
    avatar: "LA",
    rating: 5,
    text: "Platform pembelajaran terbaik yang pernah saya coba. Materinya terstruktur dengan baik dan sertifikatnya diakui oleh perusahaan-perusahaan.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Apa Kata Siswa Kami?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ribuan siswa telah merasakan manfaat belajar di platform kami
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-600">
                  <AvatarFallback className="text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-blue-500 fill-current" />
                ))}
              </div>

              <p className="text-gray-600">{testimonial.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
