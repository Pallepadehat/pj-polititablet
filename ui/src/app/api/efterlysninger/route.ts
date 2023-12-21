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

    const efterlysninger = await prisma.efterlysning.findMany();

    return NextResponse.json(efterlysninger);
  } catch (error) {
    console.log("[EFTERLYSNINGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATHC(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { id, citizenId } = await req.json();

    const efterlysninger = await prisma.efterlysning.update({
      where: {
        id,
        citizenId,
      },
      data: {
        closed: true,
      },
    });

    return NextResponse.json(efterlysninger);
  } catch (error) {
    console.log("[EFTERLYSNINGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
