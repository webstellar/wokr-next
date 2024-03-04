import { NextResponse, NextRequest } from "next/server";
import { Tool } from "@/lib/models/tool.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  try {
    const tools = await Tool.find().exec();
    return NextResponse.json(tools);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
