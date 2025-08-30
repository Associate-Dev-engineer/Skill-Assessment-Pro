import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, Link } from "react-router";

export default function AppBreadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split("/").filter(Boolean); // ["dashboard", "settings"]

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize words

    return (
      <BreadcrumbItem key={href}>
        <BreadcrumbLink asChild>
          <Link to={href}>{label}</Link>
        </BreadcrumbLink>
        {index < segments.length - 1 && <BreadcrumbSeparator />}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="Home">
          <BreadcrumbLink asChild>
            <Link to="/" className="text-md font-medium">
              Home
            </Link>
          </BreadcrumbLink>
          {segments.length > 0 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
        {breadcrumbs}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
