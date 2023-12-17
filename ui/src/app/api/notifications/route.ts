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

    const values = await req.json();

    const user = await prisma.tabletUser.update({
      where: {
        email: data.user?.email!,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[NOTIFICATIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
