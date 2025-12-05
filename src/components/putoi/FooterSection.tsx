import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "../../assets/logo-putoi-footer.png";

export function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="PNJ Logo" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 mb-4">
              Water Treatment Plant berstandar industri milik Jurusan Teknik Elektro – Politeknik Negeri Jakarta.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-900 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-900 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-900 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-900 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-900 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div></div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Jl. Prof. Dr. G.A. Siwabessy, Kampus Baru UI, Depok 16425</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>(021) 7270036</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>putoi@pnj.ac.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 flex-shrink-0" />
                <span>putoi.pnj.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 PUTOI - Politeknik Negeri Jakarta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
