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
import jasa1 from "../assets/jasa/jasa-1.png";
import jasa2 from "../assets/jasa/jasa-2.png";

const jasaImages = [jasa1, jasa2];

export function ServicesSection() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTitle, setFilterTitle] = useState("");

  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // ===================== FETCH SERVICES =====================
  const fetchServices = async () => {
    setLoading(true);

    const body = {
      sortBy: "id",
      sortOrder: "desc",
      limit: "6",
      page,
      filters: {
        title: filterTitle,
        author: "",
        category: ""
      },
    };

    const res = await fetch(`${API_BASE}/api/product/pagination`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("PRODUCT RESPONSE:", data);

    setServices(data.data || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  // ===================== FETCH DETAIL =====================
  const fetchDetail = async (id: number) => {
    const res = await fetch(`${API_BASE}/api/product/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setDetailData(data.data);
    setShowDetail(true);
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchServices();
    }, 500);
    return () => clearTimeout(delay);
  }, [filterTitle]);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Jasa</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jasa terbaik yang telah kami siapkan untuk Anda
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-end mb-6">
          <Input
            placeholder="Cari Jasa..."
            className="w-80 shadow-sm"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse rounded-xl shadow-lg">
                  <div className="h-[380px] bg-gray-300"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-600 text-xl">
              Data tidak ditemukan
            </div>
          ) : (
            services.map((item: any, idx: number) => (
              <Card
                key={item.id}
                className="relative p-0 rounded-xl overflow-hidden group shadow-lg h-[400px] transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{
                  backgroundImage: `url(${jasaImages[idx % jasaImages.length]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-85 group-hover:bg-opacity-90 transition-all duration-300" />
                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3
                      className="text-2xl font-bold mb-2 h-16 leading-tight line-clamp-2 overflow-hidden"
                      style={{ maxHeight: '64px' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-4 overflow-hidden" style={{ maxHeight: "84px" }}>
                      {item.description || "Deskripsi singkat tidak tersedia."}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span><strong>Kategori:</strong> {item.category}</span>
                    </div>

                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); fetchDetail(item.id); }}
                        className="border-white text-white bg-transparent cursor-pointer hover:bg-transparent hover:text-white hover:border-white"
                      >
                        Detail
                      </Button>

                      <Button
                        className="bg-white text-blue-900 border border-transparent cursor-pointer hover:bg-white hover:text-blue-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://wa.me/6285755450598', '_blank');
                        }}
                      >
                        Hubungi Kami
                      </Button>
                    </div>
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
            Sebelumnya
          </Button>

          <div className="text-gray-700">
            Halaman {page} dari {totalPages}
          </div>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Selanjutnya
          </Button>
        </div>
        {/* HUBUNGI CARD */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white p-8 rounded-2xl flex flex-col items-center text-center gap-4 shadow-lg">
            <h3 className="text-2xl font-semibold">
              Ingin informasi lebih lengkap tentang layanan kami?
            </h3>
            <p className="text-base">
              Hubungi kami untuk detail lebih lanjut.
            </p>
            <a
              href="https://wa.me/6285755450598"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        {/* DETAIL MODAL */}
        <Dialog open={showDetail} onOpenChange={setShowDetail}>
          <DialogContent className="max-w-lg">
            {detailData && (
              <div className="space-y-4 text-gray-800">
                <h2 className="text-xl font-bold text-center mb-3">
                  {detailData.title}
                </h2>
                <p className="text-sm leading-relaxed">{detailData.description}</p>
                <div className="space-y-2 text-sm">
                  <div><strong>Kategori:</strong> {detailData.category}</div>
                  {/* <div><strong>Penulis:</strong> {detailData.author}</div>
                  <div><strong>Dibuat:</strong> {detailData.createdAt}</div>
                  <div><strong>Diperbarui:</strong> {detailData.updateAt}</div> */}
                </div>
                <div className="flex justify-center mt-6">
                  <a
                    href="https://wa.me/6285755450598"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
