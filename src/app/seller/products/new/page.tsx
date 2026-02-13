"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useProductsStore } from "@/store/products-store";
import { ProductForm } from "@/components/dashboard/product-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { categoriesService } from "@/services/api";
import { Category } from "@/lib/types";

export default function NewProductPage() {
  const { user } = useAuthStore();
  const { addProduct } = useProductsStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!user?.sellerId) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Product"
        description="Create a new product listing for your store"
      />

      {!loading && <ProductForm sellerId={user.sellerId} onSubmit={addProduct} categories={categories} />}
    </div>
  );
}
