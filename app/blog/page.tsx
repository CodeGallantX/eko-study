import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Preloader from "@/components/shared/Preloader";
import Banner from "@/components/shared/Banner";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Importance of Intrinsic Motivation for Students",
    category: "Education",
    date: "July 14, 2024",
    author: {
      name: "Oliver Adetutu",
      avatar: "https://ik.imagekit.io/mshcgnjju/team9.png?updatedAt=1710713969991"
    },
    excerpt: "Exploring how intrinsic motivation leads to better learning outcomes and long-term success for students.",
    image: "/mtnight.webp"
  },
  {
    id: 2,
    title: "Innovative Teaching Methods for the Digital Age",
    category: "Teaching",
    date: "August 24, 2024",
    author: {
      name: "Kia Smith",
      avatar: "https://ik.imagekit.io/mshcgnjju/team9.png?updatedAt=1710713969991"
    },
    excerpt: "How modern educators are adapting their teaching strategies for today's digital-native students.",
    image: "/mtnight.webp"
  },
  // Add 4 more posts with similar structure
  ...Array(4).fill(null).map((_, i) => ({
    id: i + 3,
    title: `The Future of ${['STEM', 'Arts', 'Language', 'Vocational'][i]} Education`,
    category: ['Technology', 'Art & Design', 'Languages', 'Career'][i],
    date: new Date(2024, 8 + i, 1).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    author: {
      name: ['Dr. Emma Wilson', 'James Rodriguez', 'Sarah Chen', 'Prof. Ahmed Khan'][i],
      avatar: "https://ik.imagekit.io/mshcgnjju/team9.png?updatedAt=1710713969991"
    },
    excerpt: `Exploring emerging trends in ${['science and technology', 'creative arts', 'language acquisition', 'vocational training'][i]} education.`,
    image: "/mtnight.webp"
  }))
];

export default function BlogPage() {
  const page = {
    title: "Blog",
    breadcrumb: [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Blog",
        path: "/blog",
      }
    ]
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Banner page={page} />
        
        <main className="flex-grow">
          {/* Featured Post Section */}
          <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/upcoming-bg.jpg"
                alt="Featured post background"
                fill
                className="object-cover"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-full flex items-end p-8 sm:p-12"
              >
                <div className="text-white max-w-2xl">
                  <Link 
                    href="/blog/category/art-design" 
                    className="inline-block px-3 py-1 bg-[#92B76D] text-white rounded-full text-sm font-medium mb-4 hover:bg-[#7a9a59] transition-colors"
                  >
                    Art & Design
                  </Link>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                    <Link href="/blog/post" className="hover:text-[#92B76D] transition-colors">
                      The Importance of Intrinsic Motivation for Students
                    </Link>
                  </h1>
                  <div className="flex items-center mt-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={blogPosts[0].author.avatar}
                        alt={blogPosts[0].author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{blogPosts[0].author.name}</p>
                      <p className="text-sm text-gray-300">{blogPosts[0].date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Insights, strategies, and thought leadership on modern education
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/blog/post/${post.id}`} className="block">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <Link 
                          href={`/blog/category/${post.category.toLowerCase().replace(' ', '-')}`}
                          className="text-[#92B76D] text-sm font-medium hover:text-[#7a9a59]"
                        >
                          {post.category}
                        </Link>
                        <span className="text-gray-500 text-sm">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 hover:text-[#92B76D] transition-colors">
                        <Link href={`/blog/post/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="ml-3 text-sm font-medium">{post.author.name}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 border rounded-md bg-[#92B76D] text-white">
                  1
                </button>
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}