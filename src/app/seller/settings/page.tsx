"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { sellers } from "@/data/sellers";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Store, Mail, Shield } from "lucide-react";

export default function SellerSettingsPage() {
  const { user, setUser } = useAuthStore();
  const sellerProfile = sellers.find((s) => s.id === user?.sellerId);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    storeName: sellerProfile?.name || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user in store
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
      });
    }

    setIsLoading(false);
    setIsSaved(true);

    // Hide success message after 3 seconds
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your seller account and store preferences"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>{formData.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">
                  Avatar URL
                </label>
                <Input
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="seller@example.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Store Name *
              </label>
              <Input
                value={formData.storeName}
                onChange={(e) =>
                  setFormData({ ...formData, storeName: e.target.value })
                }
                placeholder="My Store"
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                This is the name that customers will see
              </p>
            </div>

            {sellerProfile && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Total Sales
                    </label>
                    <div className="rounded-lg border bg-secondary/50 p-3">
                      <p className="text-2xl font-bold">
                        {sellerProfile.totalSales.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Store Rating
                    </label>
                    <div className="rounded-lg border bg-secondary/50 p-3">
                      <p className="text-2xl font-bold">
                        {sellerProfile.rating.toFixed(1)} / 5.0
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Response Rate
                  </label>
                  <div className="rounded-lg border bg-secondary/50 p-3">
                    <p className="text-2xl font-bold">
                      {sellerProfile.responseRate}%
                    </p>
                  </div>
                </div>

                {sellerProfile.verified && (
                  <div className="flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-50 p-3 dark:bg-green-950/20">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Verified Seller
                    </span>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Success Message */}
        {isSaved && (
          <div className="rounded-lg border border-green-500/50 bg-green-50 p-4 dark:bg-green-950/20">
            <p className="font-medium text-green-800 dark:text-green-200">
              Settings saved successfully!
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                name: user?.name || "",
                email: user?.email || "",
                avatar: user?.avatar || "",
                storeName: sellerProfile?.name || "",
              });
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
