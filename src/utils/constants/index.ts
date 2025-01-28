import { Route } from "next";

type NavLink = {
  href: Route;
  title: string;
};

export const NAV_LINKS = [
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
  { href: "/blog", title: "Blog" },
] satisfies NavLink[];
