import Link from "next/link";
import colleges from "@/data/colleges.json"; // Import JSON directly

export default function CollegesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Colleges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <Link key={college.id} href={`/colleges/${college.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:text-yellow-500 transition-colors">{college.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{college.description.substring(0, 80)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
