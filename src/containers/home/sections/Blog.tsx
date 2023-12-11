"use client";

import { Avatar, Pagination } from "antd";
import Link from "next/link";
import { map } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { formatDate } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  posts: any;
};

const LIMIT = 2;
const ITEMS_PER_PAGE = 2;

export const Blog: React.FC<Props> = ({ posts }) => {
  const router = useRouter();
  const search = useSearchParams();
  const keyword = useMemo(() => search?.get("keyword") || "", [search]);
  const page = useMemo(
    () => (search?.get("page") ? parseInt(search.get("page") as string) : 1),
    [search]
  );

  console.log(posts.total);

  return (
    <div className="mt-20 mb-40">
      <div className="container">
        <div className="grid grid-cols-2 gap-20 max-w-full mb-[152px]">
          {map(posts.data, (post) => (
            <Link
              key={post?.id}
              href={`/post/${post?.id}`}
              className="no-underline text-[#000] "
            >
              <div className="w-[510px]">
                <img
                  src={`${post?.thumbnail}`}
                  alt="blog-image"
                  className="rounded-[5px] w-[510px] h-[278px] mb-[21px] object-cover"
                />
                <div className="rounded-[3px] bg-[#283A61] w-[73px] text-[#FFFFFFD9] p-1 text-center mb-[8px] font-roboto">
                  {post?.cat?.title}
                </div>
                <h3 className="text-[#000] text-2xl font-bold mb-0">
                  {post?.title}
                </h3>
                <div className="text-sm font-normal text-[#515151] mt-0 mb-[15px]">
                  {formatDate(post?.createdAt)}
                </div>
                <p
                  className="text-base font-normal line-clamp-3 font-roboto text-[#434343] mb-4"
                  dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                ></p>
                <div className="flex items-center gap-[14px]">
                  <Avatar
                    src={`${post?.user?.image}`}
                    alt="avatar"
                    className="bg-cover bg-no-repeat rounded-[387px] w-[42px] h-[42px]"
                  />
                  <p className="text-sm font-bold text-[#000]">
                    {post?.user?.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          current={page}
          total={posts.total}
          pageSize={ITEMS_PER_PAGE}
          pageSizeOptions={[]}
          onChange={(page) => router.push(`?keyword=${keyword}&page=${page}`)}
          className="flex justify-center"
        />
      </div>
    </div>
  );
};
