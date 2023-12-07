"use client";

import { Button, Form, Input, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useRef } from "react";

import axios from "axios";
import { Category, Thumbnail } from "../components";

type Props = {};

export const ManagePost: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const editorRef = useRef<any>();

  const onFinish = useCallback(
    async (values: any) => {
      try {
        const body = {
          title: values?.title,
          catId: values?.category,
          thumbnail: values?.thumbnail,
          content: editorRef.current.getContent(),
          createdAt: new Date(),
        };

        await axios.post("/api/post", body);

        message.success("Post published successfully!");

        form.resetFields();
        editorRef.current.setContent("");
      } catch (error) {
        console.error("Error submitting form:", error);

        message.error("Something Wrong!");
      }
    },
    [form]
  );

  return (
    <div>
      <div className="container max-w-[800px] py-8">
        <h1>Add New Post</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Category />
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
