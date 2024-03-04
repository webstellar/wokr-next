import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const url = req.nextUrl;
    const userId = url.searchParams.get("userId");
    const user = await User.findById(userId).exec();

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await user.deleteOne();

    return NextResponse.json("User deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
