"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  // Pre-fill demo credentials for development
  const [email, setEmail] = useState("demo@marketplace.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        router.push("/");
      } else {
        setError("Invalid email or password. Try demo@marketplace.com / password123");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-transparent px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue shopping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="demo@marketplace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-label="Email address"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                aria-label="Password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div
                className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Demo Credentials
                </span>
              </div>
            </div>

            <div className="space-y-3 rounded-lg bg-secondary/50 p-4 text-sm">
              <div>
                <p className="mb-2 font-medium">Buyer Account:</p>
                <p className="text-muted-foreground">
                  <strong>Email:</strong> demo@marketplace.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Password:</strong> password123
                </p>
              </div>
              <div className="border-t pt-3">
                <p className="mb-2 font-medium">Seller Account:</p>
                <p className="text-muted-foreground">
                  <strong>Email:</strong> seller@marketplace.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Password:</strong> seller123
                </p>
              </div>
            </div>

            <div className="space-y-3 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Create one
                </Link>
              </p>
              <p className="text-muted-foreground">
                Want to sell?{" "}
                <Link
                  href="/become-seller"
                  className="text-primary hover:underline font-medium"
                >
                  Become a seller
                </Link>
              </p>
              <div className="border-t pt-3">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Continue browsing without signing in
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
