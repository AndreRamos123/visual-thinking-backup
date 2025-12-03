import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyToken } from "@/lib/auth";

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
    const search = request.nextUrl.searchParams.get("q");
    const page = request.nextUrl.searchParams.get("page") || "1";

    const filePath = path.join(process.cwd(), "src/server/legacy_data.json");
    const fileData = fs.readFileSync(filePath, "utf8");

    const jsonData = JSON.parse(fileData);
    const totalItems = jsonData.length;
    const paginatedData = jsonData.slice(
      (parseInt(page) - 1) * 5,
      parseInt(page) * 5
    );

    await randomdelay();

    const totalPages = Math.ceil(totalItems / 5);
    const responseHeaders = {
      "X-Total-Count": totalItems.toString(),
      "X-Total-Pages": totalPages.toString(),
    };

    return NextResponse.json(
      paginatedData.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        stock: randomStock(),
      })),
      { headers: responseHeaders }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

function randomdelay() {
  const delay = Math.floor(Math.random() * 2500) + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function randomStock() {
  return Math.floor(Math.random() * 100);
}
