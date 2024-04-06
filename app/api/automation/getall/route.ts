import { NextResponse, NextRequest } from "next/server";
import { Automation } from "@/lib/models/automation.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  try {
    const automations = await Automation.find().lean().exec();
    return NextResponse.json(automations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
