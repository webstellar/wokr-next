import { NextRequest, NextResponse } from "next/server";
import { Tool } from "@/lib/models/tool.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const toolId = url.searchParams.get("id");
    const tool = await Tool.findById(toolId).exec();

    if (!tool) {
      return new NextResponse("job not found", { status: 404 });
    }

    await tool.deleteOne();

    return NextResponse.json("tool has been deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
