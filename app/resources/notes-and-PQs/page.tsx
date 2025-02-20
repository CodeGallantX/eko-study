import fs from "fs";
import path from "path";
import ClientComponent from "./ClientComponent";

// Load static data at build time
const filePath = path.join(process.cwd(), "data", "courses.json");
const jsonData = fs.readFileSync(filePath, "utf8");
const courses = JSON.parse(jsonData);

// Extract unique colleges & departments
const colleges = [...new Set(courses.map((c: Course) => c.college))];


export default function NotesPage() {
  return (
    <ClientComponent courses={courses} colleges={colleges} />
  );
}
