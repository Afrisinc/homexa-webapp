"use client";

import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as Icons from "lucide-react";

interface CategoryItemProps {
  category: Category;
  className?: string;
}

export function CategoryItem({ category, className }: CategoryItemProps) {
  // Dynamically get the icon component
  const IconComponent = (Icons[category.icon as keyof typeof Icons] || Icons.Package) as React.ComponentType<{ className?: string }>;

  return (
    <Link href={`/products?categoryId=${category.id}`}>
      <div
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md",
          className
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <IconComponent className="h-6 w-6" />
        </div>
        <span className="text-center text-xs font-medium">{category.name}</span>
      </div>
    </Link>
  );
}
