import { useState } from "react";
import galeri1 from "../assets/galeri/galeri-1.png";
import galeri2 from "../assets/galeri/galeri-2.png";
import galeri3 from "../assets/galeri/galeri-3.png";

const images = [
  { src: galeri1, alt: "galeri image 1", caption: "Kegiatan PUTOI 1" },
  { src: galeri2, alt: "galeri image 2", caption: "Kegiatan PUTOI 2" },
  { src: galeri3, alt: "galeri image 3", caption: "Kegiatan PUTOI 3" },
];

export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Galeri</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Kumpulan foto & brand yang menggambarkan kegiatan dan fasilitas kami.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setOpenIndex(idx)}
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
