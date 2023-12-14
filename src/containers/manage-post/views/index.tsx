"use client";

import { Button, Form, Input, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Thumbnail } from "../components";
import { Select } from "antd";

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
  const [selectedTags, setSelectedTags] = useState<Category[]>([]);

  // const uploadToImgBB = async (file: File) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     formData.append("key", "6411f8344d5253b810b283866f55558c");

  //     const response = await axios.post(
  //       "https://api.imgbb.com/1/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     return response.data.data.url;
  //   } catch (error) {
  //     console.error("Error uploading image to ImgBB:", error);
  //     throw error;
  //   }
  // };
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
      console.log(values);
      try {
        // const thumbnailUrl = await uploadToImgBB(values.thumbnail);
        const body = {
          title: values?.title,
          categories: values?.categoryId,
          // thumbnail: thumbnailUrl,
          content: editorRef.current.getContent(),
          createdAt: new Date(),
        };
        console.log(body);

        await axios.post("/api/post", body);

        message.success("Post published successfully!");

        form.resetFields();
        editorRef.current.setContent("");
        setSelectedTags([]);
      } catch (error) {
        console.error("Error submitting form:", error);

        message.error("Something Wrong!");
      }
    },
    [form, selectedTags]
  );

  return (
    <div>
      <div className="container max-w-[800px] py-8">
        <h1>Add New Post</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="categoryId">
            <Select
              mode="multiple"
              showSearch
              placeholder="Select a category"
              options={categories}
            />
          </Form.Item>
          <Form.Item label="Thumbnail" name="thumbnail">
            <Thumbnail />
          </Form.Item>
          <Form.Item label="Content" name="content">
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
