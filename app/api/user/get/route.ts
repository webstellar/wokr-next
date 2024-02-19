import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";
import { authCheck } from "@/helpers/auth";

connectToDB();

/*
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl; // Get the NextUrl object
    const data = url.searchParams.get("data"); // Access query params

    const userProfile = await User.findOne({ email: data }).exec();

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

*/

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    const currentUser = await authCheck(token);

    const userProfile = await User.findOne({
      email: currentUser?.email,
    }).exec();

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
