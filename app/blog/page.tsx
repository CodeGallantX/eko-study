// app/blog/page.tsx
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Banner from '@/components/shared/Banner';

// Dynamically import components with error boundaries
const Preloader = dynamic(() => import('@/components/shared/Preloader'), { 
  ssr: false,
  loading: () => <div className="preloader-placeholder" />
});

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false,
  loading: () => <div />,
});

// Types
interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  excerpt: string;
  image: string;
}

interface PageData {
  title: string;
  breadcrumb: Array<{
    name: string;
    path: string;
  }>;
}

// Mock data
const generateMockPosts = (): BlogPost[] => {
  const categories = ['Education', 'Teaching', 'Technology', 'Art & Design', 'Languages', 'Career'];
  const authors = [
    { name: 'Oliver Adetutu', avatar: 'https://ik.imagekit.io/mshcgnjju/team9.png' },
    { name: 'Kia Smith', avatar: 'https://ik.imagekit.io/mshcgnjju/team9.png' },
    { name: 'Dr. Emma Wilson', avatar: 'https://ik.imagekit.io/mshcgnjju/team9.png' },
    { name: 'James Rodriguez', avatar: 'https://ik.imagekit.io/mshcgnjju/team9.png' },
  ];

  return Array(6).fill(null).map((_, i) => ({
    id: i + 1,
    title: i === 0 
      ? 'The Importance of Intrinsic Motivation for Students' 
      : `The Future of ${categories[i % categories.length]} Education`,
    category: categories[i % categories.length],
    date: new Date(2024, 6 + i, 1).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    author: authors[i % authors.length],
    excerpt: i === 0
      ? 'Exploring how intrinsic motivation leads to better learning outcomes and long-term success for students.'
      : `Exploring emerging trends in ${categories[i % categories.length].toLowerCase()} education.`,
    image: '/mtnight.webp'
  }));
};

export default function BlogPage() {
  const pageData: PageData = {
    title: "Blog",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" }
    ]
  };

  const blogPosts = generateMockPosts();
  const featuredPost = blogPosts[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Banner page={pageData} />
        
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
              
              {MotionDiv && (
                <MotionDiv 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-full flex items-end p-8 sm:p-12"
                >
                  <div className="text-white max-w-2xl">
                    <Link 
                      href={`/blog/category/${featuredPost.category.toLowerCase().replace(' ', '-')}`}
                      className="inline-block px-3 py-1 bg-[#92B76D] text-white rounded-full text-sm font-medium mb-4 hover:bg-[#7a9a59] transition-colors"
                    >
                      {featuredPost.category}
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                      <Link href={`/blog/post/${featuredPost.id}`} className="hover:text-[#92B76D] transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h1>
                    <div className="flex items-center mt-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-300">{featuredPost.date}</p>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}
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

            {MotionDiv && (
              <MotionDiv
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {blogPosts.map((post) => (
                  <MotionDiv 
                    key={post.id}
                    variants={itemVariants}
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
                          {post.title}
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
                  </MotionDiv>
                ))}
              </MotionDiv>
            )}

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