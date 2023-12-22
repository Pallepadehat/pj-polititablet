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

export async function PATCH(req: Request) {
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

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const user = await prisma.tabletUser.findUnique({
      where: {
        email: data.user?.email!,
      },
    });

    const { beskrivelse, citizenId } = await req.json();

    const efterlysninger = await prisma.efterlysning.create({
      data: {
        tabletUserId: user?.id!,
        citizenId,
        beskrivelse,
        closed: false,
      },
    });

    return NextResponse.json(efterlysninger);
  } catch (error) {
    console.log("[EFTERLYSNINGER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
