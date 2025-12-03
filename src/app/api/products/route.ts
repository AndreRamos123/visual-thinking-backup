import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getProducts } from "@/lib/firestore";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock?: number;
}

export async function GET(request: NextRequest) {
  // Verify token
  const tokenVerification = await verifyToken(request);

  if (!tokenVerification.valid) {
    console.error("Token verification failed:", tokenVerification.error);
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: 401 }
    );
  }

  try {
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const pageSize = 5;

    const { products, totalPages, totalItems } = await getProducts(
      page,
      pageSize
    );
    console.log(products.length);
    const responseHeaders = {
      "X-Total-Count": totalItems.toString(),
      "X-Total-Pages": totalPages.toString(),
    };

    return NextResponse.json(
      (products as Product[]).map((product) => ({
        id: product.id,
        category: product.category,
        name: product.name,
        price: product.price,
        stock: randomStock(),
      })),
      { headers: responseHeaders }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

function randomStock() {
  return Math.floor(Math.random() * 100);
}
