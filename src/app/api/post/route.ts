import { getPrisma, getSessionUser } from "@/config";

import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().post.findMany();

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const session = await getSessionUser();
  const res = await getPrisma().post.create({
    data: {
      ...data,
      user: {
        connect: {
          id: session?.id,
        },
      },
    },
  });

  return Response.json(res);
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const res = await getPrisma().post.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });

  return Response.json(res);
}
