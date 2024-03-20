import { NextRequest, NextResponse } from "next/server";
import { Automation } from "@/lib/models/automation.model";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { authCheck } from "@/helpers/auth";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    const currentUser = await authCheck(token);

    const user = await User.findOne({ email: currentUser.email });

    if (!user) {
      throw new Error("User not found");
    }

    const url = req.nextUrl;
    const jobId = url.searchParams.get("id");
    const automation = await Automation.findById(jobId).exec();

    if (!automation) {
      return new NextResponse("job not found", { status: 404 });
    }

    await automation.deleteOne();

    return NextResponse.json("automation job deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
