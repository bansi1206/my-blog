import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { getPrisma } from "@/config";

const prisma = getPrisma();

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const uploadFolder = join(process.cwd(), "public/uploads");
  const path = join(uploadFolder, file.name);

  // Kiểm tra xem tên file đã tồn tại chưa
  const existingImages = await prisma.image.findMany({
    where: { name: file.name },
  });

  if (existingImages.length > 0) {
    console.log(`File with name ${file.name} already exists. Skipped.`);
    return NextResponse.json(existingImages);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(path, buffer);

  // Lưu thông tin ảnh vào cơ sở dữ liệu Prisma
  const response = await prisma.image.create({
    data: {
      uid: file.name,
      name: file.name,
      status: "done",
      url: `/uploads/${file.name}`,
    },
  });

  console.log(`Open ${path} to see the uploaded file`);

  return NextResponse.json(response);
}
