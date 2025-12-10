import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { Button } from '../components/ui/button';
// import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function NewsDetailPage() {
    const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      // fetch all news, then find by slug
      const res = await fetch(`${API_BASE}/api/news/paginaton`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortBy: "id", sortOrder: "desc", limit: "100" }),
      });
      const result = await res.json();
      if (result.data) {
        const match = result.data.find((n: any) => {
          const s = n.title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
          return s === slug;
        });
        setData(match || null);
      } else {
        setData(null);
      }
      setLoading(false);
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return <>
      <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>
      <Footer />
    </>;
  }
  if (!data) {
    return <>
      <div className="min-h-screen flex items-center justify-center text-gray-600">Berita tidak ditemukan.</div>
      <Footer />
    </>;
  }

  return (
    <>
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <Button
            variant="outline"
            className="mb-6 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            &larr; Kembali
          </Button>
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-900">Beranda</a>
                <span className="px-2">/</span>
              </li>
              <li>
                <a href="#news" className="hover:text-blue-900">Berita</a>
                <span className="px-2">/</span>
              </li>
              <li className="text-blue-900 font-medium line-clamp-1 max-w-[180px] truncate" title={data.title}>{data.title}</li>
            </ol>
          </nav>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">{data.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(data.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <User className="w-4 h-4 ml-4" />
              <span>{data.author}</span>
            </div>
          </div>
          <div className="prose prose-lg text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: data.description }} />
          {data.fileDescription && (
            <div className="bg-blue-50 p-4 rounded mb-4 text-gray-700">
              <strong>File:</strong> {data.fileDescription}
            </div>
          )}
          {data.fileUrl && (
            <Button asChild className="mb-4">
              <a href={data.fileUrl} target="_blank" rel="noopener noreferrer">Lihat Lampiran</a>
            </Button>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
