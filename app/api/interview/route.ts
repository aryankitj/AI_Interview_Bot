import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const uId = uuidv4();

    const resp = await db.insert(MockInterview).values({
      mockId: uId,
      jsonMockResp: JSON.stringify(body.jsonMockResp),
      jobPosition: body.jobPosition,
      jobDesc: body.jobDesc,
      jobExperience: body.jobExperience,
      createdBy: body.createdBy,
      createdAt: moment().format("DD-MM-YYYY"),
    }).returning({ mockId: MockInterview.mockId });

    return NextResponse.json({ success: true, data: resp });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
