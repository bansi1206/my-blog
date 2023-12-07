"use client";

import { Button, Form, Input, message } from "antd";

import { useCallback } from "react";

import axios from "axios";

type Props = {};

export const ManageCategory: React.FC<Props> = () => {
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: any) => {
      try {
        const body = {
          title: values?.title,
        };

        await axios.post("/api/category", body);

        message.success("Category created successfully!");

        form.resetFields();
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
        <h1>Add Category Post</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Input />
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
