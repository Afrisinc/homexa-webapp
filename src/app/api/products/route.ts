import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const categoryId = searchParams.get("categoryId");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const q = searchParams.get("q");

  let filteredProducts = [...products];

  // Apply filters
  if (q) {
    const query = q.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    );
  }

  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === categoryId
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === brand);
  }

  if (model) {
    filteredProducts = filteredProducts.filter((p) => p.model === model);
  }

  if (priceMin) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= Number(priceMin)
    );
  }

  if (priceMax) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= Number(priceMax)
    );
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  });
}
