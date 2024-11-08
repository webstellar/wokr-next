import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { Tool } from "@/lib/models/tool.model";
import { User } from "@/lib/models/user.model";
import { authCheck } from "@/helpers/auth";

connectToDB();

//two action, get data, get id, update user

export async function PUT(req: NextRequest) {
  if (req.method !== "PUT") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    const id = req.nextUrl.searchParams.get("id");
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

    if (user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const updatedTool = await Tool.findByIdAndUpdate(
      { id },
      {
        ...data,
      },
      { new: true }
    ).exec();

    return new NextResponse(JSON.stringify(updatedTool), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to update tool" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
