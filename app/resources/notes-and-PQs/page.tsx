import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"

export default function App() {
  const page = {
      title: "Notes & Past Questions",
      breadcrumb: [
        {
          name: "Notes & Past Questions",
          path: "/notes-and-PQs",
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