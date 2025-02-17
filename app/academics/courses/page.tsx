import Preloader from "@/components/Preloader"
import Header from "@/components/Header"
import Banner from "@/components/Banner"
import Footer from "@/components/Footer"

export default function App() {

  const page = {
    title: "Courses",
    breadcrumb: [
      {
        name: "Courses",
        path: "/courses",
      }
    ]
  }

  return (
    <>
      <Preloader />
      <div>
        <Header />
        <Banner page={page} />
        <Footer />
      </div>
    </>
  )
}