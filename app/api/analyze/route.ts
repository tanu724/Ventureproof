import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const report = {
    startup: body.idea,

    innovationScore: 8,

    marketPotential: "High",

    feasibility: "Medium",

    risk: "Low",

    fundingReadiness: "Strong",

    recommendation:
      "This startup solves a clear market pain point and shows strong investment potential.",

  };

  return NextResponse.json({
    analysis: report,
  });
}