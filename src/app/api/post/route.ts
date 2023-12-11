import { getPrisma, getSessionUser } from "@/config";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get("keyword");
  const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
  const prisma = getPrisma();
  const search = {
    ...(keyword
      ? {
          title: {
            contains: keyword,
          },
        }
      : {}),
  };
  const total = await prisma.post.count({
    where: {
      AND: [{ ...search }],
    },
  });
  const res = await prisma.post.findMany({
    where: {
      AND: [{ ...search }],
    },
    include: {
      user: true,
      cat: true,
    },
    take: limit,
    skip: offset,
  });

  return Response.json({
    data: res,
    total,
  });
}

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ error: "Error creating post" }, { status: 500 });
  }
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
