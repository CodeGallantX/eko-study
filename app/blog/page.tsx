import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Link from 'next/link';

export default function App() {
  const page = {
    title: "Blog",
    breadcrumb: [
      {
        name: "Blog",
        path: "/blog",
      }
    ]
  }


  return (
    <div>
      <Header />
      <Banner page={page} />
      <main>
        <section className="relative pt-32 pb-16 mt-20 px-10 xl:px-24">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-2xl mx-10 xl:mx-24 h-96 bg-fixed"
            style={{ backgroundImage: "url('/upcoming-bg.jpg')" }}
          ></div>
          <div className="relative">
            <div className="relative -top-32">
              <Link
                href="/blog/post"
                className="absolute inset-0 bg-black/20 h-96 rounded-2xl flex items-center justify-start">
                <div className="text-left text-white p-8">
                  <Link href="#" className="text-[#92B76D]">
                    Art & Design
                  </Link>
                  <h3 className="text-4xl font-bold mt-4">
                    The Importance of Intrinsic <br /> Motivation for Students
                  </h3>
                  <div className="flex items-center justify-start mt-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://ik.imagekit.io/mshcgnjju/team9.png?updatedAt=1710713969991"
                      alt="Author - EkoStudy"
                    />
                    <div className="ml-4 text-sm">
                      <h6>Oliver Adetutu</h6>
                      <span>July 14, 2024</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>


        <section className="relative pb-10 mt-64">
          <div className="px-10 xl:px-24">
            <div className="flex flex-wrap -mx-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8" key={item}>
                  <div className="group bg-white shadow-md">
                    <Link
                      href="/blog/post/">
                      <img
                        className="mb-4"
                        src="mtnight.webp"
                        alt="Blog Thumbnail"
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex justify-between text-gray-500 mb-4">
                        <Link href="/blog/post/" className="hover:text-[#92B76D]">
                          Education
                        </Link>
                        <span>August 24, 2024</span>
                      </div>
                      <h4 className="text-xl font-bold mb-4">
                        <Link href="blog/post/" className="hover:text-[#92B76D] text-2xl">
                          Title
                        </Link>
                      </h4>
                      <div className="flex items-center">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://ik.imagekit.io/mshcgnjju/team9.png?updatedAt=1710713969991"
                          alt="User -EkoStudy"
                        />
                        <span className="ml-4">Kia Smith</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}