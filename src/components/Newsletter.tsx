import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20">
          <div className="inline-flex w-20 h-20 bg-white/20 rounded-2xl items-center justify-center mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl text-white mb-4">
            Dapatkan Update Terbaru
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Berlangganan newsletter kami untuk mendapatkan informasi kursus baru, promo spesial, dan tips pembelajaran
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Masukkan email Anda..."
              className="flex-1 h-14 bg-white/20 border-white/30 text-white placeholder:text-blue-200 backdrop-blur"
            />
            <Button className="h-14 px-8 bg-white text-blue-900 hover:bg-blue-50">
              Berlangganan
            </Button>
          </div>

          <p className="text-sm text-blue-200 mt-4">
            Kami menghormati privasi Anda. Unsubscribe kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
