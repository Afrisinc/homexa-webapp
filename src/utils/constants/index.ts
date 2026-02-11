import { Route } from "next";

type NavLink = {
  href: Route;
  title: string;
};

export const NAV_LINKS = [
  { href: "/curated", title: "Curated" },
  { href: "/categories", title: "Categories" },
  { href: "/sellers", title: "Sellers" },
  { href: "/auction", title: "Auction" },
] satisfies NavLink[];

// Currency formatting utility
export const formatCurrency = (amount: number, currency: string = "USD"): string => {
  if (currency === "RWF") {
    return `${amount.toLocaleString()} Fr`;
  }
  return `$${amount.toLocaleString()}`;
};
