"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "@/components/marketplace/search-bar";
import { CategoryItem } from "@/components/marketplace/category-item";
import { ProductCard } from "@/components/marketplace/product-card";
import { categories } from "@/data/categories";
import { sellers } from "@/data/sellers";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { productsService } from "@/services/api";
import { Product } from "@/lib/types";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsService.getProducts();
        setProducts(response.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
  }, [searchQuery, products]);

  // Get recommended products (newest 8 products)
  const recommendedProducts = useMemo(() => {
    const productsWithSellers = filteredProducts.map((product) => ({
      product,
      seller: sellers.find((s) => s.id === product.sellerId),
    }));
    return productsWithSellers.slice(0, 8);
  }, [filteredProducts]);

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Find Your Perfect Product
            </h1>
            <p className="text-muted-foreground">
              Shop from thousands of trusted sellers worldwide
            </p>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            className="mx-auto max-w-2xl"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {searchQuery ? "Search Results" : "Recommended for You"}
            </h2>
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/products">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10">
              <p className="mb-2 text-lg font-medium text-destructive">Error loading products</p>
              <p className="mb-4 text-sm text-muted-foreground">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recommendedProducts.map(({ product, seller }) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  seller={seller}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="mb-2 text-lg font-medium">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
