import { getPrisma } from "@/config";

export async function GET() {
  try {
    const prisma = getPrisma();
    const res = await prisma.image.findMany();
    return Response.json(res);
  } catch (error) {
    console.error("Error initializing Prisma Client:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
