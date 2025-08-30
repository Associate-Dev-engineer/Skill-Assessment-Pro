import { Search } from "lucide-react";

export default function NavSearch() {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="search"
          placeholder="Search learners, assignments..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>
  );
}
