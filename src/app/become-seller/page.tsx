"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BecomeSellerPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<"retailer" | "wholesaler" | "manufacturer">("retailer");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-transparent px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Become a Seller</CardTitle>
            <CardDescription>
              Sign in first to become a seller on our marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You need to create an account or sign in to become a seller.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleNext = () => {
    setError("");
    if (!businessName || !location) {
      setError("Please fill in all required fields");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!description) {
      setError("Please provide a business description");
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, this would call an API
      // to upgrade the user to a seller account
      // For now, we'll just show a success message and redirect
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-transparent px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Become a Seller</CardTitle>
          <CardDescription>
            {step === 1
              ? "Tell us about your business"
              : "Complete your seller profile"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Progress Indicator */}
          <div className="mb-8 flex gap-3">
            <div
              className={`flex-1 rounded-full h-2 transition-all ${
                step >= 1 ? "bg-primary" : "bg-secondary"
              }`}
            />
            <div
              className={`flex-1 rounded-full h-2 transition-all ${
                step >= 2 ? "bg-primary" : "bg-secondary"
              }`}
            />
          </div>

          {step === 1 ? (
            // Step 1: Business Information
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="businessName" className="text-sm font-medium">
                  Business Name
                </label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Business Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["retailer", "wholesaler", "manufacturer"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBusinessType(type)}
                      className={`rounded-lg border-2 p-2 text-center text-sm transition-all capitalize ${
                        businessType === type
                          ? "border-primary bg-primary/10"
                          : "border-input hover:border-primary/50"
                      }`}
                      disabled={isLoading}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div
                  className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <Button
                type="button"
                onClick={handleNext}
                className="w-full gap-2"
                size="lg"
                disabled={isLoading}
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            // Step 2: Business Description
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Summary</label>
                <p className="text-xs text-muted-foreground">
                  (You have filled in: {businessName} in {location} as a {businessType})
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Business Description
                </label>
                <textarea
                  id="description"
                  placeholder="Tell us about your business, products, and what makes you unique..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={isLoading}
                  className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
              </div>

              {error && (
                <div
                  className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gap-2"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isLoading ? "Setting up..." : "Become a Seller"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
