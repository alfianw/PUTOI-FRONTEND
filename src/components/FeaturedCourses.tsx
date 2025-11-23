import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const defaultImage = "https://images.unsplash.com/photo-1652696290920-ee4c836c711e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBsYXB0b3B8ZW58MXx8fHwxNzYwNDE0ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      
      if (!response.ok) {
        console.warn('Courses API not available yet');
        setCourses([]);
        return;
      }
      
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      // Silently handle error - API might not be deployed yet
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              Kursus Populer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilihan kursus terbaik dari berbagai kategori dengan rating tertinggi
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Kursus Populer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilihan kursus terbaik dari berbagai kategori dengan rating tertinggi
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.slice(0, 6).map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={course.image || defaultImage}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {course.category}
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-blue-900">
                    {course.level || 'Pemula'}
                  </Badge>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg text-gray-900 line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {course.title}
                  </h3>

                  <div className="text-sm text-gray-600">{course.instructor}</div>

                  {course.rating && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-blue-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-gray-900">{course.rating}</span>
                      </div>
                      {course.students && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          {course.students.toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}

                  {course.duration && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      {course.lessons && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} pelajaran
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl text-blue-900">{course.price}</div>
                      {course.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          {course.originalPrice}
                        </div>
                      )}
                    </div>
                    <Button className="bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-500">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-600 mb-2">Belum Ada Kursus</h3>
              <p className="text-gray-500">
                Kursus akan ditampilkan di sini setelah admin menambahkannya
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 border-2 border-blue-900 text-blue-900 hover:bg-blue-50"
          >
            Lihat Semua Kursus
          </Button>
        </div>
      </div>
    </section>
  );
}
