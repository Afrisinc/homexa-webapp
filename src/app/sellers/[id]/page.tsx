"use client";

import { useState, use, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { ProductCard } from "@/components/marketplace/product-card";
import {
  MessageCircle,
  ArrowLeft,
  Check,
  MapPin,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Seller, Product } from "@/lib/types";
import { SellerDetailSkeleton } from "@/components/ui/skeleton";
import { sellersService, productsService } from "@/services/api";

interface SellerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SellerDetailPage({ params }: SellerDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);

  // API state
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch seller data and products from API
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        setError(null);
        const sellerData = await sellersService.getSellerById(id);
        if (!sellerData) {
          throw new Error("Failed to load seller");
        }
        setSeller(sellerData);

        // Fetch products for this seller
        try {
          const productsResponse = await productsService.getProductsBySeller(id);
          setProducts(productsResponse.data || []);
        } catch (err) {
          console.error("Error fetching seller products:", err);
          setProducts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load seller");
        console.error("Error fetching seller:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  // Loading state
  if (loading) {
    return <SellerDetailSkeleton />;
  }

  // Error state
  if (error || !seller) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-8">
          <p className="text-lg font-medium text-destructive">
            {error || "Seller not found"}
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const memberSince = seller.createdAt
    ? new Date(seller.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  const businessTypeLabel = {
    wholesaler: "Wholesaler",
    retailer: "Retailer",
    manufacturer: "Manufacturer",
  }[seller.businessType || "retailer"];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Seller Header Section */}
      <div className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div>
              <Avatar className="h-32 w-32">
                <AvatarImage src={seller.avatar || ""} alt={seller.name || "Seller"} />
                <AvatarFallback className="text-2xl">{seller.name?.[0] || "S"}</AvatarFallback>
              </Avatar>
            </div>

            {/* Seller Info */}
            <div className="flex-1">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold">{seller.name}</h1>
                  <div className="mt-2 flex items-center gap-3">
                    {seller.verified && (
                      <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <div className="mt-1 flex items-center gap-2">
                    <RatingStars rating={seller.rating || 0} size="sm" />
                    <span className="font-medium">{(seller.rating || 0).toFixed(1)}/5</span>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Total Sales</p>
                  <p className="mt-1 font-medium">{(seller.totalSales || 0).toLocaleString()}</p>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Response Rate</p>
                  <p className="mt-1 font-medium">{seller.responseRate}%</p>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="mt-1 font-medium text-sm">{memberSince}</p>
                </div>
              </div>

              {/* Info Row */}
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
                {seller.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{seller.location}</span>
                  </div>
                )}
                {seller.businessType && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{businessTypeLabel}</span>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <Button size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {seller.description && (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold">About</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {seller.description}
                </p>
              </Card>
            )}

            {/* Certifications */}
            {seller.certifications && seller.certifications.length > 0 && (
              <Card className="p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications & Awards
                </h2>
                <div className="space-y-2">
                  {seller.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Business Info */}
          <div>
            <Card className="p-6">
              <h3 className="mb-4 font-bold">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">BUSINESS TYPE</p>
                  <p className="mt-1 font-medium">{businessTypeLabel}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-xs font-medium text-muted-foreground">MEMBER SINCE</p>
                  <p className="mt-1 font-medium">{memberSince}</p>
                </div>
                {seller.location && (
                  <div className="border-t pt-4">
                    <p className="text-xs font-medium text-muted-foreground">LOCATION</p>
                    <p className="mt-1 font-medium">{seller.location}</p>
                  </div>
                )}
                <div className="border-t pt-4">
                  <p className="text-xs font-medium text-muted-foreground">VERIFIED STATUS</p>
                  <p className="mt-1">
                    {seller.verified ? (
                      <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                        <Check className="h-4 w-4" />
                        Verified Seller
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">
                        Not Verified
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Products By This Seller */}
        {products.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Products From {seller.name}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} seller={seller} />
              ))}
            </div>
          </div>
        )}

        {/* No Products */}
        {products.length === 0 && (
          <div className="mt-12 rounded-lg border border-dashed p-12 text-center">
            <p className="text-lg font-medium">No products listed yet</p>
            <p className="text-sm text-muted-foreground">
              This seller hasn't added any products to their store
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
