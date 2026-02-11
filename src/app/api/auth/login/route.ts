import { NextResponse } from "next/server";

interface LoginRequest {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data?: {
    user: {
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
    };
    token: string;
  };
}

// Demo users for development/testing
const DEMO_USERS = {
  "demo@marketplace.com": {
    password: "password123",
    data: {
      user: {
        id: "user-demo-1",
        email: "demo@marketplace.com",
        firstName: "Demo",
        lastName: "Buyer",
        phone: "+250788123456",
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "demo-token-buyer",
    },
  },
  "seller@marketplace.com": {
    password: "seller123",
    data: {
      user: {
        id: "user-demo-2",
        email: "seller@marketplace.com",
        firstName: "Demo",
        lastName: "Seller",
        phone: "+250788654321",
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "demo-token-seller",
    },
  },
};

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          resp_msg: "Email and password are required",
          resp_code: 0,
        },
        { status: 400 }
      );
    }

    // Check demo credentials first
    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS];
    if (demoUser?.password === password) {
      return NextResponse.json(
        {
          success: true,
          resp_msg: "Login successful",
          resp_code: 1001,
          data: demoUser.data,
        } as ApiResponse,
        { status: 200 }
      );
    }

    // Call backend API for real users
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const backendResponse = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          resp_msg: data.resp_msg || "Invalid email or password",
          resp_code: data.resp_code || 0,
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        resp_msg: "Internal server error",
        resp_code: 0,
      },
      { status: 500 }
    );
  }
}
