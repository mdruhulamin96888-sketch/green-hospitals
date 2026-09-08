import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// ১. GET Route (Auth status চেক করার জন্য)
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { authenticated: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true, userId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ২. POST Route
export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ফ্রন্টএন্ড থেকে পাঠানো ডেটা রিসিভ করা (যদি থাকে)
    const body = await req.json().catch(() => ({}));

    return NextResponse.json(
      { success: true, userId, data: body },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}