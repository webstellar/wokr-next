import { NextRequest, NextResponse } from "next/server";
import { Automation } from "@/lib/models/automation.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const jobId = url.searchParams.get("id");
    const automation = await Automation.findById(jobId).exec();

    if (!automation) {
      return new NextResponse("service not found", { status: 404 });
    }

    //    await automation.deleteOne();

    await automation.clone();

    return NextResponse.json("automation job cloned", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
