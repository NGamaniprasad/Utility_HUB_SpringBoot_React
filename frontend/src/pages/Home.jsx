import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import HowItWorks from "../components/home/HowItWorks";

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <AboutSection />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}

export default Home;