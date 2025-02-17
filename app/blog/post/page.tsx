'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

const BlogPage = () => {
  useEffect(() => {
    const blogHandyScript = document.createElement('script');
    blogHandyScript.src = 'https://www.bloghandy.com/api/bh_blogengine.js';
    blogHandyScript.async = true;
    blogHandyScript.onload = () => {
      (window as unknown as { bh_id: string }).bh_id = '609HmCqwe4Qx6DNDIxNA';
    };
    document.body.appendChild(blogHandyScript);

    const aclibScript = document.createElement('script');
    aclibScript.type = 'text/javascript';
    aclibScript.innerHTML = `
      aclib.runAutoTag({
        zoneId: 'z7tk79idot',
      });
    `;
    document.body.appendChild(aclibScript);

    return () => {
      document.body.removeChild(blogHandyScript);
      document.body.removeChild(aclibScript);
    };
  }, []);

  const page = {
    title: 'Blog',
    breadcrumb: [
      { name: 'Blog', path: '/blog' },
      { name: 'Posts', path: '/blog/post' },
    ]
  };

  return (
    <div className="font-sans">
      <Header />
      <Banner page={page} />
      <div className="p-12" id="bh-posts"></div>
      <Footer />
    </div>
  );
};

export default BlogPage;
