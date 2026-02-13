"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useProductsStore } from "@/store/products-store";
import { ProductForm } from "@/components/dashboard/product-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { categoriesService } from "@/services/api";
import { Category } from "@/lib/types";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const { user } = useAuthStore();
  const { getProductById, updateProduct } = useProductsStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const product = getProductById(id);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

      {!loading && (
        <ProductForm
          initialData={product}
          sellerId={user.sellerId!}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}
    </div>
  );
}
