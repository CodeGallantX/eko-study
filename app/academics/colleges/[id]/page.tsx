import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
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

// Fetch colleges from JSON
async function fetchColleges(): Promise<College[]> {
  const filePath = path.join(process.cwd(), "data", "colleges.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData || "[]");
}

// Fetch a single college based on ID
async function fetchCollegeById(id: number): Promise<College | undefined> {
  const colleges = await fetchColleges();
  return colleges.find((college) => college.id === id);
}

// Main College Page
export default async function CollegePage({ params }: { params: { id: string } }) {
  const collegeId = parseInt(params.id, 10);
  const college = await fetchCollegeById(collegeId);

  if (!college) {
    notFound(); // Automatically triggers Next.js 404 page
  }

  const page = {
    title: college.name,
    breadcrumb: [
      { name: "Colleges", path: "/colleges" },
      { name: college.name, path: `/colleges/${college.id}` },
    ],
  };

  return (
    <>
      <Preloader />
      <Header />
      <Banner page={page} />
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-4">{college.name}</h1>
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <p className="text-gray-600 mt-4">{college.description}</p>
      </div>
      <Footer />
    </>
  );
}
