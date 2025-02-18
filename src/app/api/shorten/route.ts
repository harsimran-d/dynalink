import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url)
    return NextResponse.json({ error: "URL is required" }, { status: 400 });

  const shortId = nanoid(6);
  await prisma.shortUrl.create({
    data: { shortId, originalUrl: url },
  });

  return NextResponse.json({ shortId });
}
