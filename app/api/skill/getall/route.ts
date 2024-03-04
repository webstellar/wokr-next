import { NextResponse, NextRequest } from "next/server";
import { Skill } from "@/lib/models/skill.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  try {
    const skills = await Skill.find().exec();
    return NextResponse.json(skills);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
