"use client";

import { useAuthStore } from "@/store/auth-store";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { productsService } from "@/services/api";
import { Product } from "@/lib/types";

export default function SellerDashboardPage() {
  const { user } = useAuthStore();

  // API state
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch seller's products from API
  useEffect(() => {
    const fetchSellerProducts = async () => {
      if (!user?.sellerId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await productsService.getProducts();
        // Filter products by sellerId on client (will be server-side when backend is ready)
        const filtered = response.products.filter((p) => p.sellerId === user.sellerId);
        setSellerProducts(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error fetching seller products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, [user?.sellerId]);

  // Calculate stats
  const totalProducts = sellerProducts.length;
  const lowStockProducts = sellerProducts.filter((p) => p.stock < 10);
  const totalRevenue = sellerProducts.reduce(
    (sum, p) => sum + p.price * (100 - p.stock),
    0
  );
  const avgRating =
    sellerProducts.reduce((sum, p) => sum + p.rating, 0) / totalProducts || 0;

  const recentProducts = sellerProducts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-8">
          <p className="text-lg font-medium text-destructive">Error loading dashboard</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Monitor your store performance and manage products"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description="Active listings"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          description="All-time earnings"
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockProducts.length}
          description="Needs restocking"
          icon={AlertCircle}
        />
        <StatCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          description="Customer satisfaction"
          icon={TrendingUp}
          trend={{ value: 4.5, isPositive: true }}
        />
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-yellow-700 dark:text-yellow-300">
              {lowStockProducts.length} product(s) are running low on stock
            </p>
            <div className="space-y-2">
              {lowStockProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-gray-900"
                >
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Only {product.stock} left in stock
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/seller/products/${product.id}/edit`}>
                      Update Stock
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Products</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/seller/products">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg border bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ${product.price.toFixed(2)} • Stock: {product.stock}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/seller/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
