import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Preloader from "@/components/Preloader";

export default function App() {
  const page = {
    title: "Other Products",
    breadcrumb: [{ name: "Products", path: "/Products" }],
  };

  return (
    <>
    <Preloader />
    <div>
      <Header />
      <Banner page={page} />
      <section className="px-10 xl:px-24 mt-24 flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-10 xl:gap-0">
       
      </section>
      <Footer />
    </div>
    </>
  );
}
