"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, message, Result, Upload } from "antd";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { map } from "lodash";
import "./UploadModal.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { thumbnailState } from "@/recoil";

const { Dragger } = Upload;

type Props = {
  open: boolean;
  onClose: any;
};

export const UploadModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;
  const [imageList, setImageList] = useState([]);
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [info, setInfo] = useState<any>(null);
  const setThumbnail = useSetRecoilState(thumbnailState);
  const thumbnail = useRecoilValue(thumbnailState);
  const [upload, setUpload] = useState<any>("");
  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    multiple: false,
    maxCount: 1,
    customRequest: async ({ file, onSuccess }) => {
      try {
        const data = new FormData();
        data.set("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const result = await res.json();
        if (onSuccess) {
          onSuccess(result);
          setUpload(result);
          message.success(`You have uploaded ${result.name}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error(`file upload failed.`);
      }
    },
  };

  useEffect(() => {
    const getImageList = async () => {
      const res = await axios.get("http://localhost:3000/api/image");
      setImageList(res.data);
    };
    getImageList();
  }, []);

  const handleSetThumbnail = useCallback(() => {
    if (upload) {
      setThumbnail(upload.name);
      onClose();
    } else if (info) {
      setThumbnail(info.name);
      console.log(">>>set featured image", info.name);
      onClose();
    }
  }, [upload, info]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[10] ">
      <div className="max-w-[1024px] w-full bg-white rounded-[3px]">
        <div className="flex items-center justify-between p-4">
          <h1>Featured Image</h1>
          <span
            onClick={onClose}
            className="text-[#ccc] text-lg hover:text-[#3474eb] cursor-pointer"
          >
            x
          </span>
        </div>
        <div className="flex group-tab border-b px-4 gap-1">
          <div
            onClick={() => setActiveTab("upload")}
            className={activeTab === "upload" ? "active" : ""}
          >
            Upload Image
          </div>
          <div
            onClick={() => setActiveTab("library")}
            className={activeTab === "library" ? "active" : ""}
          >
            Media Library
          </div>
        </div>
        <div className="border-b flex justify-center">
          {activeTab === "upload" && (
            <div className="w-[300px] p-7">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </div>
          )}
          {activeTab === "library" && (
            <div className="flex">
              <div className="bg-white p-5 rounded-[3px] flex flex-wrap overflow-y-auto gap-4 max-h-[calc(100vh-500px)]">
                {map(imageList, (imageList: any) => (
                  <div key={imageList?.id} className="flex justify-center">
                    <img
                      src={`${imageList?.url}`}
                      className={`w-[120px] h-[120px] rounded-[3px] hover:opacity-80 cursor-pointer object-cover ${
                        selectedImage === imageList?.id ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedImage(imageList?.id);
                        setInfo(imageList);
                        console.log("image name", imageList.name);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 max-w-[300px] w-full flex flex-col items-center text-center">
                {info !== null ? (
                  <div>
                    <h3 className="text-[#646970]">DETAILS</h3>
                    <img
                      src={`${info?.url}`}
                      alt="Cover"
                      className="w-[80px] h-[80px] rounded-[3px] object-cover"
                    />
                    <div className="flex gap-2">
                      <span className="text-[#646970]">NAME:</span>
                      <input value={info?.name} disabled={true} />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#646970]">URL:</span>
                      <input value={info?.url} disabled={true} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end bg-white p-3">
          <Button onClick={handleSetThumbnail} type="primary">
            Set Featured Image
          </Button>
        </div>
      </div>
    </div>
  );
};
