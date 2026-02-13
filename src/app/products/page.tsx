"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/marketplace/product-card";
import { FilterPanel } from "@/components/marketplace/filter-panel";
import { SearchBar } from "@/components/marketplace/search-bar";
import { FilterOptions, Product, Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { productsService, categoriesService } from "@/services/api";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

export const dynamic = 'force-dynamic';

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // API state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterOptions>(() => ({
    q: searchParams.get("q") || undefined,
    categoryId: searchParams.get("categoryId") || undefined,
    currency: searchParams.get("currency") || undefined,
    brand: searchParams.get("brand") || undefined,
    model: searchParams.get("model") || undefined,
    priceMin: searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : undefined,
    priceMax: searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : undefined,
  }));

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await categoriesService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsService.getProducts(filters);
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    const newUrl = params.toString()
      ? `/products?${params.toString()}`
      : "/products";

    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  // Map products - seller info comes from API response
  const productsWithSellers = products.map((product) => ({
    product,
    seller: product.seller,
  }));

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setMobileFiltersOpen(false);
  };

  const handleSearch = (query: string) => {
    setFilters({ ...filters, q: query });
  };

  // Get current category name
  const currentCategory = filters.categoryId
    ? categories.find((c) => c.id === filters.categoryId)
    : null;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              {currentCategory ? currentCategory.name : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              {loading ? 'Loading...' : `${products.length} products found`}
            </p>
          </div>
          <SearchBar
            value={filters.q}
            onChange={(value) => setFilters({ ...filters, q: value })}
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-4">
              <FilterPanel filters={filters} onFilterChange={setFilters} categories={categories} />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="mb-4 lg:hidden">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    className="border-0 shadow-none"
                    categories={categories}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Loading State */}
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : error ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10">
                <p className="mb-2 text-lg font-medium text-destructive">Error loading products</p>
                <p className="mb-4 text-sm text-muted-foreground">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : productsWithSellers.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {productsWithSellers.map(({ product, seller }) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    seller={seller}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
                <p className="mb-2 text-lg font-medium">No products found</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({})}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
