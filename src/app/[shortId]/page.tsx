import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;
  const urlEntry = await prisma.shortUrl.findUnique({
    where: { shortId },
  });

  if (!urlEntry) {
    return <h1>404 - Not Found</h1>;
  }

  redirect(urlEntry.originalUrl);
}
