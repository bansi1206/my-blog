"use client";

import { Button, Form, Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useRef } from "react";
import axios from "axios";

type Props = {};

export const ManagePost: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const editorRef = useRef<any>();

  const onFinish = useCallback((values: any) => {
    const body = {
      title: values?.title,
      category: values?.category,
      thumbnail: values?.thumbnail,
      content: editorRef.current.getContent(),
      createdAt: new Date(),
    };
    axios.post("/api/post", {
      ...body,
    });
  }, []);

  return (
    <div>
      <div className="container">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item label="Thumbnail" name="thumbnail">
            <Input />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <Editor
              apiKey="omhg3nhiridv2e2pukf95ka6a7go38hgh6yvee8dmxeolmr5"
              initialValue="<p>This is the initial content of the editor.</p>"
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
