"use client";

import Link from "next/link";
import { Avatar, Button } from "antd";
import { Popular, Subscribe, Recent } from "@/components";
import { formatDate } from "@/utils";
import { KeepReading } from "@/components";
import { Comments, FacebookProvider } from "react-facebook";
import { map } from "lodash";

type Post = {
  id: string;
  userId: string;
  thumbnail: string;
  categories: Category[];
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: any;
  image: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  bio: string;
};

type Category = {
  category: any;
  id: string;
  title: string;
};

type Props = {
  post?: Post;
};

export const Post: React.FC<Props> = ({ post }) => {
  console.log("post", post);

  return (
    <div>
      <div className="container mt-[108px] max-w-[1100px]">
        <div className="max-w-[800px] m-auto">
          <div className="flex gap-3">
            {map(post?.categories, (category) => (
              <div
                key={category?.category?.id}
                className="rounded bg-[#283A61] inline-block py-1 px-4 text-[#FFFFFFD9]"
              >
                {category?.category?.title}
              </div>
            ))}
          </div>
          {/* <div className="rounded bg-[#283A61] inline-block py-1 px-4 text-[#FFFFFFD9]">
            {post?.cat?.title}
          </div> */}
          <h1 className="text-5xl font-bold mt-3 mb-4">{post?.title}</h1>
          <p className="text-sm text-[#515151] mb-3">
            {formatDate(post?.createdAt)}
          </p>
          <img
            src={`${post?.thumbnail}`}
            alt="post-image"
            className="rounded-[5px] h-[278px] w-full shadow-post bg-[#7f7f7f] object-cover"
          />
          <div className="flex items-center gap-[14px] mt-[20px]">
            <Avatar
              src={`${post?.user?.image}`}
              alt="avatar"
              className="bg-cover bg-no-repeat rounded-[387px] w-[42px] h-[42px]"
            />
            <p className="text-sm font-bold text-[#000]">{post?.user?.name}</p>
          </div>
          <div
            className="text-base font-normal font-roboto text-[#434343] mt-10"
            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
          ></div>
          <KeepReading post={post} />
          <div className="flex items-center gap-[28px] mt-[20px] max-w-[800px] mb-[104px] rounded-[5px] bg-[#F5F5F5] border-[#DDD] border-[1px] border-solid py-[44px] px-[31px] cursor-pointer">
            <Avatar
              src={`${post?.user?.image}`}
              alt="avatar"
              className="bg-cover bg-no-repeat rounded-[387px] w-[150px] h-[150px]"
            />
            <div>
              <div className="text-2xl font-bold text-[#000]">
                Written by {post?.user?.name}
              </div>
              <div className="max-w-[555px]">{post?.user?.bio}</div>
            </div>
          </div>
        </div>
        <FacebookProvider appId="1473682613178203">
          <Comments href={`www.facebook.com/post/${post?.id}`} />
        </FacebookProvider>
        <div className="max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:ml-0 lg:flex justify-between mb-[147px] lg:gap-20">
          <Subscribe />
          <Popular />
          <Recent />
        </div>
      </div>
    </div>
  );
};
