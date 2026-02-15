"use client";

import { useState, useMemo, useEffect } from "react";
import { CategoryItem } from "@/components/marketplace/category-item";
import { ProductCard } from "@/components/marketplace/product-card";
import { ArrowRight, Check, Search, Compass, MessageSquare, Handshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productsService, categoriesService, sellersService } from "@/services/api";
import { Product, Category, type Seller } from "@/lib/types";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [sellersLoading, setSellersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch sellers from API
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setSellersLoading(true);
        const response = await sellersService.getSellers(1, 5);
        setSellers(response.data || []);
      } catch (err) {
        console.error('Error fetching sellers:', err);
        setSellers([]);
      } finally {
        setSellersLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const filters = selectedCategoryId ? { categoryId: selectedCategoryId } : undefined;
        const response = await productsService.getProducts(filters);
        console.log("Products ---->", response)
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-6 inline-flex w-fit">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  New Generation Marketplace
                </span>
              </div>

              {/* Heading */}
              <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-5xl xl:text-6xl">
                Verified Suppliers & Products You Can{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Trust.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mb-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Discover a curated universe of high-end electronics, premium fashion, and home innovations from global trusted partners.
              </p>

              {/* CTA Buttons */}
              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/seller">Become a Seller</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div>
                  <div className="text-2xl font-bold">12k+</div>
                  <div className="text-sm text-muted-foreground">Curated Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Verified Sellers</div>
                </div>
              </div>
            </div>

            {/* Right Column - Phone Mockup Placeholder */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                {/* Phone Mockup Container */}
                <div className="aspect-[9/19] rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-950 p-2 shadow-2xl">
                  {/* Phone Notch */}
                  <div className="absolute left-1/2 top-0 z-10 h-7 w-40 -translate-x-1/2 rounded-b-3xl bg-black"></div>

                  {/* Phone Screen */}
                  <div className="h-full rounded-3xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-end p-6 relative overflow-hidden">
                    {/* Decorative gradient circle */}
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                    {/* Verified Badge */}
                    <div className="relative z-10 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md px-4 py-2 text-white">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-xs font-semibold">Verified Authenticity</span>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-purple-600/20 blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search & Filter Bar */}
      <section className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1 sm:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products, sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4"
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            <ProductGridSkeleton count={8} />
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

      {/* Verified Sellers Highlight Section */}
      <section className="border-t bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Verified Sellers</h2>
            <p className="text-sm text-muted-foreground">
              Discover trusted sellers offering quality products with verified authenticity
            </p>
          </div>

          {sellersLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-lg border bg-card p-6 animate-pulse">
                  <div className="mb-4 h-16 w-16 rounded-full bg-muted" />
                  <div className="mb-2 h-4 w-24 rounded bg-muted" />
                  <div className="mb-4 h-8 w-full rounded bg-muted" />
                  <div className="h-9 w-full rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {sellers.slice(0, 5).map((seller) => (
                <div
                  key={seller.id}
                  className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                >
                  {/* Seller Logo/Avatar */}
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20">
                    <div className="text-2xl font-bold text-primary">
                      {seller.name?.[0] || "S"}
                    </div>
                  </div>

                  {/* Seller Name */}
                  <h3 className="mb-2 font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {seller.name}
                  </h3>

                  {/* Short Description */}
                  <p className="mb-4 line-clamp-2 text-xs text-muted-foreground">
                    Trusted seller with verified authenticity and quality products
                  </p>

                  {/* View Profile Button */}
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/sellers/${seller.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">
              Simple 3-step process to find products and connect with verified sellers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1: Find Product */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Find Product</h3>
              <p className="text-sm text-muted-foreground">
                Browse through our curated marketplace and discover the products you're looking for
              </p>
            </div>

            {/* Arrow (visible on md and up) */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Step 2: Contact Verified Seller */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Contact Verified Seller</h3>
              <p className="text-sm text-muted-foreground">
                Connect directly with verified sellers and discuss product details and availability
              </p>
            </div>

            {/* Arrow (visible on md and up) */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Step 3: Negotiate & Order */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Handshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Negotiate & Order</h3>
              <p className="text-sm text-muted-foreground">
                Finalize terms and place your order with confidence from trusted sellers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
