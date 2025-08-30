// Sidebar
export interface MenuItem {
  label: string;
  path?: string;
  roles: string[];
  icon?: React.ReactNode;
  isGroupLabel?: boolean;
}
export type Role = "admin" | "mentor" | "user";

// Login form
export interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}
