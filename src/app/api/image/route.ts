import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();

  const res = await prisma.image.findMany();

  return Response.json(res);
}
