import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { FlaskConical, CheckCircle2 } from "lucide-react";

export function TeknologiSection() {
  return (
    <section id="teknologi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Water Treatment Plant Card */}
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
          {/* Instrument Card */}
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
          {/* Controller dan Monitoring Card */}
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
      </div>
    </section>
  );
}
