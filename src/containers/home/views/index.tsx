"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Blog } from "../sections";
import { Popular, Subscribe } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
  posts: any;
};

// const { Search } = Input;

export const Home: React.FC<Props> = ({ posts }) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword") || "";

  useEffect(() => {
    setValue(keyword);
  }, [keyword]);

  const Search = useCallback(() => {
    router.push(`/?keyword=${value}`);
  }, [value]);

  return (
    <div className="mt-[108px] mb-[10px]">
      <div className="container max-w-[1100px]">
        <h1 className="text-primary text-5xl font-black mb-0 text-center">
          My Blog
        </h1>
        <p className="text-xl font-normal text-center mb-[32px] text-[#605C59] font-roboto mt-[10px]">
          Just a personal blog.
        </p>
        <div className="flex justify-center p-4">
          <Input
            className="rounded-[5px] py-[18px] px-[28px] search"
            placeholder="Search for articles"
            style={{ width: "430px" }}
            size="large"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={() => {
              Search();
            }}
            suffix={<SearchOutlined />}
          />
        </div>
        <Blog posts={posts} />
        <div className="max-lg:flex max-lg:flex-col max-lg:gap-6 lg:flex lg:gap-20 mb-10">
          <Subscribe />
          <Popular />
        </div>
      </div>
    </div>
  );
};
