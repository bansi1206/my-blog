"use client";

import Link from "next/link";
import { Avatar, Button } from "antd";
import { Popular, Subscribe, Recent } from "@/components";

type Post = {
  user_id: number;
  title: string;
  image: string;
  createdAt: string;
  id: number;
  content: string;
  category: string;
  updatedAt: string;
};

type Props = {
  post?: {
    success: boolean;
    message: string;
    post: Post;
  };
};

export const Post: React.FC<Props> = ({ post }) => {
  return (
    // <div>
    //   <div className='container'>
    //     <div className='flex flex-col items-center text-5xl'>
    //       <img src={post?.blog.photo_url} alt='' />
    //       <h1>{post?.blog.title}</h1>
    //     </div>
    //     <div className='meta-data'>
    //       <Link href={'#!'} className='decoration-cyan-500'>
    //         {post?.blog.category}
    //       </Link>
    //     </div>
    //     <div
    //       dangerouslySetInnerHTML={{ __html: post?.blog?.content_html || '' }}
    //     ></div>
    //   </div>
    // </div>
    <div>
      <div className="container flex flex-col items-center mt-[108px]">
        <div className="rounded bg-[#283A61] inline-block py-1 px-4 text-[#fff]">
          {post?.post.category}
        </div>
        <h1 className="max-w-[800px] text-5xl font-bold mt-3 mb-4">
          {post?.post.title}
        </h1>
        <p className="text-sm text-[#515151] mb-3">{post?.post.createdAt}</p>
        <img
          src={`${post?.post.image}`}
          alt="post-image"
          className="w-1/2 h-64 rounded shadow-primary"
        />
        <div className="flex mt-[30px] items-center">
          <Avatar src="https://kenh14cdn.com/203336854389633024/2021/8/15/photo-1-162903403632824547336.jpg" />
          <div>Thang Le</div>
        </div>
        <div>content</div>
        <div className="mb-6">Keep reading</div>
        <div className="max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:ml-0 lg:flex justify-between mb-[147px] lg:gap-20">
          <Subscribe />
          <Popular />
          <Recent />
        </div>
      </div>
    </div>
  );
};
