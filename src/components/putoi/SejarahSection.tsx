import { FlaskConical } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import sejarah1Img from "../../assets/sejarah-1.jpg";
import sejarah2Img from "../../assets/sejarah-2.jpg";

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
              src={sejarah1Img}
              alt="Sejarah PUTOI-TIK"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <p
              className="text-gray-700 leading-relaxed text-justify mb-4"
              style={{ textAlign: "justify" }}
            >
              <b>
                PUTOI-TIK (Pusat Unggulan Teknologi Otomasi Industri berbasis
                TIK)
              </b>{" "}
              didirikan oleh Politeknik Negeri Jakarta sebagai respons strategis
              terhadap kebutuhan peningkatan kualitas pendidikan vokasi, riset
              terapan, dan penyiapan sumber daya manusia kompeten di bidang
              otomasi industri dan teknologi informasi. PUTOI-TIK dirancang
              sebagai fasilitas pembelajaran terpadu yang merepresentasikan
              lingkungan industri modern secara nyata.
            </p>
            <p
              className="text-gray-700 leading-relaxed text-justify mb-4"
              style={{ textAlign: "justify" }}
            >
              Pengembangan PUTOI-TIK dimulai pada tahun <b>2015</b> melalui
              program <b>ADB LOAN INO-2928</b>, dengan pembangunan laboratorium
              otomasi industri berstandar internasional yang mengintegrasikan
              instrumentasi, kontrol proses, jaringan industri, telekomunikasi,
              dan sistem informasi. Pada periode <b>2015–2016</b>, fasilitas
              utama seperti <b>Water Treatment Plant (WTP) 3000 L/jam</b> serta
              sistem <b>DCS–SCADA</b> mulai beroperasi sebagai platform
              pembelajaran dan riset.
            </p>
            <p
              className="text-gray-700 leading-relaxed text-justify mb-4"
              style={{ textAlign: "justify" }}
            >
              Pada tahun <b>2017–2018</b>, PUTOI-TIK diperkuat dengan{" "}
              <b>Automatic Filling Machine</b> berbasis{" "}
              <b>LabVIEW Real-Time dan FPGA</b>, yang menegaskan perannya
              sebagai <b>Teaching Factory</b>. Integrasi teknologi otomasi dan
              TIK menjadikan PUTOI-TIK sebagai ekosistem nyata untuk praktik,
              pengujian, dan inovasi mahasiswa serta mitra industri.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto pt-4">
          <div>
            <p
              className="text-gray-700 leading-relaxed text-justify mb-4"
              style={{ textAlign: "justify" }}
            >
              Selain sebagai laboratorium, PUTOI-TIK juga berfungsi sebagai{" "}
              <b>Tempat Uji Kompetensi (TUK)</b>, pusat sertifikasi, dan wadah
              kolaborasi pendidikan–industri dalam pengembangan riset terapan
              dan inovasi otomasi. Pada tahun <b>2025</b>, PUTOI-TIK memperoleh{" "}
              <b>
                Hibah Program Revitalisasi Perguruan Tinggi Vokasi (PRPTNV)
                Tahun 2025
              </b>{" "}
              sebagai bagian dari inisiatif{" "}
              <b>Kementerian Sains dan Teknologi (SAINTEK) Berdampak</b>, yang
              berfokus pada peningkatan relevansi, kebermanfaatan, dan dampak
              nyata pendidikan vokasi bagi industri dan masyarakat.{" "}
              <b>
                Website PUTOI-TIK ini merupakan salah satu luaran resmi dari
                kegiatan PRPTNV 2025
              </b>
              .
            </p>
            <p
              className="text-gray-700 leading-relaxed text-justify"
              style={{ textAlign: "justify" }}
            >
              Hingga kini, PUTOI-TIK berkembang sebagai pusat unggulan yang
              mendukung pengembangan SDM <b>KKNI Level 5–8</b>, mendorong
              inovasi otomasi industri berbasis TIK, serta memperkuat posisi PNJ
              sebagai institusi vokasi yang adaptif terhadap kebutuhan{" "}
              <b>Industri 4.0</b> dan transformasi digital nasional.
            </p>
          </div>
          <div>
            <ImageWithFallback
              src={sejarah2Img}
              alt="Sejarah PUTOI-TIK"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
