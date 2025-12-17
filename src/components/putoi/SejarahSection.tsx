import { FlaskConical } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import sejarahImg from "../../assets/sejarah.jpg";

export function SejarahSection() {
  return (
    <section id="sejarah" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <FlaskConical className="w-4 h-4" />
            <span className="text-sm">Sejarah</span>
          </div>
          <h3 className="text-3xl text-blue-900 mb-4">Sejarah PUTOI-TIK</h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <ImageWithFallback
              src={sejarahImg}
              alt="Sejarah PUTOI-TIK"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed text-justify mb-4">
              PUTOI-TIK (Pusat Unggulan Teknologi Otomasi Industri berbasis Teknologi Informasi dan Komunikasi) lahir dari kebutuhan strategis Politeknik Negeri Jakarta untuk meningkatkan kualitas pendidikan vokasi, memperkuat riset terapan, serta menyiapkan sumber daya manusia yang kompeten di bidang otomasi industri dan teknologi informasi. Di era percepatan digitalisasi industri, PNJ melihat perlunya sebuah fasilitas pembelajaran terpadu yang tidak hanya menyediakan praktik laboratorium, tetapi juga mampu menduplikasi lingkungan industri modern secara nyata.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify mb-4">
              Pada tahun 2015, melalui program ADB LOAN INO-2928, PNJ mulai menginisiasi pembangunan Center of Excellence yang kemudian bernama PUTOI-TIK. Program ini mendukung pengembangan laboratorium otomasi industri berstandar internasional dengan integrasi keilmuan teknologi instrumentasi, kontrol proses, jaringan industri, telekomunikasi, serta sistem informasi—sehingga menjadi laboratorium terbesar dan paling lengkap di Jurusan Teknik Elektro. Pada periode 2015–2016, pembangunan fasilitas utama seperti Water Treatment Plant (WTP) kapasitas 3000 L/jam dan sistem kontrol DCS–SCADA mulai direalisasikan dan beroperasi sebagai platform pembelajaran dan riset terpadu.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify mb-4">
              Pengembangan fasilitas berlanjut pada tahun 2017–2018, ditandai dengan hadirnya mesin Automatic Filling Machine 600 mL dan 18,9 L berbasis teknologi LabVIEW Real-Time dan FPGA. Kehadiran fasilitas ini makin memperkuat karakter PUTOI-TIK sebagai Teaching Factory, yaitu model pembelajaran vokasi yang meniru proses industri sesungguhnya. Integrasi antara instrumentasi, kontrol, IT enterprise, dan telekomunikasi menjadikan PUTOI-TIK sebagai ekosistem nyata bagi mahasiswa dan industri untuk melakukan praktik, pengujian, dan inovasi.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify mb-4">
              Sejak awal berdirinya, PUTOI-TIK dirancang tidak hanya sebagai laboratorium pembelajaran, tetapi juga sebagai Tempat Uji Kompetensi (TUK) serta pusat sertifikasi bagi profesi otomasi industri berbasis TIK. PUTOI-TIK juga menjadi wadah kolaborasi pendidikan–industri untuk penelitian terapan, inovasi teknologi, dan pengembangan produk berbasis kontrol proses dan teknologi informasi.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify">
              Hingga kini, PUTOI-TIK berkembang menjadi pusat unggulan yang mendukung pengembangan SDM level teknisi hingga ahli (KKNI Level 5–8), menghasilkan inovasi otomasi, serta menjadi referensi nasional dalam pengembangan teaching factory dan teknologi industri berbasis TIK. Keberadaan PUTOI-TIK memperkuat posisi PNJ sebagai institusi vokasi yang adaptif terhadap perkembangan industri 4.0 dan kebutuhan tenaga kerja kompeten di era digital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}