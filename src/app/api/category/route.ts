import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().category.findMany();

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const res = await getPrisma().category.create({
    data: {
      ...data,
    },
  });
  return Response.json(res);
}
