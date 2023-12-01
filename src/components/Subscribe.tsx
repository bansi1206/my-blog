"use client";

import { Button, Input } from "antd";

type Props = {};

export const Subscribe: React.FC<Props> = () => {
  return (
    <div>
      <div className="container">
        <div className="rounded bg-[#283A61] flex flex-col px-[27px] py-[38px] gap-y-5">
          <div className="flex flex-col items-center">
            <h3 className="text-[#fff] text-2xl font-bold w-[182px] text-center mb-1">
              Subscribe To Our Newsletter
            </h3>
            <p className="text-[#fff] font-base text-lg w-[328px] text-center">
              Get weekly food news, articles, and videos delivered to your
              inbox.
            </p>
          </div>
          <Input className="w-full" placeholder="Email" size="large" />
          <Button type="primary" className="w-24 bg-primary">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
