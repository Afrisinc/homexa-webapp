import { NextResponse } from "next/server";
import { products } from "@/data/products";

interface ApiResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: any;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      // Try to fetch from backend API first
      const backendResponse = await fetch(`${backendUrl}/api/products/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (backendResponse.ok) {
        const data: ApiResponse = await backendResponse.json();
        return NextResponse.json(data);
      }
    } catch (error) {
      console.warn("Failed to fetch from backend API, using fallback data:", error);
    }

    // Fallback to local product data
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          resp_msg: "Product not found",
          resp_code: 0,
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        resp_msg: "Product retrieved successfully",
        resp_code: 1000,
        data: product,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Product detail API error:", error);
    return NextResponse.json(
      {
        success: false,
        resp_msg: "Internal server error",
        resp_code: 0,
        data: null,
      } as ApiResponse,
      { status: 500 }
    );
  }
}
