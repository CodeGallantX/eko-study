import Preloader from "@/components/shared/Preloader"
import Header from "@/components/shared/Header"
import Banner from "@/components/shared/Banner"
import Footer from "@/components/shared/Footer"

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