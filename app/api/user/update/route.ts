import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";
import { authCheck } from "@/helpers/auth";

connectToDB();

type languageProps = {
  language?: string;
  languageLevel?: string;
};

type skillProps = {
  skill?: string;
  skillLevel?: string;
};

type automationProps = {
  automation?: string;
  automationLevel?: string;
};

type feedbackProps = {
  email?: string;
  username?: string;
  description?: string;
  phone?: number;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  country?: string;
  timeZone?: string;
  profileType?: [string];
  languages?: [languageProps];
  skillsets?: [skillProps];
  automationTools?: [automationProps];
  phoneNumber: string;
};

export async function PUT(request: Request) {
  if (request.method === "PUT") {
    const data: feedbackProps = await request.json();
    //return NextResponse.json(data);
    try {
      const token = request.headers.get("Authorization")?.split("Bearer ")[1];
      if (!token) {
        throw new Error("No token provided");
      }

      const currentUser = await authCheck(token);

      const updatedUser = await User.findOneAndUpdate(
        { email: currentUser?.email },
        {
          ...data,
        },
        { new: true }
      ).exec();

      return NextResponse.json({ message: "User updated" }, updatedUser);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
