import { useState } from "react";
import galeri1 from "../assets/galeri/galeri-1.png";
import galeri2 from "../assets/galeri/galeri-2.png";
import galeri3 from "../assets/galeri/galeri-3.png";
import galeri4 from "../assets/galeri/galeri-4.jpg";
import galeri5 from "../assets/galeri/galeri-5.jpg";
import galeri6 from "../assets/galeri/galeri-6.jpg";
import galeri7 from "../assets/galeri/galeri-7.jpg";
import galeri8 from "../assets/galeri/galeri-8.jpg";
import galeri9 from "../assets/galeri/galeri-9.JPG";
import galeri10 from "../assets/galeri/galeri-10.jpeg";
import galeri11 from "../assets/galeri/galeri-11.jpg";
import galeri12 from "../assets/galeri/galeri-12.jpeg";

const images = [
  { src: galeri1, alt: "galeri image 1", caption: "Kegiatan PUTOI-TIK 1" },
  { src: galeri2, alt: "galeri image 2", caption: "Kegiatan PUTOI-TIK 2" },
  { src: galeri3, alt: "galeri image 3", caption: "Kegiatan PUTOI-TIK 3" },
  { src: galeri4, alt: "galeri image 4", caption: "Kegiatan PUTOI-TIK 4" },
  { src: galeri5, alt: "galeri image 5", caption: "Kegiatan PUTOI-TIK 5" },
  { src: galeri6, alt: "galeri image 6", caption: "Kegiatan PUTOI-TIK 6" },
  { src: galeri7, alt: "galeri image 7", caption: "Kegiatan PUTOI-TIK 7" },
  { src: galeri8, alt: "galeri image 8", caption: "Kegiatan PUTOI-TIK 8" },
  { src: galeri9, alt: "galeri image 9", caption: "Kegiatan PUTOI-TIK 9" },
  { src: galeri10, alt: "galeri image 10", caption: "Kegiatan PUTOI-TIK 10" },
  { src: galeri11, alt: "galeri image 11", caption: "Kegiatan PUTOI-TIK 11" },
  { src: galeri12, alt: "galeri image 12", caption: "Kegiatan PUTOI-TIK 12" },
];

export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const imagesPerPage = 8;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIdx = (page - 1) * imagesPerPage;
  const endIdx = startIdx + imagesPerPage;
  const pagedImages = images.slice(startIdx, endIdx);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Galeri</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Kumpulan foto & brand yang menggambarkan kegiatan dan fasilitas kami.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pagedImages.map((img, idx) => (
            <button
              key={startIdx + idx}
              onClick={() => setOpenIndex(startIdx + idx)}
              className="relative group overflow-hidden rounded-lg focus:outline-none"
              aria-label={`Buka gambar ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                <div className="p-3 text-white">
                  <div className="text-sm font-medium">{img.caption}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-blue-100 text-blue-900 font-semibold disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Sebelumnya
            </button>
            <span className="mx-2 text-gray-700">Halaman {page} dari {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-blue-100 text-blue-900 font-semibold disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Selanjutnya
            </button>
          </div>
        )}

        {openIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            onClick={() => setOpenIndex(null)}
          >
            <div className="max-w-4xl w-full bg-white rounded shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img src={images[openIndex].src} alt={images[openIndex].alt} className="w-full object-contain max-h-[80vh] bg-black" />
                <button
                  onClick={() => setOpenIndex(null)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                  aria-label="Tutup galeri"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <div className="text-lg font-semibold">{images[openIndex].caption}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
