import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/lib/models/skill.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const skillId = url.searchParams.get("id");
    const skill = await Skill.findById(skillId).exec();

    if (!skill) {
      return new NextResponse("job not found", { status: 404 });
    }

    await skill.deleteOne();

    return NextResponse.json("skill has been deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
