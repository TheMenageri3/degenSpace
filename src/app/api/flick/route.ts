import { NextRequest, NextResponse } from "next/server";
import Flick from "@/app/models/Flick";
import { Flick as FlickDataType } from "@/app/page";

export async function GET(req: NextRequest) {
  try {
    const flicks = await Flick.find();
    return NextResponse.json({
      status: "success",
      message: "Flicks fetched successfully",
      data: flicks,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch Flicks",
      data: [],
    });
  }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const flickData: FlickDataType = body.flickData;
    try {
      await Flick.create(flickData);
      return NextResponse.json({
        status: "success",
        message: "Flick added successfully",
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({
        status: "error",
        message: "Failed to add Flick",
      });
    }
  }