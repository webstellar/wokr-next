import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/lib/models/category.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const categoryId = url.searchParams.get("id");
    const category = await Category.findById(categoryId).exec();

    if (!category) {
      return new NextResponse("category not found", { status: 404 });
    }

    await category.deleteOne();

    return NextResponse.json("category has been deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
