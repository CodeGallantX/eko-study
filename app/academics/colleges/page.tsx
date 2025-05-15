import fs from "fs";
import path from "path";
import Link from "next/link";
import Preloader from "@/components/shared/Preloader";
import Header from "@/components/shared/Header";
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import Footer from "@/components/shared/Footer";

interface College {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
}

async function fetchColleges(): Promise<College[]> {
  const filePath = path.join(process.cwd(), "data", "colleges.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData || "[]");
}

export default async function CollegesPage() {
  const colleges = await fetchColleges();

  return (
    <>
      <Preloader />
      <Header />
      <Banner page={{ title: "Colleges", breadcrumb: [{ name: "Colleges", path: "/academics/colleges" }] }} />
      <div className="min-h-screen px-6 lg:px-24 py-10 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {colleges.map((college) => (
            // <Link key={college.slug} href={`/colleges/${college.slug}`}>
            <Link key={college.slug} href="">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                <Image
 src={college.image}
 alt={college.name}
 className="w-full h-48 object-cover"
 width={400} 
 height={200} 
 />
                  <h2 className="text-xl font-semibold">{college.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{college.description.substring(0, 80)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
