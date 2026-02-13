"use client";

import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { productsService, chatsService } from "@/services/api";
import { Product } from "@/lib/types";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = use(params);

  // API state
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsService.getProductById(id);
        console.log("daba ------->", data)
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Get seller info from API response
  const seller = product?.seller || null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-8">
          <p className="text-lg font-medium text-destructive">
            {error || 'Product not found'}
          </p>
          <Button variant="outline" onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleChatClick = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!seller) {
      alert("Seller information not available. Please try again later.");
      return;
    }

    // Fetch existing chats to find one for this product
    const chats = await chatsService.getChats();
    const existingChat = chats.find((c) => c.productId === product.id);

    if (existingChat) {
      router.push(`/chat/${existingChat.id}`);
    } else {
      // Start new chat with product and seller info
      router.push(`/chat/new?productId=${product.id}&sellerId=${seller.id}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4">
                <RatingStars
                  rating={product.rating}
                  size="md"
                  showNumber
                />
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.condition && product.condition !== "new" && (
                <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-medium capitalize text-yellow-800">
                  {product.condition}
                </span>
              )}
            </div>

            {/* Seller Info Card - Trust Signals */}
            <Card className="border-2 border-primary/20 bg-primary/5 p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Seller Information</h3>
                  {seller?.verified && (
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">Verified</span>
                    </div>
                  )}
                </div>
              </div>
              {seller ? (
                <>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={seller.avatar} alt={seller.name || `${seller.firstName} ${seller.lastName}`} />
                      <AvatarFallback>{(seller.name || seller.firstName)?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Link href={`/sellers/${seller.id}`}>
                        <p className="font-semibold hover:text-primary transition-colors">
                          {seller.name || `${seller.firstName} ${seller.lastName}`}
                        </p>
                      </Link>
                      <div className="space-y-1">
                        {seller.rating !== undefined && seller.rating > 0 ? (
                          <>
                            <div className="flex items-center gap-2 text-sm">
                              <RatingStars rating={seller.rating} size="sm" />
                              <span className="font-medium">{seller.rating}/5</span>
                              {seller.totalSales !== undefined && (
                                <span className="text-muted-foreground">({seller.totalSales.toLocaleString()} sales)</span>
                              )}
                            </div>
                            {seller.responseRate !== undefined && seller.responseRate > 0 && (
                              <p className="text-sm text-muted-foreground">
                                {seller.responseRate}% response rate
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {seller.phone || 'Verified seller'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="mt-4 w-full"
                  >
                    <Link href={`/sellers/${seller.id}`}>
                      View Seller Profile
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Seller ID: {product.sellerId}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm">Verified seller on marketplace</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Trust Signals & Logistics */}
            <div className="space-y-3 rounded-lg border border-green-200/50 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800/50 p-4">
              <h3 className="font-semibold text-sm mb-3">Why Buy With Confidence</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm">
                    <strong>{product.stock}</strong> items in stock • Ready to ship
                  </span>
                </div>
                {product.shipping?.free && (
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                      <Truck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm">
                      Free shipping • Arrives in {product.shipping.estimatedDays} days
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm">Buyer protection guarantee</span>
                </div>
              </div>
            </div>

            {/* Chat Button - Primary CTA */}
            <Button
              size="lg"
              className="w-full gap-2 text-lg"
              onClick={handleChatClick}
              disabled={!isAuthenticated}
            >
              <MessageCircle className="h-5 w-5" />
              Start Chat About This Product
            </Button>

            {/* Description */}
            <div className="border-t pt-6 space-y-3">
              <h2 className="text-lg font-bold">About This Item</h2>
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="border-t pt-6 space-y-3">
              <h2 className="text-lg font-bold">Specifications</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-3 rounded-lg border bg-card">
                    <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</dt>
                    <dd className="mt-1.5 font-medium">{product.brand}</dd>
                  </div>
                  <div className="p-3 rounded-lg border bg-card">
                    <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Model</dt>
                    <dd className="mt-1.5 font-medium">{product.model}</dd>
                  </div>
                  <div className="p-3 rounded-lg border bg-card">
                    <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Condition</dt>
                    <dd className="mt-1.5 font-medium capitalize">
                      {product.condition || "New"}
                    </dd>
                  </div>
                  <div className="p-3 rounded-lg border bg-card">
                    <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock Available</dt>
                    <dd className="mt-1.5 font-medium">{product.stock} units</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
