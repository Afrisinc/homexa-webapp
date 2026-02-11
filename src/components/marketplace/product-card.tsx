"use client";

import { Product, Seller } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  seller?: Seller;
  className?: string;
}

export function ProductCard({ product, seller, className }: ProductCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all hover:shadow-lg",
        className
      )}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.shipping?.free && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
              <Truck className="h-3 w-3" />
              Free Shipping
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-3 line-clamp-2 text-sm font-semibold transition-colors hover:text-primary">
            {product.title}
          </h3>
        </Link>

        {/* Price Range */}
        <div className="mb-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            per item
          </span>
        </div>

        {/* Seller Name with Verified Badge */}
        {seller && (
          <div className="mb-3 flex items-center gap-2">
            <span className="truncate text-xs font-medium text-muted-foreground">
              {seller.name}
            </span>
            {seller.verified && (
              <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5">
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Verified</span>
              </div>
            )}
          </div>
        )}

        {/* View Product Button */}
        <Button
          className="w-full gap-2"
          size="sm"
          asChild
        >
          <Link href={`/products/${product.id}`}>
            View Product
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
