import { NextRequest, NextResponse } from "next/server";
import { Automation } from "@/lib/models/automation.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const data = url.searchParams.get("data");
    const automation = await Automation.findById(data).exec();
    return NextResponse.json(automation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
