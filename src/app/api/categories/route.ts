import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

interface CategoryImage {
  url?: string;
  alt_text?: string;
}

interface CategorySeo {
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
}

interface CategoryMetadata {
  display_order?: number;
  is_featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  status?: string;
  image?: CategoryImage;
  seo?: CategorySeo;
  metadata?: CategoryMetadata;
  createdAt?: string;
  updatedAt?: string;
  children?: Category[];
}

interface ApiResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: Category[];
}

export async function GET() {
  try {
    // Try to fetch from backend API first
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const backendResponse = await fetch(`${backendUrl}/api/categories`, {
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

    // Fallback to local categories data
    const fallbackCategories = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      status: "active",
      metadata: {
        display_order: 0,
        is_featured: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: [],
    }));

    return NextResponse.json(
      {
        success: true,
        resp_msg: "Categories retrieved successfully",
        resp_code: 1000,
        data: fallbackCategories,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Categories API error:", error);
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
