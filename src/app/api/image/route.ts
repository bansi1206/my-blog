import { getPrisma } from "@/config";

export async function GET() {
  const prisma = getPrisma();

  const res = await prisma.image.findMany();

  return Response.json(res);
}
