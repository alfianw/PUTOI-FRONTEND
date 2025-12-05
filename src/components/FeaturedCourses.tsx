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

import { AuthModal } from "./AuthModal"; // ⬅ IMPORT MODAL LOGIN

import { Check, Clock, Users, Calendar } from "lucide-react";

export function FeaturedCourses() {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTitle, setFilterTitle] = useState("");

  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // 🔥 AUTH MODAL STATE
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // ===================== FETCH TRAINING =====================
  const fetchTraining = async () => {
    setLoading(true);

    const body = {
      sortBy: "id",
      sortOrder: "desc",
      limit: "6",
      page,
      filters: {
        trainingTitle: filterTitle,
        author: "",
      },
    };

    const res = await fetch(`${API_BASE}/api/training/pagination`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    setTrainings(data.data || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  // ===================== FETCH DETAIL =====================
  const fetchDetail = async (id: number) => {
    const res = await fetch(`${API_BASE}/api/training/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setDetailData(data.data);
    setShowDetail(true);

    checkRegistered(id);
  };

  // ===================== DAFTAR PELATIHAN =====================
  const daftarPelatihan = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");

      // 🔥 BUKA MODAL LOGIN JIKA BELUM LOGIN
      if (!token) {
        openAuthModal("signin");
        return;
      }

      const response = await fetch(`${API_BASE}/api/training-participants/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trainingId: id }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        openAuthModal("signin");
        return;
      }

      if (data.code === "00") {
        alert("Berhasil daftar pelatihan!");
        setShowDetail(false);
      } else {
        alert(data.message || "Gagal daftar pelatihan.");
      }
    } catch (err) {
      console.error("Daftar pelatihan error:", err);
    }
  };

  // ===================== CHECK REGISTERED =====================
  const checkRegistered = async (trainingId: number) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${API_BASE}/api/training-participants/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trainingId: String(trainingId) }),
      });

      const data = await res.json();
      setIsRegistered(data.data.registered);
    } catch (error) {
      setIsRegistered(false);
    }
  };

  useEffect(() => {
    fetchTraining();
  }, [page]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchTraining();
    }, 500);
    return () => clearTimeout(delay);
  }, [filterTitle]);

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===================== AUTH MODAL ===================== */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          mode={authMode}
        />

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Pelatihan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilihan pelatihan terbaik dengan kategori beragam
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-end mb-6">
          <Input
            placeholder="Cari title pelatihan..."
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
                <Card
                  key={i}
                  className="overflow-hidden animate-pulse rounded-xl shadow-lg"
                >
                  {/* Bagian gambar/card */}
                  <div className="h-[380px] bg-gray-300"></div>

                  {/* Bagian detail */}
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </>
          ) : trainings.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-600 text-xl">
              Data tidak ditemukan
            </div>
          ) : (
            trainings.map((item: any) => (
              <Card
                key={item.id}
                className="relative p-0 cursor-pointer rounded-xl overflow-hidden group shadow-lg"
                onClick={() => fetchDetail(item.id)}
              >
                <div className="lg:flex">
                  {/* Visual / header area */}
                  <div className="relative lg:w-1/2 h-[260px] lg:h-[380px] bg-blue-900 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-2 text-white">{item.trainingTitle}</h3>

                    {/* Description placed under title */}
                    <p className="text-sm text-white mb-4 line-clamp-3">
                      {item.description || item.shortDescription || "Deskripsi singkat tidak tersedia."}
                    </p>

                    <div className="space-y-3 text-sm text-white">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-white opacity-90" />
                        <span>
                          <strong>Duration:</strong> {item.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-white opacity-90" />
                        <span>
                          <strong>Participants:</strong> {item.minimumParticipants}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-white opacity-90" />
                        <span>
                          <strong>Schedule:</strong>{" "}
                          {item.implementationSchedule}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description + actions */}
                  <div className="lg:w-1/2 bg-white p-6 flex flex-col justify-between text-gray-800">
                      <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">{item.implementationSchedule}</div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchDetail(item.id);
                          }}
                        >
                          Detail
                        </Button>

                        <Button
                          className="bg-blue-900 hover:bg-blue-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            daftarPelatihan(item.id);
                          }}
                        >
                          Daftar
                        </Button>
                      </div>
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
            <DialogHeader>
              <DialogTitle>Detail Pelatihan</DialogTitle>
            </DialogHeader>

            {detailData && (
              <div className="space-y-4 text-gray-800">

                <h2 className="text-xl font-bold text-center mb-3">
                  {detailData.trainingTitle}
                </h2>

                <p className="text-sm leading-relaxed">{detailData.description}</p>

                {/* Info Section */}
                <div className="space-y-3 text-sm">

                  <div className="flex items-center gap-3">
                    <Clock className="text-blue-700" size={18} />
                    <span><strong>Duration:</strong> {detailData.duration}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="text-blue-700" size={18} />
                    <span><strong>Participants:</strong> {detailData.minimumParticipants}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-700" size={18} />
                    <span><strong>Schedule:</strong> {detailData.implementationSchedule}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-blue-700 font-bold">Fee:</span>
                    <span>{detailData.trainingFee}</span>
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <strong className="text-blue-700">Materials:</strong>
                  <ul className="list-disc ml-5 mt-1 text-sm">
                    {detailData.trainingMaterials?.map((m: any, idx: number) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>

                {/* Facilities */}
                <div>
                  <strong className="text-blue-700">Facilities:</strong>
                  <ul className="list-disc ml-5 mt-1 text-sm">
                    {detailData.facilities?.map((f: any, idx: number) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>

                {/* Status / Button */}
                {isRegistered ? (
                  <div className="flex items-center justify-center gap-2 mt-4 bg-green-100 py-3 rounded-md text-green-700 font-semibold">
                    <span>Sudah Terdaftar</span>
                    <Check className="w-5 h-5" />
                  </div>
                ) : (
                  <Button
                    className="w-full mt-4 bg-blue-900 hover:bg-blue-700 text-white"
                    onClick={() => daftarPelatihan(detailData.id)}
                  >
                    Daftar Pelatihan
                  </Button>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
