'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useUser } from '@supabase/auth-helpers-react';

export default function Header() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const user = useUser();

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarVisible(false);
      }
    };

    if (isSidebarVisible) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarVisible]);

  return (
    <header className="bg-[#4c5f4e] fixed flex flex-row items-center justify-between py-2 px-6 md:px-12 lg:px-20 xl:px-24 z-40 w-full">
      <Link href="/" className="w-44 lg:w-64">
        <Image
          src="/images/yellow-logo.png"
          alt="EkoStudy Logo"
          width={80}
          height={20}
          className="w-40"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/yellow-logo.png';
          }}
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8">
        {[
          { label: "HOME", href: "/" },
          { label: "ABOUT", href: "/about" },
          {
            label: "ACADEMICS",
            submenu: [
              { label: "Courses", href: "/academics/courses" },
              { label: "Colleges", href: "/academics/colleges" },
              { label: "Departments", href: "/academics/departments" },
            ],
          },
          {
            label: "RESOURCES",
            submenu: [
              { label: "Notes", href: "/resources/notes" },
              { label: "Past Questions", href: "/resources/Past-Questions" },
              { label: "Products", href: "/resources/products" },
            ],
          },
          { label: "CONTACT", href: "/contact" },
          { label: "BLOG", href: "/blog" },
        ].map((item, index) => (
          <div key={index} className="relative">
            <Link
              href={item.href || "#"}
              className="text-white font-bold flex items-center gap-2 py-8"
              onMouseEnter={() => setHoveredMenu(item.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {item.label}
              {item.submenu && (
                <ChevronDown
                  size={18}
                  className={`transition duration-500 ease-in-out font-bold ${
                    hoveredMenu === item.label ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </Link>

            {item.submenu && hoveredMenu === item.label && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 top-20 mt-2 w-48 bg-[#4c5f4e] shadow-lg border-t-2 border-[#ffca0d] overflow-hidden z-40"
                onMouseEnter={() => setHoveredMenu(item.label)}
                onMouseLeave={() => setHoveredMenu(null)}
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

      <Link
        href={user ? "/dashboard" : "/auth/signup"}
        className="hidden lg:block px-4 py-3 text-white border-2 border-white uppercase font-semibold"
      >
        {user ? "Dashboard" : "Get Started"}
      </Link>

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-white" onClick={toggleSidebar}>
        <Menu size={28} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isSidebarVisible && (
        <div className="block lg:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />
      )}

      {/* Mobile Sidebar Navigation */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="block lg:hidden fixed top-0 left-0 h-full w-3/4 bg-[#4c5f4e] p-6 z-50"
      >
        <div className="relative flex flex-row items-start justify-between py-4">
          <Link href="/" className="w-32" onClick={toggleSidebar}>
            <Image
              src="/images/yellow-logo.png"
              alt="EkoStudy Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/yellow-logo.png';
              }}
            />
          </Link>
          <button className="text-white mb-6 hover:rotate-135 transition-all duration-200 ease-in-out" onClick={toggleSidebar}>
            <X size={28} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <ul className="space-y-4">
          {[
            { label: "HOME", href: "/" },
            { label: "ABOUT", href: "/about" },
            {
              label: "ACADEMICS",
              submenu: [
                { label: "Courses", href: "/academics/courses" },
                { label: "Colleges", href: "/academics/colleges" },
                { label: "Departments", href: "/academics/departments" },
              ],
            },
            {
              label: "RESOURCES",
              submenu: [
                { label: "Notes", href: "/resources/notes" },
                { label: "Past Questions", href: "/resources/Past-Questions" },
                { label: "Products", href: "/resources/products" },
              ],
            },
            { label: "CONTACT", href: "/contact" },
            { label: "BLOG", href: "/blog" },
          ].map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center text-white font-bold cursor-pointer"
                onClick={() => setHoveredMenu(hoveredMenu === item.label ? null : item.label)}
              >
                <Link href={item.href || "#"} onClick={toggleSidebar}>
                  {item.label}
                </Link>
                {item.submenu && (
                  <motion.div
                    animate={{ rotate: hoveredMenu === item.label ? 135 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus size={24} className="font-normal" />
                  </motion.div>
                )}
              </div>

              {hoveredMenu === item.label && item.submenu && (
                <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4 mt-2">
                  {item.submenu.map((sub, subIndex) => (
                    <li key={subIndex} className="py-1 text-white hover:text-[#ffca0d] transition">
                      <Link href={sub.href} onClick={toggleSidebar}>
                        {sub.label}
                      </Link>
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
}