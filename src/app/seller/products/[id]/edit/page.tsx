"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProductsStore } from "@/store/products-store";
import { ProductForm } from "@/components/dashboard/product-form";
import { PageHeader } from "@/components/dashboard/page-header";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const { user } = useAuthStore();
  const { getProductById, updateProduct } = useProductsStore();

  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Verify the product belongs to the current seller
  if (product.sellerId !== user?.sellerId) {
    notFound();
  }

  const handleSubmit = (data: any) => {
    updateProduct(id, data);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Product"
        description="Update your product listing details"
      />

      <ProductForm
        initialData={product}
        sellerId={user.sellerId!}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
