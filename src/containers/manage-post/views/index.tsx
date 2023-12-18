"use client";

import { Button, Form, Input, message, Upload } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

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
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error(`file upload failed.`);
    }
  },
  onChange(info) {
    const { status } = info.file;
    console.log(status);
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

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
      console.log("values", values);
      try {
        const body = {
          title: values?.title,
          categories: values?.categoryId,
          thumbnail: `/uploads/${values?.thumbnail?.file?.name}`,
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
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
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
