import { NAV_LINKS } from "@/utils/constants";
import Link from "next/link";

export default function MainNavigation() {
  return (
    <nav className="flex items-center gap-4 max-md:hidden">
      {NAV_LINKS.map(({ href, title }) => (
        <Link key={href} href={href}>
          {title}
        </Link>
      ))}
    </nav>
  );
}
