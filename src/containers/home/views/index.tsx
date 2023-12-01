"use client";

import { Input } from "antd";
import { Blog } from "../sections";
import { Popular, Subscribe } from "@/components";

type Props = {
  posts: any;
};

const { Search } = Input;

export const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className="mt-[108px] mb-[10px]">
      <div className="container">
        <h1 className="text-primary text-5xl font-black mb-0 text-center">
          My Blog
        </h1>
        <p className="text-xl font-normal text-center mb-[32px]">
          Just a personal blog.
        </p>
        <div className="flex justify-center p-4">
          <Search
            placeholder="Search for articles"
            style={{ width: "430px" }}
            size="large"
          />
        </div>
        <Blog posts={posts} />
        <div className="flex gap-20">
          <Subscribe />
          <Popular />
        </div>
      </div>
    </div>
  );
};
