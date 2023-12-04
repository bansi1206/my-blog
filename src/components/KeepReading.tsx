"use client";

import { useEffect } from "react";
import { filter, map } from "lodash";
import Link from "next/link";

type Props = {
  post: any;
};

export const KeepReading: React.FC<Props> = ({ post }) => {
  const storedReadingList = localStorage.getItem("readingList");
  const parsedReadingList = storedReadingList
    ? JSON.parse(storedReadingList)
    : [];

  useEffect(() => {
    if (post) {
      const currentReadingList = parsedReadingList || [];

      const isNewPostUnique = currentReadingList.every(
        (existingPost: { id: any }) => existingPost.id !== post.id
      );

      if (isNewPostUnique) {
        const updatedReadingList = [...currentReadingList.slice(-2), post];

        localStorage.setItem("readingList", JSON.stringify(updatedReadingList));
      }
    }
  }, [post]);

  return (
    <div>
      <div className="container">
        <div className="text-4xl font-bold mb-[48px] mt-[50px]">
          Keep reading
        </div>
        {map(
          filter(
            parsedReadingList,
            (readingPost: { id: any }) => readingPost.id !== post.id
          ),
          (readingPost: any) => (
            <Link
              key={readingPost?.id}
              href={`/post/${readingPost?.id}`}
              className="no-underline text-[#000]"
            >
              <div className="w-[510px] flex gap-[34px]">
                <img
                  src={`${readingPost.thumbnail}`}
                  alt="blog-image"
                  className="rounded-[5px] w-[250px] h-[165.339px] mb-[30px] bg-no-repeat bg-cover shadow-post"
                />
                <div>
                  <h3 className="text-[#303030] text-2xl font-bold mb-2">
                    {readingPost?.title}
                  </h3>
                  <div className="text-lg line-clamp-2 font-roboto text-[#4F4F4F]">
                    {readingPost?.content}
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
