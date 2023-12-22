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

    const tax = await prisma.taxes.findMany({});

    return NextResponse.json(tax);
  } catch (error) {
    console.log("[TAX_GET]", error);
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

    const tax = await prisma.taxes.delete({
      where: {
        id: data,
      },
    });

    return NextResponse.json(tax);
  } catch (error) {
    console.log("[TAX_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { description, prisonMonths, fineAmount, licensePoints } =
      await req.json();

    const tax = await prisma.taxes.create({
      data: {
        prisonMonths,
        fineAmount,
        description,
        licensePoints,
      },
    });

    return NextResponse.json(tax);
  } catch (error) {
    console.log("[TAX_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
