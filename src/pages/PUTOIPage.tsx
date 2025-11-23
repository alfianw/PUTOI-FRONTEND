import { NavbarPUTOI } from "../components/putoi/NavbarPUTOI";
import { HeroSection } from "../components/putoi/HeroSection";
import { AboutSection } from "../components/putoi/AboutSection";
import { OrganizationSection } from "../components/putoi/OrganizationSection";
import { PartnersSection } from "../components/putoi/PartnersSection";
import { WhyChooseUsSection } from "../components/putoi/WhyChooseUsSection";
import { ServicesSection } from "../components/putoi/ServicesSection";
import { ProductsSection } from "../components/putoi/ProductsSection";
import { ContactSection } from "../components/putoi/ContactSection";
import { FooterSection } from "../components/putoi/FooterSection";
import { ScrollToTop } from "../components/putoi/ScrollToTop";

export default function PUTOIPage() {
    return (
        <div className="min-h-screen bg-white">
            <NavbarPUTOI />
            <main>
                <HeroSection />
                <AboutSection />
                <WhyChooseUsSection />
                <ServicesSection />
                <ProductsSection />
                <OrganizationSection />
                <PartnersSection />
                <ContactSection />
            </main>
            <FooterSection />
            <ScrollToTop />
        </div>
    );
}
