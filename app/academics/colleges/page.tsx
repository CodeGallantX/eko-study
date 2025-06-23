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

async function getColleges(): Promise<College[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "colleges.json");
    const jsonData = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error loading colleges data:", error);
    return [];
  }
}

export default async function CollegesPage() {
  const colleges = await getColleges();

  if (!colleges || colleges.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">No colleges data available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <Preloader />
      <Header />
      <Banner 
        page={{ 
          title: "Colleges", 
          breadcrumb: [{ name: "Home", path: "/" }, { name: "Colleges", path: "/academics/colleges" }] 
        }} 
      />
      
      <main className="min-h-screen px-6 lg:px-24 py-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">LASUSTECH Colleges</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <Link 
                key={college.id}
                href={`/academics/colleges/${college.slug}`}
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={college.image}
                    alt={college.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {college.name}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {college.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
