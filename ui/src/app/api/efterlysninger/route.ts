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

    const efterlysninger = await prisma.tabletEfterlysninger.findMany();

    return NextResponse.json(efterlysninger);
  } catch (error) {
    console.log("[SAGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
