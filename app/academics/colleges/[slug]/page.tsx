import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

interface College {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
}

async function fetchCollege(slug: string): Promise<College | undefined> {
  const filePath = path.join(process.cwd(), "data", "colleges.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const colleges: College[] = JSON.parse(jsonData || "[]");
  return colleges.find((c) => c.slug === slug);
}

export default async function CollegePage({ params }: { params: { slug: string } }) {
  const college = await fetchCollege(params.slug);

  if (!college) {
    notFound();
  }

  return (
    <>
      <Preloader />
      <Header />
      <Banner page={{ title: college.name, breadcrumb: [{ name: "Colleges", path: "/colleges" }, { name: college.name, path: `/colleges/${college.slug}` }] }} />
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-4">{college.name}</h1>
        <img src={college.image} alt={college.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
        <p className="text-gray-600 mt-4">{college.description}</p>
      </div>
      <Footer />
    </>
  );
}
