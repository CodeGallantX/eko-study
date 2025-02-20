// import { FiFilter } from "react-icons/fi";

// export default function FilterBar({ filters, onFilterChange }) {
//   return (
//     <div className="flex flex-wrap gap-4 mb-6 justify-center">
//       <div className="relative">
//         <FiFilter className="absolute left-3 top-3 text-gray-500" />
//         <select
//           className="pl-10 pr-4 py-2 border rounded-md"
//           onChange={(e) => onFilterChange("department", e.target.value)}
//         >
//           <option value="">All Departments</option>
//           <option value="Engineering">Engineering</option>
//           <option value="Science">Science</option>
//           <option value="Business">Business</option>
//         </select>
//       </div>

//       <div className="relative">
//         <FiFilter className="absolute left-3 top-3 text-gray-500" />
//         <select
//           className="pl-10 pr-4 py-2 border rounded-md"
//           onChange={(e) => onFilterChange("level", e.target.value)}
//         >
//           <option value="">All Levels</option>
//           <option value="100">100 Level</option>
//           <option value="200">200 Level</option>
//           <option value="300">300 Level</option>
//         </select>
//       </div>
//     </div>
//   );
// }
