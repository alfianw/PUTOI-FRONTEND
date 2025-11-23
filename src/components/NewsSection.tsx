import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      
      if (!response.ok) {
        console.warn('News API not available yet');
        setNews([]);
        return;
      }
      
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      // Silently handle error - API might not be deployed yet
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              Berita & Artikel Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Informasi terkini seputar dunia pendidikan dan teknologi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
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

  if (news.length === 0) {
    return null; // Don't show section if no news
  }

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Berita & Artikel Terbaru
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Informasi terkini seputar dunia pendidikan dan teknologi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 6).map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>

                <h3 className="text-xl text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 line-clamp-3">
                  {item.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="gap-2 text-purple-600 hover:text-purple-700"
                  >
                    Baca
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {news.length > 6 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Lihat Semua Berita
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
