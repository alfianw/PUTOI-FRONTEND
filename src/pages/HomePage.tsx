import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedCourses } from "../components/FeaturedCourses";
import { Features } from "../components/Features";
import { Stats } from "../components/Stats";
import { NewsSection } from "../components/NewsSection";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import { BackendStatus } from "../components/BackendStatus";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <BackendStatus />
            <Navbar />
            <main>
                <Hero />
                <Categories />
                <FeaturedCourses />
                <Features />
                <NewsSection />
                <Stats />
                <Testimonials />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}
