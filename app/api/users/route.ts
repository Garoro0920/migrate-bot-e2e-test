import { NextResponse, type NextRequest } from "next/server";
import { sampleUserData } from "@/utils/sample-data";

export async function GET(_req: NextRequest) {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error("Cannot find user data");
    }

    return NextResponse.json(sampleUserData, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { statusCode: 500, message: err.message },
      { status: 500 }
    );
  }
}
