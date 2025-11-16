"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { categories } from "@/data/categories";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ProductFormProps {
  initialData?: Product;
  sellerId: string;
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "rating" | "reviewCount">) => void;
}

export function ProductForm({ initialData, sellerId, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    currency: initialData?.currency || "USD",
    images: initialData?.images || [""],
    categoryId: initialData?.categoryId || "",
    brand: initialData?.brand || "",
    model: initialData?.model || "",
    stock: initialData?.stock || 0,
    condition: initialData?.condition || ("new" as const),
    shipping: {
      free: initialData?.shipping?.free || false,
      estimatedDays: initialData?.shipping?.estimatedDays || 3,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.images[0]) newErrors.images = "At least one image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      onSubmit({
        ...formData,
        sellerId,
        images: formData.images.filter((img) => img.trim() !== ""),
      });

      router.push("/seller/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Apple iPhone 15 Pro Max 256GB"
              aria-label="Product title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed product description..."
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Product description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-destructive">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Brand *</label>
              <Input
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                placeholder="e.g., Apple"
                aria-label="Brand"
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-destructive">{errors.brand}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Model *</label>
              <Input
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                placeholder="e.g., iPhone 15 Pro Max"
                aria-label="Model"
              />
              {errors.model && (
                <p className="mt-1 text-sm text-destructive">{errors.model}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category *</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  type="button"
                >
                  {formData.categoryId
                    ? categories.find((c) => c.id === formData.categoryId)
                        ?.name
                    : "Select category"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onSelect={() =>
                      setFormData({ ...formData, categoryId: category.id })
                    }
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-destructive">
                {errors.categoryId}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Stock */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Stock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Price *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="0.00"
                aria-label="Price"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-destructive">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Currency *</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    type="button"
                  >
                    {formData.currency}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onSelect={() =>
                      setFormData({ ...formData, currency: "USD" })
                    }
                  >
                    USD ($)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() =>
                      setFormData({ ...formData, currency: "RWF" })
                    }
                  >
                    RWF (Fr)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock Quantity *
              </label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                placeholder="0"
                aria-label="Stock quantity"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-destructive">{errors.stock}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Condition</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between capitalize"
                  type="button"
                >
                  {formData.condition}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem
                  onSelect={() =>
                    setFormData({ ...formData, condition: "new" })
                  }
                >
                  New
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    setFormData({ ...formData, condition: "used" })
                  }
                >
                  Used
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    setFormData({ ...formData, condition: "refurbished" })
                  }
                >
                  Refurbished
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                aria-label={`Image URL ${index + 1}`}
              />
              {formData.images.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeImageField(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addImageField}
            className="w-full"
          >
            Add Another Image
          </Button>
          {errors.images && (
            <p className="text-sm text-destructive">{errors.images}</p>
          )}
        </CardContent>
      </Card>

      {/* Shipping */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="freeShipping"
              checked={formData.shipping.free}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shipping: { ...formData.shipping, free: e.target.checked },
                })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="freeShipping" className="text-sm font-medium">
              Offer free shipping
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Estimated Delivery (days)
            </label>
            <Input
              type="number"
              value={formData.shipping.estimatedDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shipping: {
                    ...formData.shipping,
                    estimatedDays: Number(e.target.value),
                  },
                })
              }
              aria-label="Estimated delivery days"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/seller/products")}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
