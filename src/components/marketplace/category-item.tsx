"use client";

import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as Icons from "lucide-react";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
  className?: string;
}

export function CategoryItem({ category, className }: CategoryItemProps) {
  // Dynamically get the icon component for fallback
  const IconComponent = (Icons[category.icon as keyof typeof Icons] || Icons.Package) as React.ComponentType<{ className?: string }>;

  return (
    <Link href={`/products?categoryId=${category.id}`}>
      <div
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border bg-card overflow-hidden transition-all hover:border-primary hover:shadow-md",
          className
        )}
      >
        {category.image?.url ? (
          <div className="relative w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <Image
              src={category.image.url}
              alt={category.image.alt_text || category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100px, 120px"
            />
          </div>
        ) : (
          <div className="w-full h-24 flex items-center justify-center bg-primary/10">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
        )}
        <span className="text-center text-xs font-medium px-2 py-1">{category.name}</span>
      </div>
    </Link>
  );
}
