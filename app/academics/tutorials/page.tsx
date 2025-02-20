import Preloader from "@/components/Preloader"
import Header from "@/components/Header"
import Banner from "@/components/Banner"
import Footer from "@/components/Footer"

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
          
        </div>
        <Footer />
      </div>
    </>
  )
}