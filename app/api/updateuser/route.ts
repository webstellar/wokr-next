import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";

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
  name?: string;
  facebookLink?: string;
  xLink?: string;
  discordLink?: string;
  country?: string;
  timeZone?: string;
  profileType?: [string];
  languages?: [languageProps];
  skillsets?: [skillProps];
  automationTools?: [automationProps];
  universityCollege: string;
  universityCountry: string;
  educationTitle: string;
  graduationYear: string;
};

export async function PUT(request: Request) {
  if (request.method === "PUT") {
    const data: feedbackProps = await request.json();
    //return NextResponse.json(data);
    try {
      const { email } = data;
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          ...data,
        },
        { new: true }
      ).exec();

      return NextResponse.json({ message: "User updated" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
