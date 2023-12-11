"use client";

import { Button, Form, Input, Select, SelectProps, message } from "antd";

import { useCallback, useState } from "react";

import axios from "axios";

type Props = {};

export const ManageCategory: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const options: SelectProps["options"] = [];

  const onFinish = useCallback(async () => {
    try {
      const body = {
        title: categories.map((title) => title.trim()),
      };

      await axios.post("/api/category", body);

      message.success("Categories created successfully!");

      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);

      message.error("Something Wrong!");
    }
  }, [form, categories]);

  const handleChange = (value: string[]) => {
    setCategories(value);
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <div className="container max-w-[800px] py-8">
        <h1>Add Category Post</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Enter categories which you want to add"
              onChange={handleChange}
              options={options}
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
