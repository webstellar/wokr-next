import { NextRequest, NextResponse } from "next/server";
import { Automation } from "@/lib/models/automation.model";
import { connectToDB } from "@/lib/mongoose";
import { authCheck } from "@/helpers/auth";
import { User } from "@/lib/models/user.model";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    console.log("token: ", token);

    const currentUser = await authCheck(token);

    const user = await User.findOne({ email: currentUser.email });
    const owner = user?._id; //

    if (!user) {
      throw new Error("User not found");
    }

    const url = req.nextUrl;
    const jobId = url.searchParams.get("id");
    const automation = await Automation.findById(jobId).exec();

    if (!automation) {
      return new NextResponse("service not found", { status: 404 });
    }

    const clonedAutomation = new Automation({
      ...automation.toObject(),
      owner: owner,
      _id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });

    await clonedAutomation.save();

    return NextResponse.json(clonedAutomation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
