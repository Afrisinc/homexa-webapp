import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { sellers } from "@/data/sellers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const seller = sellers.find((s) => s.id === product.sellerId);

  return NextResponse.json({
    product,
    seller,
  });
}
