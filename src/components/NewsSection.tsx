import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Calendar, User, ArrowRight } from "lucide-react";

export function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTitle, setFilterTitle] = useState("");

  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  // ===================== FETCH NEWS =====================
  const fetchNews = async () => {
    setLoading(true);

    const body = {
      sortBy: "id",
      sortOrder: "desc",
      limit: "6",
      page: String(page),
      filters: {
        title: filterTitle,
        author: "",
      },
    };

    const res = await fetch("http://localhost:8080/api/news/paginaton", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    setNews(data.data || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  // ===================== FETCH DETAIL =====================
  const fetchDetail = async (id: number) => {
    const res = await fetch("http://localhost:8080/api/news/detail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setDetailData(data.data);
    setShowDetail(true);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchNews();
    }, 500);

    return () => clearTimeout(delay);
  }, [filterTitle]);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Berita & Artikel Terbaru
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Informasi terkini seputar dunia pendidikan dan teknologi
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-end mb-6">
          <Input
            placeholder="Cari judul berita..."
            className="w-80 shadow-sm"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </div>

        {/* CARD GRID (TIDAK DIUBAH SAMA SEKALI) */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </>
          ) : news.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-600 text-xl">
              Data tidak ditemukan
            </div>
          ) : (
            news.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => fetchDetail(item.id)}
              >
                <div className="p-6 space-y-4">
                  {/* DATE */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 line-clamp-3">{item.description}</p>

                  {/* Optional File Description */}
                  {item.fileDescription && (
                    <p className="text-gray-500 text-sm line-clamp-2 italic">
                      {item.fileDescription}
                    </p>
                  )}

                  {/* FOOTER */}
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
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <div className="text-gray-700">Page {page} of {totalPages}</div>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>

        {/* DETAIL MODAL */}
        <Dialog open={showDetail} onOpenChange={setShowDetail}>
          <DialogContent className="max-w-lg">
            {/* <DialogHeader>
              <DialogTitle>Detail Berita</DialogTitle>
            </DialogHeader> */}

            {detailData && (
              <div className="space-y-4 text-gray-800">

                <h2 className="text-xl font-bold text-center mb-3">
                  {detailData.title}
                </h2>

                <p className="text-sm leading-relaxed">{detailData.description}</p>

                <div className="border-t pt-3 text-sm space-y-2">
                  <p><strong>Author:</strong> {detailData.author}</p>
                  <p>
                    <strong>Tanggal:</strong>{" "}
                    {new Date(detailData.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {detailData.fileDescription && (
                    <p><strong>File Description:</strong> {detailData.fileDescription}</p>
                  )}
                </div>

                {/* Jika ada file URL */}
                {detailData.fileUrl && (
                  <a
                    href={detailData.fileUrl}
                    target="_blank"
                    className="block mt-4 text-blue-700 underline text-center"
                  >
                    Lihat Lampiran
                  </a>
                )}

              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
