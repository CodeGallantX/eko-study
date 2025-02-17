import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Preloader from "@/components/Preloader"

export default function App () {
  return (
    <>
      <Preloader />
    <div>
      <Header />
      <Footer />
    </div>
    </>
  )
}