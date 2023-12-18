import { getPrisma } from "@/config";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const offset = parseInt(request.nextUrl.searchParams.get("offset") || "2");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
  const prisma = getPrisma();

  const categoryId = params.slug;

  try {
    const total = await prisma.post.count({
      where: {
        categories: {
          some: {
            categoryId: categoryId,
          },
        },
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        categories: {
          some: {
            categoryId: categoryId,
          },
        },
      },
      include: {
        user: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });

    return Response.json({
      data: posts,
      total,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
