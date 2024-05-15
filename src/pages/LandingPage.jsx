import Features from "../features/landingPage/Features";
import Footer from "../features/landingPage/Footer";
import HeroSection from "../features/landingPage/HeroSection";
import Navbar from "../features/landingPage/Navbar";

function LandingPage() {
  return (
    <div className="mx-20 my-8">
      <Navbar />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}

export default LandingPage;
