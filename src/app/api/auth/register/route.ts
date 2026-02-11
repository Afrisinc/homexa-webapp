import { NextResponse } from "next/server";

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface BackendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  tin?: string;
  companyName?: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: {
    user: BackendUser;
    token: string;
  };
}

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();
    const { email, password, firstName, lastName, phone } = body;

    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json(
        {
          success: false,
          resp_msg: "All fields are required",
          resp_code: 0,
          data: null
        },
        { status: 400 }
      );
    }

    // Call backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const backendResponse = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phone,
      }),
    });

    const data: ApiResponse = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          resp_msg: data.resp_msg || "Registration failed",
          resp_code: data.resp_code || 0,
          data: null,
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        resp_msg: "Internal server error",
        resp_code: 0,
        data: null,
      },
      { status: 500 }
    );
  }
}
