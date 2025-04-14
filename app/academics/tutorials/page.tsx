import Preloader from "@/components/shared/Preloader"
import Header from "@/components/shared/Header"
import Banner from "@/components/shared/Banner"
import Footer from "@/components/shared/Footer"

export default function App() {

  const page = {
    title: "Tutorials",
    breadcrumb: [
      {
        name: "Tutorials",
        path: "/tutorials",
      }
    ]
  }

  return (
    <>
      <Preloader />
      <div>
        <Header />
        <Banner page={page} />
        <div>
          Book a tutor
        </div>
        <Footer />
      </div>
    </>
  )
}