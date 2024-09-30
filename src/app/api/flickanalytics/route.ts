import { NextRequest, NextResponse } from "next/server";
import FlickAnalytics from "@/app/models/FlickAnalytics";
import { FlickAnalytics as FlickAnalyticsDataType } from "@/app/page";

export async function GET(req: NextRequest) {
  try {
    const analytics = await FlickAnalytics.find();
    return NextResponse.json({
      status: "success",
      message: "FlickAnalytics fetched successfully",
      data: analytics,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch FlickAnalytics",
      data: [],
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const analyticsData: FlickAnalyticsDataType = body.analyticsData;
  try {
    await FlickAnalytics.create(analyticsData);
    return NextResponse.json({
      status: "success",
      message: "FlickAnalytics added successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to add FlickAnalytics",
    });
  }
}