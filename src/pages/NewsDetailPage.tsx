import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
// import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function NewsDetailPage() {
    const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Reset index when images change
  useEffect(() => {
    if (data && Array.isArray(data.images) && data.images.length > 0) {
      setImageIndex(0);
    }
  }, [data?.images?.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!data || !data.images || data.images.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setImageIndex(i => (i <= 0 ? data.images.length - 1 : i - 1));
      } else if (e.key === 'ArrowRight') {
        setImageIndex(i => (i >= data.images.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [data]);

  // Preload next image for smoother transitions
  useEffect(() => {
    if (!data || !data.images || data.images.length <= 1) return;
    const next = imageIndex >= data.images.length - 1 ? 0 : imageIndex + 1;
    const img = new Image();
    img.src = encodeURI(`${API_BASE}${data.images[next].imagePath}`);
  }, [imageIndex, data]);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);

      // fetch all news to find the id by slug (existing logic)
      const res = await fetch(`${API_BASE}/api/news/paginaton`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortBy: "id", sortOrder: "desc", limit: "100" }),
      });
      const result = await res.json();

      if (!result.data) {
        setData(null);
        setLoading(false);
        return;
      }

      const match = result.data.find((n: any) => {
        const s = n.title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        return s === slug;
      });

      if (!match) {
        setData(null);
        setLoading(false);
        return;
      }

      // fetch detail by id to get images and full content
      try {
        const det = await fetch(`${API_BASE}/api/news/detail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: String(match.id) }),
        });
        const detJson = await det.json();
        if (detJson.code === '00' && detJson.data) {
          setData(detJson.data);
          setImageIndex(0);
        } else {
          // fallback to match if detail not available
          setData(match);
        }
      } catch (e) {
        console.error('Failed to fetch news detail', e);
        setData(match);
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
            {/* Image carousel above title */}
            {data.images && data.images.length > 0 && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="w-full h-64 bg-gray-100 rounded overflow-hidden relative">
                  <img
                    src={encodeURI(`${API_BASE}${data.images[imageIndex].imagePath}`)}
                    alt={data.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setImageIndex(i => (i >= data.images.length - 1 ? 0 : i + 1))}
                  />

                  {data.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImageIndex(i => (i <= 0 ? data.images.length - 1 : i - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
                        aria-label="previous image"
                      >
                        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={() => setImageIndex(i => (i >= data.images.length - 1 ? 0 : i + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
                        aria-label="next image"
                      >
                        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>

                      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
                        {imageIndex + 1} / {data.images.length}
                      </div>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                {data.images.length > 1 && (
                  <div className="flex gap-2 justify-center mt-3">
                    {data.images.map((im: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={`w-16 h-12 overflow-hidden rounded border ${idx === imageIndex ? 'ring-2 ring-blue-600' : ''}`}
                        aria-label={`show image ${idx + 1}`}>
                        <img src={encodeURI(`${API_BASE}${im.imagePath}`)} alt={im.imageName || ''} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

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
