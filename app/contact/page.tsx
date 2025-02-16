import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"

export default function App() {
  const page = {
      title: "Contact",
      breadcrumb: [
        {
          name: "Contact",
          path: "/contact",
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