"use client";

import { Button, Form, Input, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import { UploadModal } from "@/components/modal";
import { useRecoilValue } from "recoil";
import { thumbnailState } from "@/recoil";
import { PlusOutlined } from "@ant-design/icons";

type Category = {
  id: string;
  title: string;
  value: string;
  label: string;
};

type Props = {};

export const ManagePost: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const editorRef = useRef<any>();
  const [categories, setCategories] = useState<Category[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const thumbnail = useRecoilValue(thumbnailState);
  console.log("after set feature image", thumbnail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();

        const options = data.map((category: Category) => ({
          value: category?.id,
          label: category?.title,
        }));
        setCategories(options);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const onFinish = useCallback(
    async (values: any) => {
      try {
        const body = {
          title: values?.title,
          categories: values?.categoryId,
          thumbnail: `/uploads/${thumbnail}`,
          content: editorRef.current.getContent(),
          createdAt: new Date(),
        };
        console.log(body);

        await axios.post("/api/post", body);

        message.success("Post published successfully!");

        form.resetFields();
        editorRef.current.setContent("");
      } catch (error) {
        console.error("Error submitting form:", error);

        message.error("Something Wrong!");
      }
    },
    [form, thumbnail]
  );

  return (
    <div>
      <div className="container max-w-[800px] py-8">
        <h1>Add New Post</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title" required>
            <Input required />
          </Form.Item>
          <Form.Item label="Category" name="categoryId" required>
            <Select
              mode="multiple"
              showSearch
              placeholder="Select a category"
              options={categories}
            />
          </Form.Item>
          <Form.Item label="Thumbnail" name="thumbnail" required>
            {!thumbnail ? (
              <div
                onClick={() => {
                  setIsOpen(true);
                }}
                className="flex flex-col items-center bg-[#ccc] rounded-[3px] p-4 cursor-pointer hover:opacity-75"
              >
                <PlusOutlined />
                Set Cover
              </div>
            ) : (
              <div className="relative group w-[300px] h-[200px]">
                <img
                  src={`/uploads/${thumbnail}`}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-[3px] group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="text-white bg-[#ccc] rounded-[3px] p-1 cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Replace
                  </div>
                </div>
              </div>
            )}
            <UploadModal
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          </Form.Item>
          <Form.Item label="Content" name="content" required>
            <Editor
              apiKey="omhg3nhiridv2e2pukf95ka6a7go38hgh6yvee8dmxeolmr5"
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-[5px] bg-primary"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
