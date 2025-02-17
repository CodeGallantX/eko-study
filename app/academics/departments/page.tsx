import Preloader from "@/components/Preloader"
import Header from "@/components/Header"
import Banner from "@/components/Banner"
import Footer from "@/components/Footer"

export default function App() {

  const page = {
    title: "Departments",
    breadcrumb: [
      {
        name: "Departments",
        path: "/departments",
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