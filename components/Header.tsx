"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const toggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="bg-[#4c5f4e] flex flex-row items-center justify-between py-4 px-6 lg:px-24 z-40">
      <Link href="/">
        <img src="/logo.png" alt="EkoStudy logo" className="h-10" />
      </Link>

      <nav className="hidden lg:flex gap-8">
        {[
          { label: "HOME", href: "/" },
          { label: "ABOUT", href: "/about" },
          {
            label: "ACADEMICS",
            submenu: [
              { label: "Departments", href: "/academics/departments" },
              { label: "Courses", href: "/academics/courses" },
              { label: "Programs", href: "/academics/programs" },
            ],
          },
          {
            label: "RESOURCES",
            submenu: [
              { label: "Book Store", href: "/resources/book-store" },
              { label: "Notes & PQs", href: "/resources/notes" },
              { label: "CBT", href: "/resources/cbt" },
              { label: "AI Chatbot", href: "/resources/chatbot" },
            ],
          },
          { label: "CONTACT", href: "/contact" },
          { label: "BLOG", href: "/blog" },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <Link
              href={item.href || "#"}
              className="text-white font-bold flex items-center gap-2 py-3"
            >
              {item.label}
              {item.submenu && <ChevronDown size={18} className="group-hover:rotate-180 transition" />}
            </Link>
            {item.submenu && (
              <motion.ul
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                className="absolute opacity-0 group-hover:opacity-100 left-0 top-6 mt-2 w-48 bg-[#4c5f4e] shadow-lg border-t-2 border-[#ffca0d] rounded-md overflow-hidden"
              >
                {item.submenu.map((sub, subIndex) => (
                  <li key={subIndex} className="py-2 px-4 text-white hover:text-[#ffca0d] transition">
                    <Link href={sub.href}>{sub.label}</Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        ))}
      </nav>
        <Link href="/auth/signup" className="hidden lg:block px-4 py-3 text-white border-2 border-white ml-auto">
            Get Started
        </Link>

      <button className="lg:hidden text-white" onClick={toggleSidebar}>
         <Menu size={28} />
      </button>

      {isSidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />
      )}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-3/4 bg-[#4c5f4e] p-6 z-50"
      >
        <button className="text-white mb-6" onClick={toggleSidebar}>
          <X size={28} />
        </button>
        <ul className="space-y-4">
          {[
            { label: "HOME", href: "/" },
            { label: "ABOUT", href: "/about" },
            {
              label: "ACADEMICS",
              submenu: [
                { label: "Departments", href: "/academics/departments" },
                { label: "Courses", href: "/academics/courses" },
                { label: "Programs", href: "/academics/programs" },
              ],
            },
            {
              label: "RESOURCES",
              submenu: [
                { label: "Book Store", href: "/resources/book-store" },
                { label: "Notes & PQs", href: "/resources/notes" },
                { label: "CBT", href: "/resources/cbt" },
                { label: "AI Chatbot", href: "/resources/chatbot" },
              ],
            },
            { label: "CONTACT", href: "/contact" },
            { label: "BLOG", href: "/blog" },
          ].map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center text-white font-bold cursor-pointer"
                onClick={() => toggleDropdown(item.label)}
              >
                {item.label}
                {item.submenu && (
                  <motion.div
                    animate={{ rotate: openDropdown === item.label ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus size={18} />
                  </motion.div>
                )}
              </div>
              {openDropdown === item.label && item.submenu && (
                <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4 mt-2">
                  {item.submenu.map((sub, subIndex) => (
                    <li key={subIndex} className="py-1 text-white hover:text-[#ffca0d] transition">
                      <Link href={sub.href}>{sub.label}</Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          ))}
        </ul>
      </motion.aside>
    </header>
  );
};

export default Header;
