import { Citizen } from "@prisma/client";
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

    const citizen = await prisma.citizen.findMany({
      include: {
        staffEntries: true,
      },
    });

    return NextResponse.json(citizen);
  } catch (error) {
    console.log("[BORGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { name, foedselsdag, hasLicense, telefon } = await req.json();

    const borger = await prisma.citizen.create({
      data: {
        name,
        foedselsdag,
        hasLicense,
        telefon,
      },
    });

    return NextResponse.json(borger);
  } catch (error) {
    console.log("[BORGER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isAuthenticated = await getServerSession(authOptions);

    if (!isAuthenticated) {
      return new Response("Not authenticated", { status: 401 });
    }

    const data = await req.json();

    const borger = await prisma.citizen.delete({
      where: {
        id: data,
      },
    });

    return NextResponse.json(borger);
  } catch (error) {
    console.log("[BORGER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
