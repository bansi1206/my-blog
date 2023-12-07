import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  console.log("--------------------------------------------------------");
  console.log("params.slug", params.slug);
  console.log("--------------------------------------------------------");
  const res = await getPrisma().post.findUnique({
    where: {
      id: params.slug as string,
    },
    include: {
      user: true,
      cat: true,
    },
  });

  return Response.json(res);
}
