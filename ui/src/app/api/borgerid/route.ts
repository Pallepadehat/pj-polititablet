import { authOptions } from "@/lib/authOption";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { id } = await req.json();

    const citizen = await prisma.citizen.findUnique({
      where: {
        id,
      },
      include: {
        staffEntries: true,
        efterlysninger: true,
      },
    });

    return NextResponse.json(citizen);
  } catch (error) {
    console.log("[BORGERID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
