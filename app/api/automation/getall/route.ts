import { NextResponse, NextRequest } from "next/server";
import { Automation } from "@/lib/models/automation.model";
import { connectToDB } from "@/lib/mongoose";
import { SortOrder } from "mongoose";

connectToDB();

export async function GET(
  req: NextRequest,
  {
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
  }
) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  try {
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    if (searchString.trim() !== "") {
      [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } },
        { categories: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const automations = await Automation.find()
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .exec();
    return NextResponse.json(automations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
