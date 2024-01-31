import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const singleCommanderSchema = z.object({
  scryfallId: z.string(),
  name: z.string(),
  cmc: z.number(),
  color_identity: z.array(z.string()),
  image_uris: z.object({
    small: z.string().url(),
  }),
});

const createCommandersSchema = z.array(singleCommanderSchema);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createCommandersSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const commandersTransactions = validation.data.map(commanderData => {
      return prisma.commander.upsert({
        where: { scryfallId: commanderData.scryfallId },
        update: {
          name: commanderData.name,
          manaCost: commanderData.cmc,
          imageUrl: commanderData.image_uris.small,
          colors: JSON.stringify(commanderData.color_identity),
        },
        create: {
          scryfallId: commanderData.scryfallId,
          name: commanderData.name,
          manaCost: commanderData.cmc,
          imageUrl: commanderData.image_uris.small,
          colors: JSON.stringify(commanderData.color_identity),
        },
      });
    });

    const createdOrUpdatedCommanders = await prisma.$transaction(commandersTransactions);

    return NextResponse.json(createdOrUpdatedCommanders, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
