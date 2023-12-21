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

    if (!data.user?.email) {
      return new Response("Not authenticated", { status: 401 });
    }

    const user = await prisma.tabletUser.findUnique({
      where: {
        email: data.user?.email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("GETCOP_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
