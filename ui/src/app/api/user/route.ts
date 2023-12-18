import { authOptions } from "@/lib/authOption";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function GET() {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const user = await prisma.tabletUser.findMany();

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { email, name, password, admin, pnummer } = await req.json();

    const hashedPassword = await hash(password, 12);

    const user = await prisma.tabletUser.create({
      data: {
        email,
        name,
        password: hashedPassword,
        admin,
        pnummer,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const datas = await getServerSession(authOptions);

    if (!datas) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    const userisAdmin = await prisma.tabletUser.findUnique({
      where: {
        email: datas.user?.email!,
      },
    });

    if (!userisAdmin?.admin) {
      return new NextResponse("Not Admin", { status: 401 });
    }

    const data = await req.json();

    const user = await prisma.tabletUser.delete({
      where: {
        id: data,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
