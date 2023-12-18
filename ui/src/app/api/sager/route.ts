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

    const sager = await prisma.tabletSager.findMany();

    return NextResponse.json(sager);
  } catch (error) {
    console.log("[SAGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

function generateRandomNumbers(): number[] {
  const randomNumbers: number[] = [];

  for (let i = 0; i < 4; i++) {
    const randomNumber: number = Math.floor(Math.random() * 100); // Adjust the range as needed
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

// Example usage

export async function POST(req: Request) {
  try {
    const data = await getServerSession(authOptions);

    if (!data) {
      return new Response("Not authenticated", { status: 401 });
    }

    const randomNumbers: number[] = generateRandomNumbers();

    const {
      personNr,
      pNummer,
      beskrivelse,
      boede,
      faengsel,
      klip,
      participatingOfficers,
    } = await req.json();

    const sagsoprettelse = await prisma.tabletSager.create({
      data: {
        sagsNr: `#${randomNumbers}`,
        personNr,
        pNummer,
        beskrivelse,
        boede,
        faengsel,
        klip,
        participatingOfficers,
      },
    });

    return NextResponse.json(sagsoprettelse);
  } catch (error) {
    console.log("[SAGER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
