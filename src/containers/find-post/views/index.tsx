"use client";
import { BlogByCategory } from "../sections";
import { Popular, Subscribe } from "@/components";

type Props = {
  posts: any;
  categoryId: any;
};

export const FindPost: React.FC<Props> = ({ posts, categoryId }) => {
  const categoryToFind = posts?.data[0]?.categories.find(
    (category: any) => category.categoryId === categoryId
  );

  return (
    <div className="mt-[108px] mb-[10px]">
      <div className="container max-w-[1100px]">
        <h1 className="text-primary text-5xl font-black mb-0 text-center">
          #{categoryToFind?.category?.title}
        </h1>
        <BlogByCategory posts={posts} categoryId={categoryId} />
        <div className="max-lg:flex max-lg:flex-col max-lg:gap-6 lg:flex lg:gap-20 mb-10">
          <Subscribe />
          <Popular />
        </div>
      </div>
    </div>
  );
};
