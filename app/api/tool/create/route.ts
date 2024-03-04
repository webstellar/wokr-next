import { Tool } from "@/lib/models/tool.model";
import { User } from "@/lib/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { authCheck } from "@/helpers/auth";

connectToDB();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const data = await req.json();
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    const currentUser = await authCheck(token);
    const user = await User.findOne({ email: currentUser.email });
    if (!user) {
      throw new Error("User not found");
    }

    const admin = user?.role;

    if (admin !== "admin") {
      throw new Error("User is not an admin");
    }

    const tool = await Tool.create({ ...data });

    return new NextResponse(JSON.stringify(tool), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create tools" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
