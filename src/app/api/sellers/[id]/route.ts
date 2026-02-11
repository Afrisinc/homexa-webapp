import { NextResponse } from "next/server";
import { sellers } from "@/data/sellers";
import { products } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const seller = sellers.find((s) => s.id === id);

  if (!seller) {
    return NextResponse.json(
      { error: "Seller not found" },
      { status: 404 }
    );
  }

  // Get products from this seller
  const sellerProducts = products.filter((p) => p.sellerId === id);

  return NextResponse.json({
    seller,
    products: sellerProducts,
  });
}
