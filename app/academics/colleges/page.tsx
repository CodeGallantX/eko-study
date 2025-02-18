import path from "path";
import fs from "fs";
import Link from "next/link";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

interface College {
  id: number;
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

  const page = {
    title: "Colleges",
    breadcrumb: [{ name: "Colleges", path: "/colleges" }],
  };

  return (
    <>
      <Preloader />
      <Header />
      <Banner page={page} />
      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Colleges
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{college.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {college.description.substring(0, 80)}...
                  </p>
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
