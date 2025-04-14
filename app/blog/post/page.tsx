import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Script from 'next/script';

const BlogPage = () => {
  const page = {
    title: 'Blog',
    breadcrumb: [
      { name: 'Blog', path: '/blog' },
      { name: 'Posts', path: '/blog/post' },
    ]
  };

  return (
    <div className="font-sans">
      <Script>
        var bh_id = "609HmCqwe4Qx6DNDIxNA";</Script>

      <Script src="https://www.bloghandy.com/api/bh_blogengine.js"></Script>
      <Header />
      <Banner page={page} />
      <div className="p-12" id="bh-posts"></div>
      <Footer />
    </div>
  );
};

export default BlogPage;
