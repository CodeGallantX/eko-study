// import fs from "fs";
// import path from "path";
// import ClientComponent from "./ClientComponent";

// // Define Course type
// interface Course {
//   id: number;
//   title: string;
//   code: string;
//   college: string;
//   department: string;
//   level: string;
//   url: string;
// }

// // Load static data at build time
// const filePath = path.join(process.cwd(), "data", "courses.json");
// const jsonData = fs.readFileSync(filePath, "utf8");
// const courses: Course[] = JSON.parse(jsonData); // Explicitly type courses

// // Extract unique colleges
// const colleges = [...new Set(courses.map((c: Course) => c.college))];

export default function NotesPage() {
//   return <ClientComponent courses={courses} colleges={colleges} />;
  return(
    <div>
      Hello
    </div>
  )
}