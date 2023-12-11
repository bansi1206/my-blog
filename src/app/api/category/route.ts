import { getPrisma } from "@/config";

import { NextRequest } from "next/server";

export async function GET() {
  const res = await getPrisma().category.findMany();

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  const existingCategories = await getPrisma().category.findMany({
    select: {
      title: true,
    },
  });

  const existingTitlesLowercase = existingCategories.map((category) =>
    category.title?.toLowerCase()
  );

  const dataTitles = data.title.map((title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (existingTitlesLowercase.includes(lowercaseTitle)) {
      return title;
    } else {
      getPrisma().category.create({
        data: { title },
      });
      return title;
    }
  });

  const newCategories = dataTitles
    .filter(
      (title: string) => !existingTitlesLowercase.includes(title.toLowerCase())
    )
    .map((title: string) => ({ title }));

  const createdCategories = await Promise.all(
    newCategories.map((category: any) =>
      getPrisma().category.create({
        data: category,
      })
    )
  );

  return Response.json({
    createdCategories,
  });
}
