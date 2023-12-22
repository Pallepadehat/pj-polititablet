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

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const response = await req.json();

    console.log(response);
  } catch (error) {
    console.log("[SAGER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
