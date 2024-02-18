import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";

connectToDB();

type feedbackProps = {
  email?: string;
};

export async function GET(request: Request) {
  if (request.method === "GET") {
    const data: feedbackProps = await request.json();
    //return NextResponse.json(data);
    try {
      const { email } = data;
      const userProfile = await User.findOne({ email: email }).exec();

      return NextResponse.json({ message: "User Found" }, userProfile);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
