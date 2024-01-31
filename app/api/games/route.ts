import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createGameSchema = z.object({
  players: z.string().min(1).max(1000),
  commanders: z.array(z.string()), // Array of Scryfall IDs
  winner: z.string().max(255).optional(),
  gameType: z.enum(['QuickMatch', 'Marathon', 'Upset', 'CloseCall', 'Dominance', 'Chaos']),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createGameSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    // Create the game record
    const newGame = await prisma.game.create({
      data: {
        players: JSON.parse(validation.data.players),
        winner: validation.data.winner,
        gameDescriptor: validation.data.gameType,
        gameCommanders: {
          create: validation.data.commanders.map(scryfallId => ({
            commander: { connect: { scryfallId } },
          })),
        },
      },
      include: {
        gameCommanders: true,
      },
    });

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
