"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function BlogPage() {
  useEffect(() => {
    const blogHandyScript = document.createElement("script");
    blogHandyScript.src = "https://www.bloghandy.com/api/bh_blogengine.js";
    blogHandyScript.async = true;
    document.body.appendChild(blogHandyScript);

    const aclibScript = document.createElement("script");
    aclibScript.type = "text/javascript";
    aclibScript.innerHTML = `
      if (window.aclib) {
        window.aclib.runAutoTag({ zoneId: 'z7tk79idot' });
      }
    `;
    document.body.appendChild(aclibScript);

    // Cleanup function
    return () => {
      if (blogHandyScript.parentNode) {
        blogHandyScript.parentNode.removeChild(blogHandyScript);
      }
      if (aclibScript.parentNode) {
        aclibScript.parentNode.removeChild(aclibScript);
      }
    };
  }, []);

  const page = {
    title: "Posts",
    breadcrumb: [
      { name: "Blog", path: "/blog" },
      { name: "Posts", path: "/blog/post" },
    ],
  };

  return (
    <div className="font-sans">
      <Header />
      <Banner page={page} />
      <div className="p-12" id="bh-posts"></div>
      <Footer />
    </div>
  );
}
