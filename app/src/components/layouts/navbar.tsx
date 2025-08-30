import Breadcrumb from "../Breadcrumb";
import Search from "../Search";
import UserProfile from "../UserProfile";
import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left section: Sidebar trigger and breadcrumb */}
        <nav className="flex items-center space-x-3">
          <SidebarTrigger className="cursor-pointer hover:bg-gray-100 rounded-md p-2 transition-colors duration-200" />
          <div className="hidden sm:block">
            <Breadcrumb />
          </div>
        </nav>

        {/* Center section: Search */}
        <div className="flex-1 max-w-md mx-4">
          <Search />
        </div>

        {/* Right section: User profile */}
        <div className="flex items-center">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
