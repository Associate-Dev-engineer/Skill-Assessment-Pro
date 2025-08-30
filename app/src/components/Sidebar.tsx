import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  ClipboardList,
  BarChart3,
  FileText,
  Settings,
  SunMedium,
  SunMedium as SunMediumIcon,
} from "lucide-react";
import UserProfile from "./UserProfile";
import { type MenuItem } from "@/types/components";
import { useAppSelector } from "@/store/hook";

export const menuItems: MenuItem[] = [
  {
    label: "Main Navigation",
    isGroupLabel: true,
    roles: ["admin", "mentor", "user"],
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "mentor", "user"],
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Assignments",
    path: "/assignments",
    roles: ["mentor", "admin"],
    icon: <ClipboardList size={20} />,
  },
  {
    label: "Reports",
    path: "/reports",
    roles: ["mentor", "admin"],
    icon: <BarChart3 size={20} />,
  },
  {
    label: "My Submissions",
    path: "/submissions",
    roles: ["user"],
    icon: <FileText size={20} />,
  },
  {
    label: "Administration",
    isGroupLabel: true,
    roles: ["admin"],
  },
  {
    label: "User Management",
    path: "/users",
    roles: ["admin"],
    icon: <Users size={20} />,
  },
  {
    label: "Roles",
    path: "/roles",
    roles: ["admin"],
    icon: <Shield size={20} />,
  },
  {
    label: "Permissions",
    path: "/permissions",
    roles: ["admin"],
    icon: <Key size={20} />,
  },
  {
    label: "Batch Menu",
    isGroupLabel: true,
    roles: ["mentor"],
  },
  {
    label: "Batch",
    path: "/batch-settings",
    roles: ["mentor"],
    icon: <SunMediumIcon size={20} />,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { role } = useAppSelector((state) => state.user);
  // ! USER ROLE - FOR SIDEBAR
  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="px-8 py-4 border-b border-gray-100">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRM7aXXL3SX77wi9POOPPQS2xMDGHODvy6w&s"
          alt="Dashboard Icon"
          className="w-24 h-12 object-contain mix-blend-multiply"
        />
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="flex-1 py-4">
        <h1 className="text-lg font-semibold ml-9">Skill Assess Pro</h1>
        {filteredMenu.reduce((groups, item) => {
          if (item.isGroupLabel) {
            groups.push(
              <SidebarGroup key={item.label}>
                <h2 className="text-xs font-semibold text-gray-500 pl-8 py-2">
                  {item.label}
                </h2>
              </SidebarGroup>
            );
          } else if (item.path) {
            const isActive = location.pathname === item.path;
            groups.push(
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 pl-8 py-3 rounded-lg transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <span
                  className={`
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-gray-700"
                    }
                  `}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          }
          return groups;
        }, [] as React.JSX.Element[])}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-gray-100 p-4">
        <div className="space-y-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <SunMedium size={18} />
            <span className="text-sm font-medium">Dark Mode</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          {/* Avatar Section */}
          <UserProfile />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
