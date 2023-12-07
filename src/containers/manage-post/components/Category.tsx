import { useEffect, useState } from "react";
import { Select } from "antd";

type Category = {
  id: string;
  title: string;
  value: string;
  label: string;
};

export const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();

        const options = data.map((category: Category) => ({
          value: category?.title,
          label: category?.title,
        }));
        setCategories(options);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  console.log(categories);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (input: string, option?: { label: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      showSearch
      placeholder="Select a category"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={categories}
    />
  );
};
