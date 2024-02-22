import { Automation } from "@/lib/models/automation.model";
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

    console.log(req.headers);

    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    const currentUser = await authCheck(token);

    const user = await User.findOne({ email: currentUser.email });
    const owner = user?._id;

    if (!user) {
      throw new Error("User not found");
    }
    const automationJob = await Automation.create({ ...data, owner: owner });

    user.automations.push(automationJob);
    user.markModified("automations");
    await user.save();

    return new NextResponse(JSON.stringify(automationJob), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to update user" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

/*
export async function POST(request: Request) {
  if (request.method === "POST") {
    const data = await request.json();
    //return NextResponse.json(data);

    try {
      const token = request.headers.get("Authorization")?.split("Bearer ")[1];
      if (!token) {
        throw new Error("No token provided");
      }

      const currentUser = await authCheck(token);

      const user = await User.findOne({ email: currentUser.email });
      const owner = user?._id;

      if (!user) {
        throw new Error("User not found");
      }
      const automationJob = await Automation.create({ ...data, owner: owner });

      user.automations.push(automationJob);
      user.markModified("automations");
      await user.save();

      return NextResponse.json(
        { message: "Job created successfully" },
        automationJob
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
*/
