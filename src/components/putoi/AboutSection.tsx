import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  Droplet,
  Target,
  Briefcase,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import tentangKamiImg from "../../assets/tentang-kami.png";
import sejarahImg from "../../assets/sejarah.jpg";

export function AboutSection() {
  const technologies = [
    "Sand Filter – Menghilangkan kekeruhan dan partikel kasar",
    "Carbon Filter – Menyerap bau dan bahan organik",
    "Water Softener – Mengurangi kandungan kapur (hardness)",
    "Reverse Osmosis System (RO) – Menghilangkan hingga 95% total padatan terlarut (TDS)",
    "Ozone Reactor – Membunuh bakteri dan menyegarkan air",
    "Ultraviolet Sterilizer – Tahap akhir disinfeksi untuk memastikan air aman diminum",
  ];

  const keunggulan = [
    "Menggunakan Standar Industrial Grade Equipment",
    "Dilengkapi Instrumentasi Monitoring Otomatis (IoT Ready)",
    "Terintegrasi Dengan Sistem Pelatihan Dan Sertifikasi",
    "Mendukung Kegiatan Penelitian Terapan Dan Komersialisasi Produk",
    "Menyediakan Layanan Masyarakat & Jasa Industri Air Bersih",
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
            <Droplet className="w-4 h-4" />
            <span className="text-sm">Tentang Kami</span>
          </div>
          <h2 className="text-4xl mb-4 text-blue-900">PUTOI-TIK</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Pusat Unggulan Teknologi Otomasi Industri berbasis Teknologi
            Informasi dan Komunikasi
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <ImageWithFallback
              src={tentangKamiImg}
              alt="PUTOI-TIK Water Treatment Plant"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
              PUTOI-TIK (Pusat Unggulan Teknologi Otomasi Industri berbasis
              Teknologi Informasi dan Komunikasi) merupakan pusat unggulan
              (Center of Excellence) yang dikembangkan oleh Jurusan Teknik
              Elektro Politeknik Negeri Jakarta sebagai fasilitas terpadu untuk
              pendidikan vokasi, riset terapan, sertifikasi kompetensi, serta
              layanan teknologi di bidang otomasi industri. PUTOI-TIK didirikan
              melalui program ADB LOAN INO-2928 dan dirancang sebagai
              laboratorium modern yang mendukung pengembangan SDM dan inovasi
              teknologi tingkat nasional maupun regional.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
              PUTOI-TIK menaungi empat klaster keahlian utama, yaitu
              Instrumentation & Control Engineering, Telecommunication
              Engineering, Electrical Engineering, dan IT Enterprise
              Engineering. Keempat klaster ini terintegrasi dalam satu ekosistem
              pembelajaran industri yang dilengkapi fasilitas pengolahan air
              minum (Water Treatment Plant), mesin pengisian botol otomatis,
              sistem kontrol DCS–SCADA, server enterprise, jaringan
              telekomunikasi, serta peralatan instrumentasi berstandar industri.
            </p>
            {/* <p className="text-gray-700 leading-relaxed text-justify">
Melalui pendekatan Teaching Factory System, PUTOI-TIK menjadi wadah pembelajaran praktik bagi mahasiswa, tenaga industri, serta calon tenaga kerja untuk memperoleh kompetensi level teknisi hingga level ahli berdasarkan KKNI. Selain itu, fasilitas ini berfungsi sebagai Tempat Uji Kompetensi (TUK) untuk berbagai skema otomasi industri berbasis TIK, mencakup operator, teknisi, perancang perangkat lunak, hingga sistem designer.
            </p> */}
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl">Visi</h3>
            </div>
            <p className="leading-relaxed">
              Menjadi pusat unggulan nasional dalam bidang pengolahan air
              industri dan lingkungan, yang mendukung pendidikan vokasi,
              penelitian terapan, dan layanan profesional menuju industri hijau
              berkelanjutan.
            </p>
          </div>

          <div className="bg-white border-2 border-blue-900 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-900 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl text-blue-900">Misi</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Mengembangkan fasilitas water treatment berteknologi tinggi
                  untuk pelatihan dan sertifikasi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Menyediakan layanan kalibrasi dan pengujian kualitas air
                  sesuai standar industri.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Menghasilkan produk air minum dalam kemasan yang aman,
                  higienis, dan berstandar nasional.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Mendukung kolaborasi riset antara akademisi, industri, dan
                  pemerintah dalam bidang pengolahan air dan efisiensi energi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Meningkatkan kompetensi mahasiswa melalui hands-on project dan
                  problem-based learning berbasis teknologi proses nyata.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sejarah */}
        {/* <div className="mb-20">
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
        </div> */}

        {/* Fasilitas Teknologi */}
        {/* <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-4">
              <FlaskConical className="w-4 h-4" />
              <span className="text-sm">Teknologi</span>
            </div>
            <h3 className="text-3xl text-blue-900 mb-4">Fasilitas Teknologi</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              PUTOI-TIK dilengkapi menggunakan teknologi terkini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-blue-100 rounded-2xl shadow p-6 flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="wtp">
                  <AccordionTrigger>
                    <span className="font-semibold text-blue-900 text-xl cursor-pointer">Water Treatment Plant</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2 text-gray-700 space-y-2">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Sand Filter</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Carbon Filter</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Water Softener</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Reverse Osmosis System (RO)</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Ozone Reaktor</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Ultraviolet Sterilizer</span></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="bg-white border-2 border-blue-100 rounded-2xl shadow p-6 flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="instrument">
                  <AccordionTrigger>
                    <span className="font-semibold text-blue-900 text-xl cursor-pointer">Instrument</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2 text-gray-700 space-y-2">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Sensor Transmitter</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Sensor Pressure</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Sensor Flow</span></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="bg-white border-2 border-blue-100 rounded-2xl shadow p-6 flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="controller">
                  <AccordionTrigger>
                    <span className="font-semibold text-blue-900 text-xl cursor-pointer">Controller dan Monitoring</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2 text-gray-700 space-y-2">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Scada IoT</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" /><span>Otomasi</span></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
            <p className="text-gray-700">
              Semua sistem dikontrol secara otomatis dengan sensor tekanan, pH, dan TDS, menjadikan PUTOI-TIK sebagai fasilitas pembelajaran berbasis <span className="text-blue-900">smart water management system</span>.
            </p>
          </div>
        </div> */}

        {/* Keunggulan PUTOI-TIK */}
        {/* <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl text-blue-900 mb-4">Keunggulan PUTOI-TIK</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keunggulan.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
