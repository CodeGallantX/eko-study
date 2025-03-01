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
      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="text-center">
            <h6 className="text-lg font-semibold text-gray-600 mb-2">Mission</h6>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Knowledge for Every Path</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              At EkoStudy, we aim to provide LASUSTECH pre-degree students with the resources and support they need to excel academically. Our mission is to make learning accessible, engaging, and tailored to your unique educational journey. We believe in empowering students to reach their full potential through a blend of traditional and modern learning methods. By combining expert instruction, interactive lessons, and practical experiences, we aim to ignite a passion for learning in every student.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative h-96 w-full">
              <Image
                src="https://plus.unsplash.com/premium_photo-1714211557697-f3339798f89c"
                alt="EkoStudy Vision"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            {/* Vision Text */}
            <div>
              <h6 className="text-lg font-semibold text-gray-600 mb-2">Vision</h6>
              <p className="text-gray-700">
                To create a vibrant online learning community at LASUSTECH where students can thrive academically and personally. We strive to foster a culture of curiosity, collaboration, and continuous improvement. Our vision is to be the go-to platform for LASUSTECH students, providing them with the tools and resources they need to succeed in their academic journey and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Discover EkoStudy</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Watch our introductory video to see how we are transforming education at LASUSTECH. Learn more about our approach to learning and how we are making a difference in the lives of students.
            </p>

            {/* Video Embed */}
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <video
                src="/data/video/lasustech_video.mp4"
                controls
                className="w-full h-full object-cover"
                poster="/.jpg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the EkoStudy Community</h2>
          <p className="text-gray-700 mb-8">
            Ready to take your academic journey to the next level? Contact us today to learn more about how EkoStudy can help you achieve your goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#4c5f4e] text-white font-semibold rounded-lg hover:bg-[#3a4a3a] transition-colors"
          >
            <span>Contact Us</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  )
}