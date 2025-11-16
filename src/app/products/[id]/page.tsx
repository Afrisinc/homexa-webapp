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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { productsService } from "@/services/api";
import { Product } from "@/lib/types";
import { sellers } from "@/data/sellers";
import { conversations } from "@/data/conversations";

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

  // Get seller info (temporary - will use API later)
  const seller = product ? sellers.find((s) => s.id === product.sellerId) : null;

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading product...</p>
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

  // No seller found
  if (!seller) {
    notFound();
  }

  const handleChatClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Find existing conversation or create new one
    const existingConversation = conversations.find(
      (c) => c.productId === product.id
    );

    if (existingConversation) {
      router.push(`/chat/${existingConversation.id}`);
    } else {
      // In a real app, this would create a new conversation
      router.push(`/chat/new?productId=${product.id}`);
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
                alt={product.title}
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
                      alt={`${product.title} ${index + 1}`}
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
              <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
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

            {/* Seller Info */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={seller.avatar} alt={seller.name} />
                  <AvatarFallback>{seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{seller.name}</span>
                    {seller.verified && (
                      <span className="text-blue-500" title="Verified Seller">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <RatingStars rating={seller.rating} size="sm" />
                      {seller.rating}
                    </span>
                    <span>•</span>
                    <span>{seller.totalSales.toLocaleString()} sales</span>
                    <span>•</span>
                    <span>{seller.responseRate}% response rate</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stock & Shipping Info */}
            <div className="space-y-3 rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">
                  <strong>{product.stock}</strong> items in stock
                </span>
              </div>
              {product.shipping?.free && (
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span className="text-sm">
                    Free shipping • Arrives in {product.shipping.estimatedDays} days
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Buyer protection guarantee</span>
              </div>
            </div>

            {/* Chat Button */}
            <Button
              size="lg"
              className="w-full gap-2 text-lg"
              onClick={handleChatClick}
            >
              <MessageCircle className="h-5 w-5" />
              Chat with seller
            </Button>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Product Details</h2>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Brand</dt>
                  <dd className="mt-1">{product.brand}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Model</dt>
                  <dd className="mt-1">{product.model}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Condition</dt>
                  <dd className="mt-1 capitalize">
                    {product.condition || "New"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Stock</dt>
                  <dd className="mt-1">{product.stock} available</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
