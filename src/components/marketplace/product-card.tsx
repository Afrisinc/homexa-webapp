"use client";

import { Product, Seller } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Truck } from "lucide-react";
import { RatingStars } from "./rating-stars";
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
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-medium transition-colors hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.condition && product.condition !== "new" && (
            <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium capitalize text-yellow-800">
              {product.condition}
            </span>
          )}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <RatingStars rating={product.rating} size="sm" showNumber />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {seller && (
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="truncate">{seller.name}</span>
            {seller.verified && (
              <span className="text-blue-500">✓</span>
            )}
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          asChild
        >
          <Link href={`/products/${product.id}`}>
            <MessageCircle className="h-4 w-4" />
            Chat with seller
          </Link>
        </Button>
      </div>
    </Card>
  );
}
