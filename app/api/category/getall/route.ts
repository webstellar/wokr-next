import { NextResponse, NextRequest } from "next/server";
import { Category } from "@/lib/models/category.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  try {
    const categories = await Category.find().exec();
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
