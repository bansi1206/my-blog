import { getPrisma, getSessionUser } from "@/config";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get("keyword");
  const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
  const search = {
    ...(keyword
      ? {
          title: {
            contains: keyword,
          },
        }
      : {}),
  };
  const res = await getPrisma().post.findMany({
    where: {
      AND: [{ ...search }],
    },
    include: {
      user: true,
    },
    take: limit,
    skip: offset,
  });

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
