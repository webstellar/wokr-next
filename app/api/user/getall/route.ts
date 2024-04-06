import { NextResponse, NextRequest } from "next/server";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

connectToDB();

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  try {
    const users = await User.find().lean().exec();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
