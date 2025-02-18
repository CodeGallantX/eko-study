import { notFound } from "next/navigation";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import colleges from "@/data/colleges.json"; // ✅ Import JSON directly
import { PageProps } from "next";

interface College {
  id: number;
  name: string;
  description: string;
  image: string;
}

// ✅ Fix: Define `params` correctly
export default function CollegePage({ params }: PageProps<{ id: string }>) {
  const collegeId = Number(params.id); // ✅ Ensure correct parsing
  const college = colleges.find((c) => c.id === collegeId);

  if (!college) {
    notFound(); // 🔴 Show 404 page if not found
  }

  const page = {
    title: college.name,
    breadcrumb: [
      { name: "Colleges", path: "/academics/colleges" },
      { name: college.name, path: `/academics/colleges/${college.id}` },
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
