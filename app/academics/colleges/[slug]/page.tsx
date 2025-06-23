import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Header from "@/components/shared/Header";
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import { Metadata } from "next";

// College type
interface College {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  departments?: string[];
}

// Load college by slug
async function getCollege(slug: string): Promise<College | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "colleges.json");
    const jsonData = await fs.promises.readFile(filePath, "utf8");
    const colleges: College[] = JSON.parse(jsonData);
    return colleges.find((college) => college.slug === slug) || null;
  } catch (error) {
    console.error("Error loading college data:", error);
    return null;
  }
}

// ✅ Page Component with INLINE type for `params`
export default async function CollegeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const college = await getCollege(params.slug);

  if (!college) return notFound();

  return (
    <>
      <Header />
      <Banner
        page={{
          title: college.name,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Colleges", path: "/academics/colleges" },
            { name: college.name, path: `/academics/colleges/${college.slug}` },
          ],
        }}
      />

      <main className="min-h-screen px-6 lg:px-24 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                <Image
                  src={college.image}
                  alt={college.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
              <p className="text-gray-700 mb-6">{college.description}</p>

              {college.departments && college.departments.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Departments</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {college.departments.map((dept, index) => (
                      <li key={index} className="bg-gray-50 px-4 py-2 rounded">
                        {dept}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ✅ Static Params Generator
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const filePath = path.join(process.cwd(), "public", "data", "colleges.json");
  const jsonData = await fs.promises.readFile(filePath, "utf8");
  const colleges: College[] = JSON.parse(jsonData);

  return colleges.map((college) => ({
    slug: college.slug,
  }));
}

// ✅ Metadata Generator (with inline typing)
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const college = await getCollege(params.slug);

  if (!college) {
    return {
      title: "College Not Found",
      description: "The requested college does not exist",
    };
  }

  return {
    title: `${college.name} | EkoStudy`,
    description: college.description,
    openGraph: {
      title: college.name,
      description: college.description,
      url: `https://eko-study.vercel.app/academics/colleges/${college.slug}`,
      images: [
        {
          url: college.image,
          width: 800,
          height: 600,
          alt: `${college.name} at LASUSTECH`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: college.name,
      description: college.description,
      images: [college.image],
    },
  };
}
