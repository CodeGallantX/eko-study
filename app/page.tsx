import Preloader from "@/components/shared/Preloader"
import Header from "@/components/shared/Header"
import Hero from "@/components/home/Hero"
import AboutSection from "@/components/home/AboutSection"
import Features from "@/components/home/Features"
import Testimonials from "@/components/home/Testimonials"
import Footer from "@/components/shared/Footer"

export default function App () {
  return (
    <>
      <Preloader />
    <div>
      <Header />
      <Hero />
      <AboutSection />
      <Features />
      <Testimonials />
      <Footer />
    </div>
    </>
  )
}