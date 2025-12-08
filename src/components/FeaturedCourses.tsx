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

import { AuthModal } from "./AuthModal";
import { Check, Clock, Users, Calendar } from "lucide-react";
import pelatihanScada from "../assets/pelatihan/pelatihan-scada.png";
import pelatihanLabview from "../assets/pelatihan/pelatihan-labview.png";

const pelatihanImages = [pelatihanScada, pelatihanLabview];

export function FeaturedCourses() {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTitle, setFilterTitle] = useState("");

  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredTrainings, setRegisteredTrainings] = useState<Set<number>>(new Set());

  // TOAST STATE
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // AUTH MODAL STATE
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // FETCH TRAINING
  const fetchTraining = async () => {
    setLoading(true);
    const body = {
      sortBy: "id",
      sortOrder: "desc",
      limit: "6",
      page,
      filters: { trainingTitle: filterTitle, author: "" },
    };
    const res = await fetch(`${API_BASE}/api/training/pagination`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setTrainings(data.data || []);
    setTotalPages(data.totalPages || 1);
    
    // Check registration status for all trainings
    const token = localStorage.getItem("accessToken");
    if (token && data.data) {
      const registeredSet = new Set<number>();
      for (const training of data.data) {
        try {
          const checkRes = await fetch(`${API_BASE}/api/training-participants/check`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ trainingId: String(training.id) }),
          });
          const checkData = await checkRes.json();
          if (checkData.data.registered) {
            registeredSet.add(training.id);
          }
        } catch {
          // Ignore errors
        }
      }
      setRegisteredTrainings(registeredSet);
    }
    
    setLoading(false);
  };

  // FETCH DETAIL
  const fetchDetail = async (id: number) => {
    const res = await fetch(`${API_BASE}/api/training/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setDetailData(data.data);
    setShowDetail(true);
    await checkRegistered(id);
  };

  // DAFTAR PELATIHAN
  const daftarPelatihan = async (id: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      openAuthModal("signin");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/training-participants/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trainingId: id }),
      });

      if (!response.ok) {
        // Tangani error dari backend
        const errorData = await response.json();
        showToast("error", errorData.message || "Gagal daftar pelatihan.");
        return;
      }

      const data = await response.json();

      if (data.code === "00") {
        showToast("success", "Berhasil daftar pelatihan!");
        setShowDetail(false);
        // Update registered trainings set
        setRegisteredTrainings(prev => new Set(prev).add(id));
      } else {
        showToast("error", data.message || "Gagal daftar pelatihan.");
      }
    } catch (err: any) {
      console.error(err);
      showToast("error", err.message || "Terjadi kesalahan saat mendaftar pelatihan.");
    }
  };

  // CHECK REGISTERED
  const checkRegistered = async (trainingId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_BASE}/api/training-participants/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ trainingId: String(trainingId) }),
      });
      const data = await res.json();
      setIsRegistered(data.data.registered);
    } catch {
      setIsRegistered(false);
    }
  };

  useEffect(() => { fetchTraining(); }, [page]);
  useEffect(() => {
    const delay = setTimeout(() => { setPage(1); fetchTraining(); }, 500);
    return () => clearTimeout(delay);
  }, [filterTitle]);

  return (
    <>

      <section id="courses" className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* AUTH MODAL */}
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

          {/* TOAST */}
          {toast && (
            <div
              className={`fixed top-[80px] left-5 min-w-[250px] px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 transition-opacity duration-300 z-50 bg-white`}
            >
              {toast.type === "success" ? (
                <span className="text-green-600 text-xl">✔️</span>
              ) : (
                <span className="text-red-600 text-xl">❌</span>
              )}
              <span className="text-gray-800 font-medium">{toast.message}</span>
            </div>
          )}

          {/* CARD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse rounded-xl shadow-lg">
                  <div className="h-[380px] bg-gray-300"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </Card>
              ))
            ) : trainings.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-600 text-xl">
                Data tidak ditemukan
              </div>
            ) : (
              trainings.map((item: any, idx: number) => (
                <Card
                  key={item.id}
                  className="relative p-0 rounded-xl overflow-hidden group shadow-lg h-[400px] transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  style={{
                    backgroundImage: `url(${pelatihanImages[idx % pelatihanImages.length]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-85 group-hover:bg-opacity-90 transition-all duration-300" />
                  <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{item.trainingTitle}</h3>
                      <p className="text-sm mb-4 line-clamp-4 overflow-hidden" style={{ maxHeight: "84px" }}>
                        {item.description || item.shortDescription || "Deskripsi singkat tidak tersedia."}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-white opacity-90" />
                        <span><strong>Durasi:</strong> {item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-white opacity-90" />
                        <span><strong>Minimal Peserta:</strong> {item.minimumParticipants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-white opacity-90" />
                        <span><strong>Jadwal:</strong> {item.implementationSchedule}</span>
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
                          disabled={registeredTrainings.has(item.id)}
                          className={`border border-transparent cursor-pointer ${
                            registeredTrainings.has(item.id)
                              ? 'bg-white text-gray-600 cursor-not-allowed opacity-70'
                              : 'bg-white text-blue-900 hover:bg-white hover:text-blue-900'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!registeredTrainings.has(item.id)) {
                              daftarPelatihan(item.id);
                            }
                          }}
                        >
                          {registeredTrainings.has(item.id) ? 'Anda Sudah Terdaftar' : 'Daftar'}
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
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Sebelumnya</Button>
            <div className="text-gray-700">Halaman {page} dari {totalPages}</div>
            <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Selanjutnya</Button>
          </div>

          {/* DETAIL MODAL */}
          <Dialog open={showDetail} onOpenChange={setShowDetail}>
            <DialogContent className="max-w-lg" style={{ maxHeight: "600px", overflowY: "auto" }}>
              <DialogHeader>
                <DialogTitle>Detail Pelatihan</DialogTitle>
              </DialogHeader>

              {detailData && (
                <div className="space-y-4 text-gray-800">

                  <h2 className="text-xl font-bold text-center mb-3 mt-4">
                    {detailData.trainingTitle}
                  </h2>

                  <p className="text-sm leading-relaxed">{detailData.description}</p>

                  {/* Informasi Umum */}
                  <div className="space-y-3 text-sm">

                    <div className="flex items-center gap-3">
                      <Clock className="text-blue-700" size={18} />
                      <span><strong>Durasi:</strong> {detailData.duration} Hari</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="text-blue-700" size={18} />
                      <span><strong>Peserta Minimal:</strong> {detailData.minimumParticipants} Peserta</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="text-blue-700" size={18} />
                      <span><strong>Jadwal Pelaksanaan:</strong> {detailData.implementationSchedule}</span>
                    </div>

                    {/* <div className="flex items-center gap-3">
                      <span className="text-blue-700 font-bold">Pembuat:</span>
                      <span>{detailData.author}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-blue-700 font-bold">Dibuat pada:</span>
                      <span>{new Date(detailData.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-blue-700 font-bold">Diperbarui pada:</span>
                      <span>{new Date(detailData.updateAt).toLocaleDateString()}</span>
                    </div> */}
                  </div>

                  {/* Biaya */}
                  <div>
                    <strong className="text-blue-700">Biaya:</strong>
                    <ul className="list-disc ml-5 mt-1 text-sm">
                      <li>IDR {Number(detailData.trainingFee).toLocaleString('id-ID')}</li>
                    </ul>
                  </div>

                  {/* Institusi */}
                  <div>
                    <strong className="text-blue-700">Institusi:</strong>
                    <ul className="list-disc ml-5 mt-1 text-sm">
                      <li>{detailData.institutionName}</li>
                    </ul>
                  </div>

                  {/* Tempat Uji Kompetensi */}
                  <div>
                    <strong className="text-blue-700">Tempat Uji Kompetensi:</strong>
                    <ul className="list-disc ml-5 mt-1 text-sm">
                      <li>{detailData.competencyTestPlace}</li>
                    </ul>
                  </div>

                  {/* Materi Pelatihan */}
                  <div>
                    <strong className="text-blue-700">Materi:</strong>
                    <ul className="list-disc ml-5 mt-1 text-sm">
                      {detailData.trainingMaterials?.map((m: any, idx: number) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Fasilitas */}
                  <div>
                    <strong className="text-blue-700">Fasilitas:</strong>
                    <ul className="list-disc ml-5 mt-1 text-sm">
                      {detailData.facilities?.map((f: any, idx: number) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Sertifikat */}
                  {detailData.certificate?.length > 0 && (
                    <div>
                      <strong className="text-blue-700">Sertifikat:</strong>
                      <ul className="list-disc ml-5 mt-1 text-sm">
                        {detailData.certificate.map((c: any, idx: number) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Status / Tombol Daftar */}
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
    </>
  );
}
