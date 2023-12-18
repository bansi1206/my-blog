import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadFolder = join(process.cwd(), "public/uploads");
  const path = join(uploadFolder, file.name);
  await writeFile(path, buffer);
  const response = {
    uid: file.name,
    name: file.name,
    status: "done",
    url: `/uploads/${file.name}`,
  };
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json(response);
}
