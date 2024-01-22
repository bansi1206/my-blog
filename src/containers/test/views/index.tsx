"use client";

import { UploadModal } from "@/components/modal";
import { Button } from "antd";
import { useState } from "react";

type Props = {};

export const Test: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-[108px] mb-[10px]">
      <div className="container max-w-[1100px]">
        <Button
          type="primary"
          className="z-[1]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open Modal
        </Button>
        <UploadModal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
};
