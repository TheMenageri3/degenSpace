import { NextRequest, NextResponse } from "next/server";
import UserEngagement from "@/app/models/UserEngagement";
import { UserEngagement as UserEngagementDataType } from "@/app/page";

export async function GET(req: NextRequest) {
  try {
    const engagements = await UserEngagement.find();
    return NextResponse.json({
      status: "success",
      message: "UserEngagements fetched successfully",
      data: engagements,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch UserEngagements",
      data: [],
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const engagementData: UserEngagementDataType = body.engagementData;
  try {
    const existingEngagement = await UserEngagement.findOne({
      flickId: engagementData.flickId,
    });
    if (existingEngagement) {
      return NextResponse.json({
        status: "error",
        message: "UserEngagement already exists for this Flick",
      });
    }

    await UserEngagement.create(engagementData);
    return NextResponse.json({
      status: "success",
      message: "UserEngagement added successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to add UserEngagement",
    });
  }
}