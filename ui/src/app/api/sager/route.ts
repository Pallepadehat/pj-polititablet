import { authOptions } from "@/lib/authOption";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const staff = await prisma.staff.findMany({});

    return NextResponse.json(staff);
  } catch (error) {
    console.log("[SAGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

function generateRandom4DigitNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const random4DigitNumber: number = generateRandom4DigitNumber();

    const { fineAmount, prisonMonths, licensePoints, citizenId } =
      await req.json();

    const staff = await prisma.staff.create({
      data: {
        fineAmount,
        prisonMonths,
        licensePoints,
        citizenId: parseInt(citizenId),
        responsible: data.user?.name,
        caseNumber: `#${random4DigitNumber}`,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.log("[SAGER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
