# PUTOI Components

Komponen-komponen untuk halaman PUTOI (Polytechnic Utility Treatment of Industrial Water) - Water Treatment Plant milik Jurusan Teknik Elektro, Politeknik Negeri Jakarta.

## Komponen Utama

### NavbarPUTOI
Navigasi khusus untuk halaman PUTOI dengan fitur:
- Logo PUTOI dengan branding PNJ
- Menu navigasi dengan smooth scroll
- Active section highlighting
- Integrasi dengan sistem autentikasi
- Responsive mobile menu

### HeroSection
Section hero dengan:
- Gradient background biru tua (#003d7a)
- Informasi utama PUTOI
- Quick stats (ISO Certified, 95% TDS Removal, IoT Monitoring)
- CTA buttons ke section penting
- Wave divider untuk transisi smooth

### AboutSection
Menampilkan informasi tentang PUTOI:
- Deskripsi lengkap PUTOI
- Visi dan Misi
- Fasilitas Teknologi (6 tahap filtrasi)
- Keunggulan PUTOI (5 keunggulan utama)

### OrganizationSection
Struktur organisasi PUTOI:
- Penjelasan struktur organisasi
- 5 posisi utama dengan deskripsi
- Prinsip Academic-Industrial Collaboration
- Visual cards dengan gradient

### PartnersSection
Kemitraan strategis PUTOI:
- Kemitraan Akademik (2 institusi)
- Kemitraan Industri (4 perusahaan)
- Kemitraan Pemerintah & Komunitas
- SDG 6 alignment

### WhyChooseUsSection
4 alasan memilih PUTOI:
- Industrial Grade Facility
- Integrated Training Ecosystem
- Quality Assurance & Standardization
- Sustainable and Smart Water System

### ServicesSection
Layanan pelatihan dan jasa kalibrasi:
- Kalibrasi Pressure
- Kalibrasi Transmitter
- Pelatihan SCADA IoT
- Pelatihan LabVIEW
- Pelatihan Kalibrasi dan Pengukuran

### ProductsSection
Produk air minum PUTOI:
- Air Minum Kemasan 600 ml
- Air Minum Kemasan 300 ml
- Air Galon 19 Liter

### ContactSection
Informasi kontak lengkap:
- Lokasi
- Email
- Telepon
- Website
- CTA untuk kolaborasi

### FooterSection
Footer khusus PUTOI dengan:
- Brand PUTOI
- Quick links
- Layanan
- Kontak lengkap
- Social media links

### ScrollToTop
Button floating untuk scroll to top dengan:
- Auto-hide ketika di atas
- Smooth scroll animation
- Hover effects

## Color Palette

Semua komponen menggunakan color palette biru tua yang konsisten:
- Primary: #003d7a (blue-900)
- Gradients: from-blue-900 to-blue-600
- Accents: blue-400, blue-50
- Text: gray-700, gray-600

## Struktur File

```
components/putoi/
├── NavbarPUTOI.tsx          # Navigasi khusus PUTOI
├── HeroSection.tsx           # Hero section
├── AboutSection.tsx          # Tentang Kami
├── OrganizationSection.tsx   # Organisasi
├── PartnersSection.tsx       # Partners
├── WhyChooseUsSection.tsx    # Why Choose Us
├── ServicesSection.tsx       # Pelatihan & Jasa
├── ProductsSection.tsx       # Produk
├── ContactSection.tsx        # Contact
├── FooterSection.tsx         # Footer
├── ScrollToTop.tsx           # Scroll to top button
└── README.md                 # Dokumentasi ini
```

## Penggunaan

Halaman PUTOI dapat diakses melalui route `#/putoi` dan tersedia di:
- Navbar utama (link PUTOI)
- Footer (link PUTOI)
- Direct URL: `#/putoi`

## Fitur Utama

1. **Responsive Design** - Semua komponen responsive untuk mobile, tablet, dan desktop
2. **Smooth Scrolling** - Navigation menggunakan smooth scroll
3. **Active Section Highlighting** - Menu navbar highlight sesuai section yang aktif
4. **Image Optimization** - Menggunakan Unsplash untuk gambar berkualitas
5. **Consistent Branding** - Color palette biru tua konsisten di semua komponen
6. **Accessibility** - Semantic HTML dan ARIA labels

## Teknologi

- React + TypeScript
- Tailwind CSS v4.0
- Lucide React Icons
- ShadCN/UI Components
- React Router (HashRouter)
