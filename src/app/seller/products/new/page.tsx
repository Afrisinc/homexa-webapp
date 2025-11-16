"use client";

import { useAuthStore } from "@/store/auth-store";
import { useProductsStore } from "@/store/products-store";
import { ProductForm } from "@/components/dashboard/product-form";
import { PageHeader } from "@/components/dashboard/page-header";

export default function NewProductPage() {
  const { user } = useAuthStore();
  const { addProduct } = useProductsStore();

  if (!user?.sellerId) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Product"
        description="Create a new product listing for your store"
      />

      <ProductForm sellerId={user.sellerId} onSubmit={addProduct} />
    </div>
  );
}
