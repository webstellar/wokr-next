import { NextRequest, NextResponse } from "next/server";
import { Tag } from "@/lib/models/tag.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const tagId = url.searchParams.get("id");
    const tag = await Tag.findById(tagId).exec();

    if (!tag) {
      return new NextResponse("tag not found", { status: 404 });
    }

    await tag.deleteOne();

    return NextResponse.json("tag has been deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
