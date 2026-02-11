import { NextResponse } from "next/server";
import { products } from "@/data/products";

interface ApiResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: any[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Build query string for backend API
    const queryString = searchParams.toString();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      // Try to fetch from backend API first
      const apiUrl = new URL(`${backendUrl}/api/products`);
      if (queryString) {
        apiUrl.search = queryString;
      }

      const backendResponse = await fetch(apiUrl.toString(), {
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

    // Fallback to local filtering
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

    return NextResponse.json(
      {
        success: true,
        resp_msg: "Products retrieved successfully",
        resp_code: 1000,
        data: filteredProducts,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      {
        success: false,
        resp_msg: "Internal server error",
        resp_code: 0,
        data: [],
      } as ApiResponse,
      { status: 500 }
    );
  }
}
