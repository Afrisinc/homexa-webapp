import { NAV_LINKS } from "@/utils/constants";
import Link from "next/link";

export default function MainNavigation() {
  return (
    <nav className="flex items-center gap-6 max-md:hidden">
      {NAV_LINKS.map(({ href, title }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
