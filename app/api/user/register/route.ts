import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";
import { generateFromEmail } from "unique-username-generator";

connectToDB();

type feedbackProps = {
  email?: string;
};

export async function POST(request: Request) {
  if (request.method === "POST") {
    const data: feedbackProps = await request.json();
    //return NextResponse.json(data);
    try {
      const { email } = data;
      const username = email ? generateFromEmail(email, 4) : "";

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" });
      }

      //create a new user
      const newUser = new User({ email: email, username: username });
      await newUser.save();
      return NextResponse.json({ message: "User created" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
