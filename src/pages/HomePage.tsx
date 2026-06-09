import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedCourses } from "../components/FeaturedCourses";
import { ServicesSection } from "../components/ServicesSection";
import { NewsSection } from "../components/NewsSection";
import { GallerySection } from "../components/GallerySection";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                {/* <Categories /> */}
                <FeaturedCourses />
                <ServicesSection />
                <GallerySection />
                <NewsSection />
                {/* <Testimonials /> */}
                {/* <Newsletter /> */}
            </main>
            <Footer />
        </div>
    );
}
