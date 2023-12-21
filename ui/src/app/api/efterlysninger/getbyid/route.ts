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

    const efterlysninger = await prisma.efterlysning.findFirst({
      where: {
        citizenId: id,
      },
      include: {
        createdByUser: true,
      },
    });

    return NextResponse.json(efterlysninger);
  } catch (error) {
    console.log("[EFTERLYSNINGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
