import Preloader from "@/components/Preloader"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import AboutSection from "@/components/AboutSection"
import Features from "@/components/Features"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

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