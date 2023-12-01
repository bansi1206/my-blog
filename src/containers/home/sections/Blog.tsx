"use client";

import { Avatar } from "antd";
import Link from "next/link";
import { map } from "lodash";
import { useCallback } from "react";

type Props = {
  posts: any;
};

export const Blog: React.FC<Props> = ({ posts }) => {
  const formatDate = useCallback((dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric" as const,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }, []);

  return (
    <div className="mt-20 mb-40">
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          {map(posts, (post) => (
            <Link key={post?.id} href={`/post/${post?.id}`} className="no-underline text-[#000]">
              <div className="w-[510px] flex flex-col gap-y-5">
                <img
                  src="https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=1600"
                  alt="blog-image"
                  className="rounded w-[510px] h-[278px]"
                />
                <div className="rounded-sm bg-[#283A61] w-[73px] text-[white] p-1 text-center">
                  {post?.category}
                </div>
                <h3 className="text-[#000] text-2xl font-bold mb-0">
                  {post?.title}
                </h3>
                <div className="text-sm font-normal text-[#515151] mt-0">
                  {formatDate(post?.createdAt)}
                </div>
                <p
                  className="text-base font-normal line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                ></p>
                <div className="flex items-center gap-2">
                  <Avatar
                    src="https://kenh14cdn.com/203336854389633024/2021/8/15/photo-1-162903403632824547336.jpg"
                    alt="avatar"
                  />
                  <p>Thang Le</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
