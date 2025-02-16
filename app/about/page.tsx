import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"

export default function App() {
  const page = {
      title: "About",
      breadcrumb: [
        {
          name: "About",
          path: "/about",
        }
      ]
    }
  

  return (
    <div>
      <Header />
      <Banner page={page} />
      <Footer />
    </div>
  )
}